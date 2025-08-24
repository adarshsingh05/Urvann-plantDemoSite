import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  ArrowLeft, 
  Leaf, 
  Star, 
  Droplets, 
  Sun, 
  Ruler,
  CheckCircle,
  XCircle,
  Heart,
  Share2,
  ShoppingCart,
  Calendar,
  Clock,
  Eye
} from 'lucide-react'
import { plantAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import Toast from '../components/Toast'
import InteractivePlantViewer from '../components/InteractivePlantViewer'

const PlantDetail = () => {
  const { id } = useParams()
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' })
  const [showInteractiveViewer, setShowInteractiveViewer] = useState(false)

  const { data: plantData, isLoading, error } = useQuery(
    ['plant', id],
    () => plantAPI.getPlant(id),
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  const plant = plantData?.data

  const getCareLevelColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getCareLevelIcon = (level) => {
    switch (level) {
      case 'Easy': return '🌱'
      case 'Medium': return '🌿'
      case 'Hard': return '🌳'
      default: return '🌱'
    }
  }

  const getLightIcon = (light) => {
    switch (light) {
      case 'Low Light': return '🌙'
      case 'Indirect Light': return '☁️'
      case 'Bright Light': return '☀️'
      case 'Direct Sunlight': return '🔥'
      default: return '☀️'
    }
  }

  const getWateringIcon = (frequency) => {
    switch (frequency) {
      case 'Low': return '💧'
      case 'Moderate': return '💧💧'
      case 'High': return '💧💧💧'
      default: return '💧'
    }
  }

  const getSizeIcon = (size) => {
    switch (size) {
      case 'Small': return '📏'
      case 'Medium': return '📐'
      case 'Large': return '📏📐'
      default: return '📏'
    }
  }

  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast({ isVisible: false, message: '', type: 'info' })
  }

  const handleAddToCart = () => {
    showToast('🛒 Shopping cart feature coming soon!', 'info')
  }

  const handleAddToWishlist = () => {
    showToast('💚 Wishlist feature coming soon!', 'info')
  }

  const handleShare = () => {
    showToast('📤 Share feature coming soon!', 'info')
  }

  const handleInteractiveView = () => {
    setShowInteractiveViewer(true)
  }

  const handleCloseInteractiveViewer = () => {
    setShowInteractiveViewer(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <LoadingSpinner size="lg" text="Loading plant details..." />
      </div>
    )
  }

  if (error || !plant) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Plant not found</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4">The plant you're looking for doesn't exist or has been removed.</p>
          <Link to="/catalog" className="btn btn-primary">
            Browse Plants
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 sm:mb-6"
        >
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Catalog</span>
          </Link>
        </motion.div>

        {/* Plant Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="relative">
                             <img
                 src={plant.imageUrl}
                 alt={plant.name}
                 className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                 onError={(e) => {
                   e.target.src = 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
                 }}
               />
              
                             {/* Interactive View Overlay */}
               <div 
                 className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 rounded-lg flex items-center justify-center cursor-pointer group/overlay"
                 onClick={handleInteractiveView}
               >
                 <div className="opacity-0 group-hover/overlay:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3">
                   <Eye className="h-6 w-6 text-gray-700 group-hover/overlay:text-green-600" />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/overlay:opacity-100 transition-opacity duration-300">
                   Click to open interactive view
                 </div>
               </div>
              
              {/* Stock Status Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                {plant.stockAvailable ? (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">In Stock</span>
                    <span className="sm:hidden">✓</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Out of Stock</span>
                    <span className="sm:hidden">✗</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex space-x-2">
                <button 
                  onClick={handleAddToWishlist}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  aria-label="Share plant"
                >
                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{plant.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{plant.price}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCareLevelColor(plant.careLevel)} w-fit`}>
                  <span className="mr-1">{getCareLevelIcon(plant.careLevel)}</span>
                  {plant.careLevel} Care
                </span>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {plant.categories.map((category, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm bg-green-100 text-green-800"
                  >
                    <Leaf className="h-3 w-3 mr-1" />
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            {plant.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{plant.description}</p>
              </div>
            )}

            {/* Care Information */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Care Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getCareLevelColor(plant.careLevel)}`}>
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Care Level</p>
                    <p className="text-xs sm:text-sm text-gray-600">{plant.careLevel}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Ruler className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Size</p>
                    <p className="text-xs sm:text-sm text-gray-600">{plant.size}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
                    <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Light</p>
                    <p className="text-xs sm:text-sm text-gray-600">{plant.lightRequirement}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Droplets className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Watering</p>
                    <p className="text-xs sm:text-sm text-gray-600">{plant.wateringFrequency}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Tips */}
            <div className="bg-green-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Care Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-xl sm:text-2xl">{getLightIcon(plant.lightRequirement)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Light Requirements</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {plant.lightRequirement === 'Low Light' && 'Place in a shady spot away from direct sunlight.'}
                      {plant.lightRequirement === 'Indirect Light' && 'Place near a window with filtered light.'}
                      {plant.lightRequirement === 'Bright Light' && 'Place in a bright room with plenty of natural light.'}
                      {plant.lightRequirement === 'Direct Sunlight' && 'Place in a sunny spot with direct sunlight.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-xl sm:text-2xl">{getWateringIcon(plant.wateringFrequency)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Watering</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {plant.wateringFrequency === 'Low' && 'Water sparingly, only when soil is completely dry.'}
                      {plant.wateringFrequency === 'Moderate' && 'Water when top inch of soil feels dry.'}
                      {plant.wateringFrequency === 'High' && 'Keep soil consistently moist but not waterlogged.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="text-xl sm:text-2xl">{getSizeIcon(plant.size)}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Size & Growth</p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {plant.size === 'Small' && 'Perfect for desks, shelves, and small spaces.'}
                      {plant.size === 'Medium' && 'Great for tabletops and medium-sized rooms.'}
                      {plant.size === 'Large' && 'Makes a statement in living rooms and large spaces.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
              <button
                onClick={handleAddToCart}
                disabled={!plant.stockAvailable}
                className={`flex-1 btn btn-primary btn-lg flex items-center justify-center space-x-2 text-sm sm:text-base ${
                  !plant.stockAvailable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{plant.stockAvailable ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              
              <button 
                onClick={handleAddToWishlist}
                className="btn btn-outline btn-lg flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Add to Wishlist</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="text-xs sm:text-sm text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Added on {new Date(plant.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Last updated {new Date(plant.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={4000}
      />

             {/* Interactive Plant Viewer Modal */}
       {showInteractiveViewer && createPortal(
         <AnimatePresence>
           <InteractivePlantViewer
             plant={plant}
             onClose={handleCloseInteractiveViewer}
           />
         </AnimatePresence>,
         document.body
       )}
    </div>
  )
}

export default PlantDetail
