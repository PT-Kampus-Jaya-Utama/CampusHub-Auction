import axios from 'axios'

const API_CONFIG = {
  AUTH_SERVICE: import.meta.env.VITE_AUTH_SERVICE || 'http://localhost:3001',
  REGISTRATION_SERVICE: import.meta.env.VITE_REGISTRATION_SERVICE || 'http://localhost:3002',
  SEARCH_SERVICE: import.meta.env.VITE_SEARCH_SERVICE || 'http://localhost:3003',
  BIDDING_SERVICE: import.meta.env.VITE_BIDDING_SERVICE || 'http://localhost:3004',
  RECOMMENDATION_SERVICE: import.meta.env.VITE_RECOMMENDATION_SERVICE || 'http://localhost:3005',
}

export const authApi = axios.create({
  baseURL: API_CONFIG.AUTH_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registrationApi = axios.create({
  baseURL: API_CONFIG.REGISTRATION_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const searchApi = axios.create({
  baseURL: API_CONFIG.SEARCH_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const biddingApi = axios.create({
  baseURL: API_CONFIG.BIDDING_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const recommendationApi = axios.create({
  baseURL: API_CONFIG.RECOMMENDATION_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add JWT token to all requests
const apis = [authApi, registrationApi, searchApi, biddingApi, recommendationApi]

apis.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token')
      if (token) {
        config.headers.Authorization = token
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor for error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Unauthorized - clear session and redirect to login
        sessionStorage.removeItem('username')
        sessionStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
})

export default API_CONFIG
