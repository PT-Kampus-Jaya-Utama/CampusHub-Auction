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
} from '@mui/material'
import logo from '../assets/logo/logo.svg'

const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowAlert(true)
    setTimeout(() => {
      navigate('/login')
    }, 2000)
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
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Forgot Password
            </Typography>

            <Typography
              variant="body1"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Enter your email address and we'll send you a reset link
            </Typography>

            {showAlert && (
              <Alert
                severity="info"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                Reset link sent to your email id
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                  },
                }}
              >
                Reset Password
              </Button>
              <Button
                fullWidth
                onClick={() => navigate('/login')}
                variant="outlined"
                size="large"
                sx={{
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                  },
                }}
              >
                Back to Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default ForgotPassword
