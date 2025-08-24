import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  SlidersHorizontal,
  RefreshCw
} from 'lucide-react'

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  categories = [],
  onReset 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const careLevels = ['Easy', 'Medium', 'Hard']
  const sizes = ['Small', 'Medium', 'Large']
  const lightRequirements = ['Low Light', 'Indirect Light', 'Bright Light', 'Direct Sunlight']
  const wateringFrequencies = ['Low', 'Moderate', 'High']

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const applyFilters = () => {
    setFilters(localFilters)
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    const resetFilters = {
      category: '',
      minPrice: '',
      maxPrice: '',
      stockAvailable: '',
      careLevel: '',
      size: '',
      lightRequirement: '',
      wateringFrequency: ''
    }
    setLocalFilters(resetFilters)
    setFilters(resetFilters)
    setIsFilterOpen(false)
    if (onReset) onReset()
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-6 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
          <input
            type="text"
            placeholder="Search plants by name, category, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border transition-all duration-200 text-sm sm:text-base font-medium ${
            hasActiveFilters
              ? 'bg-green-50 border-green-200 text-green-700 shadow-sm'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:shadow-sm'
          }`}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="bg-green-600 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
              {Object.values(filters).filter(v => v !== '').length}
            </span>
          )}
          <ChevronDown 
            className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 text-sm sm:text-base font-medium border border-gray-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 pt-4 sm:pt-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Category
                </label>
                <select
                  value={localFilters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Price Range (₹)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={localFilters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={localFilters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Stock Availability */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Availability
                </label>
                <select
                  value={localFilters.stockAvailable}
                  onChange={(e) => handleFilterChange('stockAvailable', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All</option>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              {/* Care Level */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Care Level
                </label>
                <select
                  value={localFilters.careLevel}
                  onChange={(e) => handleFilterChange('careLevel', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All Levels</option>
                  {careLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Size
                </label>
                <select
                  value={localFilters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All Sizes</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Light Requirement */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Light Requirement
                </label>
                <select
                  value={localFilters.lightRequirement}
                  onChange={(e) => handleFilterChange('lightRequirement', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All Light Levels</option>
                  {lightRequirements.map((light) => (
                    <option key={light} value={light}>
                      {light}
                    </option>
                  ))}
                </select>
              </div>

              {/* Watering Frequency */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Watering Frequency
                </label>
                <select
                  value={localFilters.wateringFrequency}
                  onChange={(e) => handleFilterChange('wateringFrequency', e.target.value)}
                  className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
                >
                  <option value="">All Frequencies</option>
                  {wateringFrequencies.map((frequency) => (
                    <option key={frequency} value={frequency}>
                      {frequency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsFilterOpen(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium border border-gray-200 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={applyFilters}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md text-sm sm:text-base"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SearchAndFilter
