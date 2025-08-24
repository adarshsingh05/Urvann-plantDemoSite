import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { motion } from 'framer-motion'
import { 
  Grid3X3, 
  List, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X
} from 'lucide-react'
import { plantAPI } from '../services/api'
import PlantCard from '../components/PlantCard'
import SearchAndFilter from '../components/SearchAndFilter'
import LoadingSpinner from '../components/LoadingSpinner'

const PlantCatalog = () => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    stockAvailable: '',
    careLevel: '',
    size: '',
    lightRequirement: '',
    wateringFrequency: ''
  })

  // Fetch categories
  const { data: categoriesData } = useQuery(
    ['categories'],
    () => plantAPI.getCategories(),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  // Build query parameters
  const queryParams = {
    page: currentPage,
    limit: 12,
    ...(searchTerm && { search: searchTerm }),
    ...(filters.category && { category: filters.category }),
    ...(filters.minPrice && { minPrice: filters.minPrice }),
    ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
    ...(filters.stockAvailable !== '' && { stockAvailable: filters.stockAvailable }),
    ...(filters.careLevel && { careLevel: filters.careLevel }),
    ...(filters.size && { size: filters.size }),
    ...(filters.lightRequirement && { lightRequirement: filters.lightRequirement }),
    ...(filters.wateringFrequency && { wateringFrequency: filters.wateringFrequency }),
  }

  // Fetch plants
  const { 
    data: plantsData, 
    isLoading, 
    error,
    refetch 
  } = useQuery(
    ['plants', queryParams],
    () => plantAPI.getPlants(queryParams),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000,
    }
  )

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filters])

  const handleReset = () => {
    setSearchTerm('')
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      stockAvailable: '',
      careLevel: '',
      size: '',
      lightRequirement: '',
      wateringFrequency: ''
    })
    setCurrentPage(1)
  }

  const plants = plantsData?.data?.plants || []
  const pagination = plantsData?.data?.pagination || {}
  const categories = categoriesData?.data || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">Failed to load plants. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-3 sm:py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-6">
        {/* Header */}
        <motion.div 
          className="mb-3 sm:mb-4 lg:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Plant Catalog</h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600">
            Discover our complete collection of beautiful indoor plants
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            onReset={handleReset}
          />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 lg:mb-6 gap-2 sm:gap-3 lg:gap-4">
          <div>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600">
              {isLoading ? 'Loading...' : `Showing ${plants.length} of ${pagination.totalItems || 0} plants`}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">View:</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 sm:p-3 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Grid view"
              >
                <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 sm:p-3 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="List view"
              >
                <List className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Plants Grid/List */}
        {isLoading ? (
          <div className="flex justify-center py-6 sm:py-8 lg:py-12">
            <LoadingSpinner size="lg" text="Loading plants..." />
          </div>
        ) : plants.length === 0 ? (
          <motion.div 
            className="text-center py-6 sm:py-8 lg:py-12 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-gray-400 text-3xl sm:text-4xl lg:text-6xl mb-2 sm:mb-3 lg:mb-4">🌱</div>
            <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold text-gray-900 mb-2">No plants found</h3>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={handleReset}
              className="btn btn-primary text-xs sm:text-sm lg:text-base"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6'
                : 'space-y-2 sm:space-y-3 lg:space-y-4'
            }
          >
            {plants.map((plant, index) => (
              <motion.div key={plant._id} variants={itemVariants}>
                <PlantCard plant={plant} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center space-x-1 sm:space-x-2 mt-4 sm:mt-6 lg:mt-8 xl:mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!pagination.hasPrevPage}
              className="p-2 sm:p-3 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                let pageNum
                if (pagination.totalPages <= 5) {
                  pageNum = i + 1
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1
                } else if (pagination.currentPage >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i
                } else {
                  pageNum = pagination.currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      pageNum === pagination.currentPage
                        ? 'bg-green-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
              disabled={!pagination.hasNextPage}
              className="p-2 sm:p-3 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5" />
            </button>
          </motion.div>
        )}

        {/* Page Info */}
        {pagination.totalPages > 1 && (
          <div className="text-center mt-2 sm:mt-3 lg:mt-4 text-xs sm:text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
        )}
      </div>
    </div>
  )
}

export default PlantCatalog
