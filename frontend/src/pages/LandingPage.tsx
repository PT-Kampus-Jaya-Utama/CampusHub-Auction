import { Container, Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import StatsCard from '../components/StatsCard'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Welcome to StackBid
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Discover amazing auctions and rent items
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/recommendations')}
            >
              View Recommendations
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/favs')}
            >
              My Wishlist
            </Button>
          </Box>

          <StatsCard />
        </Box>
      </Container>
    </>
  )
}

export default LandingPage
