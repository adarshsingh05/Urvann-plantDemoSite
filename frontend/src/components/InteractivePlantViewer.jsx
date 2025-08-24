import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  Droplets, 
  Sun, 
  Star,
  Leaf,
  Heart,
  Clock,
  Thermometer
} from 'lucide-react'

const InteractivePlantViewer = ({ plant, onClose }) => {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [activeTip, setActiveTip] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const containerRef = useRef(null)
  const lastMousePos = useRef({ x: 0, y: 0 })

  // Care tips data
  const careTips = [
    {
      id: 'watering',
      icon: <Droplets className="h-5 w-5" />,
      title: 'Watering',
      tip: plant.wateringFrequency === 'Low' ? 'Water sparingly, only when soil is completely dry.' :
            plant.wateringFrequency === 'Moderate' ? 'Water when top inch of soil feels dry.' :
            'Keep soil consistently moist but not waterlogged.',
      color: 'bg-blue-500'
    },
    {
      id: 'light',
      icon: <Sun className="h-5 w-5" />,
      title: 'Light Requirements',
      tip: plant.lightRequirement === 'Low Light' ? 'Place in a shady spot away from direct sunlight.' :
            plant.lightRequirement === 'Indirect Light' ? 'Place near a window with filtered light.' :
            plant.lightRequirement === 'Bright Light' ? 'Place in a bright room with plenty of natural light.' :
            'Place in a sunny spot with direct sunlight.',
      color: 'bg-yellow-500'
    },
    {
      id: 'care',
      icon: <Star className="h-5 w-5" />,
      title: 'Care Level',
      tip: plant.careLevel === 'Easy' ? 'Perfect for beginners! This plant is very forgiving.' :
            plant.careLevel === 'Medium' ? 'Some experience needed. Pay attention to care instructions.' :
            'Advanced care required. Best for experienced plant parents.',
      color: 'bg-green-500'
    },
    {
      id: 'growth',
      icon: <Leaf className="h-5 w-5" />,
      title: 'Growth Pattern',
      tip: plant.size === 'Small' ? 'Perfect for desks, shelves, and small spaces.' :
            plant.size === 'Medium' ? 'Great for tabletops and medium-sized rooms.' :
            'Makes a statement in living rooms and large spaces.',
      color: 'bg-purple-500'
    }
  ]

  // Mouse event handlers for rotation
  const handleMouseDown = (e) => {
    setIsDragging(true)
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - lastMousePos.current.x
    const deltaY = e.clientY - lastMousePos.current.y
    
    setRotation(prev => prev + deltaX * 0.5)
    lastMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true)
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    
    const deltaX = e.touches[0].clientX - lastMousePos.current.x
    const deltaY = e.touches[0].clientY - lastMousePos.current.y
    
    setRotation(prev => prev + deltaX * 0.5)
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setRotation(0)
    setZoom(1)
  }

  // Auto-rotate effect
  useEffect(() => {
    if (!isDragging && !showDetails) {
      const interval = setInterval(() => {
        setRotation(prev => prev + 0.5)
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isDragging, showDetails])

  // ESC key to close modal and prevent body scroll
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden'

    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{plant.name}</h2>
            <p className="text-gray-600">Interactive Plant Explorer - Click and drag to rotate, use controls to zoom</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-120px)]">
          {/* Interactive Plant Viewer */}
          <div className="flex-1 p-6">
            <div className="relative h-full">
              {/* Plant Container */}
              <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Plant Image with Rotation and Zoom */}
                <motion.div
                  style={{
                    rotateY: rotation,
                    scale: zoom,
                  }}
                  className="relative"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {!imageLoaded && (
                    <div className="flex items-center justify-center w-full h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
                    </div>
                  )}
                  <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    className={`max-w-full max-h-full object-contain rounded-lg shadow-lg transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
                      setImageLoaded(true)
                    }}
                  />
                  
                  {/* Floating Care Tips */}
                  <AnimatePresence>
                    {activeTip && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`p-2 rounded-full ${activeTip.color} text-white`}>
                            {activeTip.icon}
                          </div>
                          <h4 className="font-semibold text-gray-900">{activeTip.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{activeTip.tip}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Instructions */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 max-w-xs">
                  <p className="text-xs text-gray-600">
                    <strong>💡 Tips:</strong> Drag to rotate • Use buttons to zoom • Click care tips for info
                  </p>
                </div>

                {/* Rotation Indicator */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                </div>

                {/* Zoom Level Indicator */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-sm font-medium text-gray-700">{Math.round(zoom * 100)}%</span>
                </div>
              </div>

              {/* Controls */}
              <div className="absolute top-4 left-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomIn}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleZoomOut}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleReset}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  title="Reset View"
                >
                  <RotateCcw className="w-5 h-5 text-gray-700" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  title="Toggle Details"
                >
                  <Info className="w-5 h-5 text-gray-700" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Plant Details Panel */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 400, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-gray-50 border-l border-gray-200 overflow-hidden"
              >
                <div className="p-6 h-full overflow-y-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Plant Details</h3>
                  
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Basic Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-medium text-green-600">₹{plant.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Care Level:</span>
                          <span className="font-medium">{plant.careLevel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">{plant.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stock:</span>
                          <span className={`font-medium ${plant.stockAvailable ? 'text-green-600' : 'text-red-600'}`}>
                            {plant.stockAvailable ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {plant.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    {plant.description && (
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{plant.description}</p>
                      </div>
                    )}

                    {/* Interactive Care Tips */}
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Care Tips</h4>
                      <div className="space-y-3">
                        {careTips.map((tip) => (
                          <motion.button
                            key={tip.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTip(activeTip?.id === tip.id ? null : tip)}
                            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                              activeTip?.id === tip.id 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${tip.color} text-white`}>
                                {tip.icon}
                              </div>
                              <div className="text-left">
                                <h5 className="font-medium text-gray-900">{tip.title}</h5>
                                <p className="text-sm text-gray-600 mt-1">{tip.tip}</p>
                              </div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default InteractivePlantViewer
