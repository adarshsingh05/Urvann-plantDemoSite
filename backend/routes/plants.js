const express = require('express');
const Plant = require('../models/Plant');
const router = express.Router();

// Get all plants with search and filter functionality
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      minPrice, 
      maxPrice, 
      stockAvailable, 
      careLevel,
      size,
      lightRequirement,
      page = 1, 
      limit = 12,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query object
    const query = {};

    // Search functionality (case-insensitive)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { categories: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.categories = { $regex: category, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Stock availability filter
    if (stockAvailable !== undefined) {
      query.stockAvailable = stockAvailable === 'true';
    }

    // Care level filter
    if (careLevel) {
      query.careLevel = careLevel;
    }

    // Size filter
    if (size) {
      query.size = size;
    }

    // Light requirement filter
    if (lightRequirement) {
      query.lightRequirement = lightRequirement;
    }

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const plants = await Plant.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Plant.countDocuments(query);

    // Calculate pagination info
    const totalPages = Math.ceil(total / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.status(200).json({
      status: 'success',
      data: {
        plants,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          itemsPerPage: parseInt(limit),
          hasNextPage,
          hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plants',
      error: error.message
    });
  }
});

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Plant.getAllCategories();
    res.status(200).json({
      status: 'success',
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// Get single plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: plant
    });

  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch plant',
      error: error.message
    });
  }
});

// Add new plant (Admin feature)
router.post('/', async (req, res) => {
  try {
    const {
      name,
      price,
      categories,
      stockAvailable = true,
      description,
      imageUrl,
      careLevel = 'Easy',
      size = 'Medium',
      lightRequirement = 'Indirect Light',
      wateringFrequency = 'Moderate'
    } = req.body;

    // Validation
    if (!name || !price || !categories || categories.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, price, and at least one category are required'
      });
    }

    if (price < 0 || price > 10000) {
      return res.status(400).json({
        status: 'error',
        message: 'Price must be between 0 and ₹10,000'
      });
    }

    if (categories.length > 10) {
      return res.status(400).json({
        status: 'error',
        message: 'Maximum 10 categories allowed'
      });
    }

    // Create new plant
    const newPlant = new Plant({
      name: name.trim(),
      price: parseFloat(price),
      categories: categories.map(cat => cat.trim()),
      stockAvailable,
      description: description?.trim(),
      imageUrl,
      careLevel,
      size,
      lightRequirement,
      wateringFrequency
    });

    const savedPlant = await newPlant.save();

    res.status(201).json({
      status: 'success',
      message: 'Plant added successfully',
      data: savedPlant
    });

  } catch (error) {
    console.error('Error adding plant:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to add plant',
      error: error.message
    });
  }
});

// Update plant
router.put('/:id', async (req, res) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedPlant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Plant updated successfully',
      data: updatedPlant
    });

  } catch (error) {
    console.error('Error updating plant:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Failed to update plant',
      error: error.message
    });
  }
});

// Delete plant
router.delete('/:id', async (req, res) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);

    if (!deletedPlant) {
      return res.status(404).json({
        status: 'error',
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Plant deleted successfully',
      data: deletedPlant
    });

  } catch (error) {
    console.error('Error deleting plant:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete plant',
      error: error.message
    });
  }
});

// Get plants statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const totalPlants = await Plant.countDocuments();
    const inStockPlants = await Plant.countDocuments({ stockAvailable: true });
    const outOfStockPlants = await Plant.countDocuments({ stockAvailable: false });
    
    const avgPrice = await Plant.aggregate([
      { $group: { _id: null, avgPrice: { $avg: '$price' } } }
    ]);

    const categoryStats = await Plant.aggregate([
      { $unwind: '$categories' },
      { $group: { _id: '$categories', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        totalPlants,
        inStockPlants,
        outOfStockPlants,
        averagePrice: avgPrice[0]?.avgPrice || 0,
        topCategories: categoryStats
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch statistics',
      error: error.message
    });
  }
});

module.exports = router;
