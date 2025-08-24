const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plant name is required'],
    trim: true,
    maxlength: [100, 'Plant name cannot exceed 100 characters'],
    minlength: [2, 'Plant name must be at least 2 characters long']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    max: [10000, 'Price cannot exceed ₹10,000']
  },
  categories: {
    type: [String],
    required: [true, 'At least one category is required'],
    validate: {
      validator: function(categories) {
        return categories.length > 0 && categories.length <= 10;
      },
      message: 'Plant must have at least 1 category and maximum 10 categories'
    }
  },
  stockAvailable: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
  },
  careLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Easy'
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    default: 'Medium'
  },
  lightRequirement: {
    type: String,
    enum: ['Low Light', 'Indirect Light', 'Bright Light', 'Direct Sunlight'],
    default: 'Indirect Light'
  },
  wateringFrequency: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    default: 'Moderate'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for search functionality
plantSchema.index({ 
  name: 'text', 
  categories: 'text',
  description: 'text'
});

// Virtual for formatted price
plantSchema.virtual('formattedPrice').get(function() {
  return `₹${this.price.toFixed(2)}`;
});

// Pre-save middleware to update timestamps
plantSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get all categories
plantSchema.statics.getAllCategories = async function() {
  const plants = await this.find({}, 'categories');
  const allCategories = plants.reduce((acc, plant) => {
    plant.categories.forEach(category => {
      if (!acc.includes(category)) {
        acc.push(category);
      }
    });
    return acc;
  }, []);
  return allCategories.sort();
};

// Instance method to check if plant is in stock
plantSchema.methods.isInStock = function() {
  return this.stockAvailable;
};

module.exports = mongoose.model('Plant', plantSchema);
