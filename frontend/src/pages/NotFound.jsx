import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-md mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Icon */}
          <div className="text-8xl mb-6">🌱</div>
          
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          
          <p className="text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off into the garden. 
            Let's get you back to exploring our beautiful plants.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="btn btn-primary btn-lg w-full flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Go Home</span>
            </Link>
            
            <Link
              to="/catalog"
              className="btn btn-outline btn-lg w-full flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Browse Plants</span>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="btn btn-ghost w-full flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
