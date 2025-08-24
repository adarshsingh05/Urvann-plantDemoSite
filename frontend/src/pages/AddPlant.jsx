import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Plus, 
  X, 
  Upload, 
  Leaf,
  Star,
  Droplets,
  Sun,
  Ruler,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { plantAPI } from '../services/api'
import toast from 'react-hot-toast'

const AddPlant = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    categories: [],
    stockAvailable: true,
    description: '',
    imageUrl: '',
    careLevel: 'Easy',
    size: 'Medium',
    lightRequirement: 'Indirect Light',
    wateringFrequency: 'Moderate'
  })

  const [newCategory, setNewCategory] = useState('')
  const [errors, setErrors] = useState({})

  const careLevels = ['Easy', 'Medium', 'Hard']
  const sizes = ['Small', 'Medium', 'Large']
  const lightRequirements = ['Low Light', 'Indirect Light', 'Bright Light', 'Direct Sunlight']
  const wateringFrequencies = ['Low', 'Moderate', 'High']

  // Add plant mutation
  const addPlantMutation = useMutation(
    (plantData) => plantAPI.addPlant(plantData),
    {
      onSuccess: (data) => {
        toast.success('Plant added successfully!')
        queryClient.invalidateQueries(['plants'])
        queryClient.invalidateQueries(['categories'])
        navigate('/catalog')
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to add plant'
        toast.error(errorMessage)
        
        if (error.response?.data?.errors) {
          const validationErrors = {}
          error.response.data.errors.forEach(err => {
            const field = err.toLowerCase().includes('name') ? 'name' :
                         err.toLowerCase().includes('price') ? 'price' :
                         err.toLowerCase().includes('category') ? 'categories' : 'general'
            validationErrors[field] = err
          })
          setErrors(validationErrors)
        }
      }
    }
  )

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }))
      setNewCategory('')
      if (errors.categories) {
        setErrors(prev => ({ ...prev, categories: '' }))
      }
    }
  }

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCategory()
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Plant name is required'
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required'
    }

    if (formData.categories.length === 0) {
      newErrors.categories = 'At least one category is required'
    }

    if (formData.categories.length > 10) {
      newErrors.categories = 'Maximum 10 categories allowed'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        categories: formData.categories
      }
      
      addPlantMutation.mutate(submitData)
    }
  }

  const getCareLevelColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Add New Plant</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Add a beautiful new plant to our collection
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Plant Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`input ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="e.g., Monstera Deliciosa"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className={`input ${errors.price ? 'border-red-500' : ''}`}
                  placeholder="299.99"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Stock Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Availability
                </label>
                <select
                  name="stockAvailable"
                  value={formData.stockAvailable}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value={true}>In Stock</option>
                  <option value={false}>Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories *
              </label>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="input flex-1"
                    placeholder="Add a category (e.g., Indoor, Air Purifying)"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="btn btn-primary px-4 py-2"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                {formData.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800"
                      >
                        <Leaf className="h-3 w-3 mr-1" />
                        {category}
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(category)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                
                {errors.categories && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.categories}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="input"
                placeholder="Describe the plant's features, care requirements, and benefits..."
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="input flex-1"
                  placeholder="https://example.com/plant-image.jpg"
                />
                <button
                  type="button"
                  className="btn btn-outline px-4 py-2"
                  onClick={() => setFormData(prev => ({ 
                    ...prev, 
                    imageUrl: 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop' 
                  }))}
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Care Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Care Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Care Level
                </label>
                <select
                  name="careLevel"
                  value={formData.careLevel}
                  onChange={handleInputChange}
                  className="input"
                >
                  {careLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Size
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="input"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Light Requirement */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Light Requirement
                </label>
                <select
                  name="lightRequirement"
                  value={formData.lightRequirement}
                  onChange={handleInputChange}
                  className="input"
                >
                  {lightRequirements.map(light => (
                    <option key={light} value={light}>{light}</option>
                  ))}
                </select>
              </div>

              {/* Watering Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Watering Frequency
                </label>
                <select
                  name="wateringFrequency"
                  value={formData.wateringFrequency}
                  onChange={handleInputChange}
                  className="input"
                >
                  {wateringFrequencies.map(frequency => (
                    <option key={frequency} value={frequency}>{frequency}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview */}
            {formData.name && (
              <div className="border-t pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      {formData.imageUrl ? (
                        <img 
                          src={formData.imageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                      ) : null}
                      <div className="text-gray-400 flex items-center justify-center" style={{ display: formData.imageUrl ? 'none' : 'flex' }}>
                        <Leaf className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{formData.name}</h4>
                      <p className="text-green-600 font-bold text-sm sm:text-base">₹{formData.price || '0'}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formData.categories.map((category, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                          >
                            <Leaf className="h-3 w-3 mr-1" />
                            {category}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${getCareLevelColor(formData.careLevel)}`}>
                          <Star className="h-3 w-3 mr-1" />
                          {formData.careLevel}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          <Ruler className="h-3 w-3 mr-1" />
                          {formData.size}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                          <Sun className="h-3 w-3 mr-1" />
                          Light
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/catalog')}
                className="btn btn-outline w-full sm:w-auto px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addPlantMutation.isLoading}
                className="btn btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
              >
                {addPlantMutation.isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add Plant</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default AddPlant
