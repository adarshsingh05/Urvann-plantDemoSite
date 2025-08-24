import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
   
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Plant API functions
export const plantAPI = {
  // Get all plants with filters
  getPlants: (params = {}) => {
    return api.get('/plants', { params })
  },

  // Get single plant by ID
  getPlant: (id) => {
    return api.get(`/plants/${id}`)
  },

  // Add new plant
  addPlant: (plantData) => {
    return api.post('/plants', plantData)
  },

  // Update plant
  updatePlant: (id, plantData) => {
    return api.put(`/plants/${id}`, plantData)
  },

  // Delete plant
  deletePlant: (id) => {
    return api.delete(`/plants/${id}`)
  },

  // Get all categories
  getCategories: () => {
    return api.get('/plants/categories')
  },

  // Get plant statistics
  getStats: () => {
    return api.get('/plants/stats/overview')
  },
}

// Health check
export const healthCheck = () => {
  return api.get('/health')
}

export default api
