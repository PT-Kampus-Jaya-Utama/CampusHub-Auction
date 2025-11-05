import { Container, Box, Typography } from '@mui/material'
import BeforeLoginHeader from '../components/BeforeLoginHeader'
import StatsCard from '../components/StatsCard'

const Home = () => {
  return (
    <>
      <BeforeLoginHeader />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center" color="primary">
            Welcome to StackBid
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Your premier e-auction platform for bidding and renting items
          </Typography>
          <StatsCard />
        </Box>
      </Container>
    </>
  )
}

export default Home
