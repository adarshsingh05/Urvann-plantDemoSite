import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Star, 
  Calendar, 
  Sparkles, 
  Heart, 
  Sun, 
  Droplets,
  Leaf,
  ArrowLeft,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react'

const PlantSpotlight = ({ plants }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [showTrivia, setShowTrivia] = useState(false)

  // Featured plants with spotlight data
  const spotlightPlants = plants?.slice(0, 6).map((plant, index) => ({
    ...plant,
    spotlightData: {
      funFact: getFunFact(plant),
      seasonal: getSeasonalInfo(plant),
      careTip: getCareTip(plant),
      trivia: getTrivia(plant),
      spotlightReason: getSpotlightReason(plant)
    }
  })) || []

  function getFunFact(plant) {
    const facts = [
      "Did you know? This plant can purify air better than most air purifiers!",
      "Fun fact: This plant has been around since the time of dinosaurs!",
      "Interesting: This plant can communicate with other plants through underground networks!",
      "Amazing: This plant can survive in almost any environment!",
      "Cool fact: This plant is actually a natural stress reliever!",
      "Did you know? This plant can grow up to 10 feet tall in the wild!"
    ]
    return facts[Math.floor(Math.random() * facts.length)]
  }

  function getSeasonalInfo(plant) {
    const seasons = [
      { season: "Spring", info: "Perfect time to repot and fertilize!" },
      { season: "Summer", info: "Loves the extra sunlight and warmth!" },
      { season: "Autumn", info: "Time to prepare for winter dormancy!" },
      { season: "Winter", info: "Reduced watering needed during cold months!" }
    ]
    return seasons[Math.floor(Math.random() * seasons.length)]
  }

  function getCareTip(plant) {
    const tips = [
      "💡 Pro tip: Rotate this plant weekly for even growth!",
      "💡 Pro tip: Use filtered water for best results!",
      "💡 Pro tip: Mist the leaves occasionally for humidity!",
      "💡 Pro tip: Keep away from cold drafts!",
      "💡 Pro tip: Prune yellow leaves regularly!",
      "💡 Pro tip: Use a well-draining pot for healthy roots!"
    ]
    return tips[Math.floor(Math.random() * tips.length)]
  }

  function getTrivia(plant) {
    const trivia = [
      "This plant is native to tropical rainforests!",
      "It can live for over 50 years with proper care!",
      "The leaves can grow up to 3 feet long!",
      "It's considered a symbol of good luck!",
      "This plant is completely pet-safe!",
      "It's one of NASA's top air-purifying plants!"
    ]
    return trivia[Math.floor(Math.random() * trivia.length)]
  }

  function getSpotlightReason(plant) {
    const reasons = [
      "🌟 Featured for its stunning foliage!",
      "🌟 Spotlighted for its easy care nature!",
      "🌟 Highlighted for its air-purifying abilities!",
      "🌟 Showcased for its unique growth pattern!",
      "🌟 Featured for its pet-friendly qualities!",
      "🌟 Spotlighted for its beginner-friendly care!"
    ]
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % spotlightPlants.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, spotlightPlants.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % spotlightPlants.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + spotlightPlants.length) % spotlightPlants.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (!spotlightPlants.length) return null

  const currentPlant = spotlightPlants[currentIndex]

  return (
    <section className="py-12 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Plant Spotlight
            </h2>
            <Sparkles className="h-8 w-8 text-yellow-500" />
          </motion.div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our featured plants with fun facts, care tips, and seasonal highlights!
          </p>
        </div>

                 {/* Carousel Container */}
         <div className="relative max-w-4xl lg:max-w-7xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/30 via-blue-100/30 to-purple-100/30" />
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

                                 {/* Content */}
                 <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
                                     {/* Image Section */}
                   <div className="relative p-8 lg:p-12 flex items-center justify-center">
                    <div className="relative group">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                                                 <img
                           src={currentPlant.imageUrl}
                           alt={currentPlant.name}
                           className="w-full h-80 lg:h-96 object-cover rounded-xl shadow-lg"
                           onError={(e) => {
                             e.target.src = 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
                           }}
                         />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                        
                        {/* Floating Badges */}
                        <div className="absolute top-4 left-4">
                          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Featured
                          </div>
                        </div>
                        
                        <div className="absolute top-4 right-4">
                          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {currentPlant.spotlightData.seasonal.season}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                                     {/* Info Section */}
                   <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      {/* Plant Name & Price */}
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                          {currentPlant.name}
                        </h3>
                        <p className="text-2xl font-bold text-green-600 mb-2">
                          ₹{currentPlant.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          {currentPlant.spotlightData.spotlightReason}
                        </p>
                      </div>

                      {/* Fun Fact */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-yellow-500"
                      >
                        <div className="flex items-start gap-3">
                          <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Fun Fact</h4>
                            <p className="text-sm text-gray-700">{currentPlant.spotlightData.funFact}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Care Tip */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-green-500"
                      >
                        <div className="flex items-start gap-3">
                          <Leaf className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Care Tip</h4>
                            <p className="text-sm text-gray-700">{currentPlant.spotlightData.careTip}</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Seasonal Info */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-blue-500"
                      >
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {currentPlant.spotlightData.seasonal.season} Care
                            </h4>
                            <p className="text-sm text-gray-700">
                              {currentPlant.spotlightData.seasonal.info}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                                             {/* Action Buttons */}
                       <div className="flex gap-3 pt-4">
                         <Link
                           to={`/plant/${currentPlant._id}`}
                           className="flex-1 btn btn-primary flex items-center justify-center gap-2 px-6 py-3 text-base"
                         >
                           <Leaf className="h-4 w-4" />
                           View Details
                         </Link>
                         <button
                           onClick={() => setShowTrivia(!showTrivia)}
                           className="btn btn-outline flex items-center gap-2 px-6 py-3 text-base"
                         >
                           <Sparkles className="h-4 w-4" />
                           Trivia
                         </button>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

                         {/* Navigation Arrows */}
             <button
               onClick={prevSlide}
               className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
             >
               <ArrowLeft className="h-6 w-6 text-gray-700" />
             </button>
             <button
               onClick={nextSlide}
               className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
             >
               <ArrowRight className="h-6 w-6 text-gray-700" />
             </button>

             {/* Auto-play Toggle */}
             <button
               onClick={() => setIsAutoPlaying(!isAutoPlaying)}
               className="absolute top-4 left-1/2 -translate-x-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
             >
               {isAutoPlaying ? (
                 <Pause className="h-5 w-5 text-gray-700" />
               ) : (
                 <Play className="h-5 w-5 text-gray-700" />
               )}
             </button>
          </div>

                     {/* Dots Indicator */}
           <div className="flex justify-center mt-6 gap-3">
             {spotlightPlants.map((_, index) => (
               <button
                 key={index}
                 onClick={() => goToSlide(index)}
                 className={`w-4 h-4 rounded-full transition-all duration-300 ${
                   index === currentIndex
                     ? 'bg-green-500 scale-125'
                     : 'bg-gray-300 hover:bg-gray-400'
                 }`}
               />
             ))}
           </div>
        </div>

        {/* Trivia Popup */}
        <AnimatePresence>
          {showTrivia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowTrivia(false)}
            >
              <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Plant Trivia
                </h3>
                <p className="text-gray-700 mb-6">
                  {currentPlant.spotlightData.trivia}
                </p>
                                 <button
                   onClick={() => setShowTrivia(false)}
                   className="btn btn-primary px-6 py-3 text-base"
                 >
                   Cool!
                 </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PlantSpotlight
