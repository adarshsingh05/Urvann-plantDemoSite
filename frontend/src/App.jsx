import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PlantCatalog from './pages/PlantCatalog'
import AddPlant from './pages/AddPlant'
import PlantDetail from './pages/PlantDetail'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<PlantCatalog />} />
            <Route path="/add-plant" element={<AddPlant />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

export default App
