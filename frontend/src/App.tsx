import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'
import useAuthStore from './store/authStore'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ForgotPassword from './pages/ForgotPassword'
import LandingPage from './pages/LandingPage'
import Search from './pages/Search'
import Wishlist from './pages/Wishlist'
import Recommendations from './pages/Recommendations'
import RentItems from './pages/RentItems'
import HelpDesk from './pages/HelpDesk'

function App() {
  const { initialize } = useAuthStore()

  useEffect(() => {
    // Initialize auth state from sessionStorage
    initialize()
  }, [initialize])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/app-home" replace />} />
          <Route path="/app-home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot" element={<ForgotPassword />} />

          {/* Protected routes */}
          <Route
            path="/landing"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/:value"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favs"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rentItems"
            element={
              <ProtectedRoute>
                <RentItems />
              </ProtectedRoute>
            }
          />
          <Route
            path="/helpdesk"
            element={
              <ProtectedRoute>
                <HelpDesk />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found */}
          <Route path="*" element={<Navigate to="/app-home" replace />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  )
}

export default App
