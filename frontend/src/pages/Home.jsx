import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from 'react-query'
import { 
  ArrowRight, 
  Leaf, 
  Star, 
  TrendingUp, 
  Users,
  Package,
  Shield,
  Truck,
  Eye
} from 'lucide-react'
import { plantAPI } from '../services/api'
import PlantCard from '../components/PlantCard'
import LoadingSpinner from '../components/LoadingSpinner'
import PlantSpotlight from '../components/PlantSpotlight'

const Home = () => {
  const [featuredPlants, setFeaturedPlants] = useState([])

  // Fetch featured plants
  const { data: plantsData, isLoading: plantsLoading } = useQuery(
    ['plants', 'featured'],
    () => plantAPI.getPlants({ limit: 6, sortBy: 'createdAt', sortOrder: 'desc' }),
    {
      staleTime: 5 * 60 * 1000,
    }
  )

  // Fetch stats
  const { data: statsData } = useQuery(
    ['stats'],
    () => plantAPI.getStats(),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  useEffect(() => {
    if (plantsData?.data?.plants) {
      setFeaturedPlants(plantsData.data.plants)
    }
  }, [plantsData])

  const features = [
    {
      icon: Package,
      title: 'Premium Quality',
      description: 'Carefully selected plants from trusted growers'
    },
    {
      icon: Shield,
      title: 'Plant Guarantee',
      description: '30-day health guarantee on all plants'
    },
    {
      icon: Truck,
      title: 'Safe Delivery',
      description: 'Secure packaging and fast delivery'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Plant care advice from our experts'
    }
  ]

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-emerald-100 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2304d361%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Bring Nature
              <span className="text-green-600"> Home</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover our curated collection of beautiful indoor plants. 
              Transform your space into a green oasis with our premium selection.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/catalog"
                className="btn btn-primary btn-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>Explore Plants</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/add-plant"
                className="btn btn-outline btn-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
              >
                <span>Add New Plant</span>
                <Leaf className="h-5 w-5" />
              </Link>
              <button
                onClick={() => {
                  // Create a demo modal with improved content
                  const modal = document.createElement('div')
                  modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                  modal.innerHTML = `
                    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6">
                      <div class="text-center">
                        <h3 class="text-2xl font-bold text-gray-900 mb-4">🎉 Interactive Plant Explorer</h3>
                        <p class="text-gray-600 mb-4">Just a demo - we can import the 3D model and preview same for now you can click on the eye icon and see image interaction!</p>
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <p class="text-sm text-blue-800">
                            <strong>💡 How to try:</strong> Go to the plant catalog and click the 👁️ eye icon on any plant card to see the interactive viewer in action!
                          </p>
                        </div>
                        
                      </div>
                    </div>
                  `
                  document.body.appendChild(modal)
                  
                  // Auto-remove after 5 seconds
                  setTimeout(() => {
                    if (modal.parentNode) {
                      modal.remove()
                    }
                  }, 5000)
                }}
                className="btn btn-secondary btn-lg flex items-center justify-center space-x-2 w-full sm:w-auto px-6 py-3"
              >
                <span>Try Interactive View</span>
                <Eye className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {statsData && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-center p-4"
                variants={itemVariants}
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  {statsData.data?.totalPlants || 0}
                </div>
                <div className="text-sm sm:text-base text-gray-600">Total Plants</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                variants={itemVariants}
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  {statsData.data?.inStockPlants || 0}
                </div>
                <div className="text-sm sm:text-base text-gray-600">In Stock</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                variants={itemVariants}
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  ₹{Math.round(statsData.data?.averagePrice || 0)}
                </div>
                <div className="text-sm sm:text-base text-gray-600">Avg Price</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-4"
                variants={itemVariants}
              >
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                  {statsData.data?.topCategories?.length || 0}
                </div>
                <div className="text-sm sm:text-base text-gray-600">Categories</div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Plant Spotlight Section */}
      {featuredPlants.length > 0 && (
        <PlantSpotlight plants={featuredPlants} />
      )}

      {/* Features Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Urvan Plant Store?
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              We're committed to providing the best plants and service to help you create your perfect green space.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div 
                  key={index}
                  className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  variants={itemVariants}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-lg mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Plants
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Discover our most popular and beautiful plants, carefully selected for your home.
            </p>
          </motion.div>

          {plantsLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredPlants.map((plant, index) => (
                <motion.div key={plant._id} variants={itemVariants}>
                  <PlantCard plant={plant} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            className="text-center mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/catalog"
              className="btn btn-primary btn-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <span>View All Plants</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg sm:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of happy customers who have already created their perfect green oasis.
            </p>
            <Link
              to="/catalog"
              className="btn bg-white text-green-600 hover:bg-gray-100 btn-lg flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
