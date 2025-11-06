import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { authService } from '../services/authService'
import useAuthStore from '../store/authStore'
import logo from '../assets/logo/logo.svg'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [invalidLogin, setInvalidLogin] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setInvalidLogin(false)
    setLoading(true)

    try {
      const response = await authService.authenticate(username, password)
      login(username, response.token)
      navigate(`/landing?username=${username}`)
    } catch (error) {
      setInvalidLogin(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #EAF4FF 0%, #ffffff 50%, #EAF4FF 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            boxShadow: '0 20px 60px rgba(0, 50, 102, 0.12)',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                component="img"
                src={logo}
                alt="CampusHub Auction"
                sx={{
                  height: 50,
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/')}
              />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              color="primary"
              sx={{ fontWeight: 700, mb: 4 }}
            >
              Welcome Back
            </Typography>

            {invalidLogin && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                Invalid email or password
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main',
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  mb: 2,
                  background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                  },
                }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 2,
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                <Button
                  onClick={() => navigate('/forgot')}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0, 50, 102, 0.04)',
                    },
                  }}
                >
                  Forgot Password?
                </Button>
                <Button
                  onClick={() => navigate('/registration')}
                  sx={{
                    color: 'info.main',
                    fontWeight: 600,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'rgba(0, 50, 102, 0.04)',
                    },
                  }}
                >
                  Create new Account
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Login
