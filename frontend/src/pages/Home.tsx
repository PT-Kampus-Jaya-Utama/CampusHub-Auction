import { Container, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BeforeLoginHeader from '../components/BeforeLoginHeader'
import StatsCard from '../components/StatsCard'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <BeforeLoginHeader />

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EAF4FF 0%, #ffffff 50%, #EAF4FF 100%)',
          py: 10,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              color="primary"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Welcome to CampusHub Auction
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{
                mb: 5,
                fontWeight: 500,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              Your premier e-auction platform for bidding and renting items within campus
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/login')}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/registration')}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg">
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            align="center"
            color="primary"
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Platform Statistics
          </Typography>
          <StatsCard />
        </Box>
      </Container>
    </>
  )
}

export default Home
