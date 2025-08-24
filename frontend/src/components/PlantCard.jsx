import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { 
  Leaf, 
  Star, 
  Droplets, 
  Sun, 
  Ruler,
  CheckCircle,
  XCircle,
  ShoppingCart,
  Heart,
  Eye
} from 'lucide-react'
import Toast from './Toast'
import InteractivePlantViewer from './InteractivePlantViewer'

const PlantCard = ({ plant }) => {
  const [toast, setToast] = useState({ isVisible: false, message: '', type: 'info' })
  const [showInteractiveViewer, setShowInteractiveViewer] = useState(false)
  
  const {
    _id,
    name,
    price,
    categories,
    stockAvailable,
    description,
    imageUrl,
    careLevel,
    size,
    lightRequirement,
    wateringFrequency
  } = plant

  const getCareLevelColor = (level) => {
    switch (level) {
      case 'Easy': return 'text-green-600 bg-green-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Hard': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSizeIcon = (size) => {
    switch (size) {
      case 'Small': return <Ruler className="h-3 w-3" />
      case 'Medium': return <Ruler className="h-4 w-4" />
      case 'Large': return <Ruler className="h-5 w-5" />
      default: return <Ruler className="h-4 w-4" />
    }
  }

  const getLightIcon = (light) => {
    switch (light) {
      case 'Low Light': return <Sun className="h-3 w-3" />
      case 'Indirect Light': return <Sun className="h-4 w-4" />
      case 'Bright Light': return <Sun className="h-5 w-5" />
      case 'Direct Sunlight': return <Sun className="h-5 w-5" />
      default: return <Sun className="h-4 w-4" />
    }
  }

  const getWateringIcon = (frequency) => {
    switch (frequency) {
      case 'Low': return <Droplets className="h-3 w-3" />
      case 'Moderate': return <Droplets className="h-4 w-4" />
      case 'High': return <Droplets className="h-5 w-5" />
      default: return <Droplets className="h-4 w-4" />
    }
  }

  const showToast = (message, type = 'info') => {
    setToast({ isVisible: true, message, type })
  }

  const hideToast = () => {
    setToast({ isVisible: false, message: '', type: 'info' })
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    showToast('🛒 Shopping cart feature coming soon!', 'info')
  }

  const handleAddToWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    showToast('💚 Wishlist feature coming soon!', 'info')
  }

  const handleInteractiveView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowInteractiveViewer(true)
  }

  const handleCloseInteractiveViewer = () => {
    setShowInteractiveViewer(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-xl shadow-lg overflow-hidden plant-card"
    >
      {/* Stock Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        {stockAvailable ? (
          <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="h-3 w-3" />
            <span className="hidden sm:inline">In Stock</span>
            <span className="sm:hidden">✓</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
            <XCircle className="h-3 w-3" />
            <span className="hidden sm:inline">Out of Stock</span>
            <span className="sm:hidden">✗</span>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
                 {/* Quick Action Buttons */}
         <div className="absolute top-3 left-3 z-20 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                       <button
              onClick={handleInteractiveView}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 z-20 hover:shadow-xl group/btn relative"
              aria-label="Interactive view"
              onMouseEnter={(e) => e.stopPropagation()}
              onMouseLeave={(e) => e.stopPropagation()}
            >
              <Eye className="h-4 w-4 text-gray-700 group-hover/btn:text-green-600" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Click to open interactive view
              </div>
            </button>
           <button
             onClick={handleAddToCart}
             className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 z-20 hover:shadow-xl"
             aria-label="Add to cart"
             onMouseEnter={(e) => e.stopPropagation()}
             onMouseLeave={(e) => e.stopPropagation()}
           >
             <ShoppingCart className="h-4 w-4 text-gray-700" />
           </button>
           <button
             onClick={handleAddToWishlist}
             className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 hover:scale-110 z-20 hover:shadow-xl"
             aria-label="Add to wishlist"
             onMouseEnter={(e) => e.stopPropagation()}
             onMouseLeave={(e) => e.stopPropagation()}
           >
             <Heart className="h-4 w-4 text-gray-700" />
           </button>
         </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Title and Price */}
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-1 group-hover:text-green-600 transition-colors flex-1">
            {name}
          </h3>
          <div className="text-right flex-shrink-0">
            <p className="text-lg sm:text-xl font-bold text-green-600">₹{price}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2">
          {description || 'Beautiful plant perfect for your home.'}
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mb-3">
          {categories.slice(0, 2).map((category, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              <Leaf className="h-3 w-3 mr-1" />
              <span className="hidden sm:inline">{category}</span>
              <span className="sm:hidden">{category.split(' ')[0]}</span>
            </span>
          ))}
          {categories.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{categories.length - 2}
            </span>
          )}
        </div>

        {/* Care Info */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <div className={`p-1 rounded ${getCareLevelColor(careLevel)}`}>
              <Star className="h-3 w-3" />
            </div>
            <span className="truncate hidden sm:inline">{careLevel}</span>
            <span className="sm:hidden">{careLevel?.charAt(0)}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <div className="p-1 rounded bg-blue-100 text-blue-600">
              {getSizeIcon(size)}
            </div>
            <span className="truncate hidden sm:inline">{size}</span>
            <span className="sm:hidden">{size?.charAt(0)}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <div className="p-1 rounded bg-yellow-100 text-yellow-600">
              {getLightIcon(lightRequirement)}
            </div>
            <span className="truncate hidden sm:inline">Light</span>
            <span className="sm:hidden">L</span>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/plant/${_id}`}
          className={`w-full btn btn-primary btn-md flex items-center justify-center space-x-2 text-sm sm:text-base ${
            !stockAvailable ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={(e) => {
            if (!stockAvailable) {
              e.preventDefault()
            }
          }}
        >
          <span>{stockAvailable ? 'View Details' : 'Out of Stock'}</span>
        </Link>
      </div>
      
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
        duration={3000}
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
    </motion.div>
  )
}

export default PlantCard
