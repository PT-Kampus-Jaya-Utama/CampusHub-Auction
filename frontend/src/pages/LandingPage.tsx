import { Container, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import StatsCard from '../components/StatsCard'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />

      {/* Welcome Banner */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #EAF4FF 0%, #ffffff 100%)',
          py: 8,
          mb: 6,
          borderBottom: '1px solid rgba(0, 50, 102, 0.08)',
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
                fontSize: { xs: '2.5rem', md: '3rem' },
              }}
            >
              Dashboard
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{
                mb: 4,
                fontWeight: 500,
              }}
            >
              Discover amazing auctions and rent items
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/recommendations')}
                sx={{
                  px: 4,
                  background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                  },
                }}
              >
                View Recommendations
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/favs')}
                sx={{
                  px: 4,
                  borderWidth: '2px',
                  '&:hover': {
                    borderWidth: '2px',
                    backgroundColor: 'rgba(0, 50, 102, 0.04)',
                  },
                }}
              >
                My Wishlist
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

export default LandingPage
