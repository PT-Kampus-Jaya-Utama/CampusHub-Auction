import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Header from '../components/Header'
import { wishlistService } from '../services/wishlistService'
import { WishlistProduct } from '../types'

const Recommendations = () => {
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        const data = await wishlistService.getRecommendations()
        setRecommendations(data)
      } catch (err) {
        console.error('Error fetching recommendations:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [])

  const handleAddToWishlist = async (product: WishlistProduct) => {
    try {
      await wishlistService.addToWishlist(product)
      navigate('/favs')
    } catch (err) {
      console.error('Error adding to wishlist:', err)
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Recommended for You
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Based on your preferences and browsing history
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && recommendations.length === 0 && (
          <Typography variant="h6" align="center" sx={{ my: 4 }}>
            No recommendations available
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {recommendations.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image="https://via.placeholder.com/300x200?text=Recommended+Product"
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {product.des}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Owner: {product.owner}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<FavoriteIcon />}
                    onClick={() => handleAddToWishlist(product)}
                  >
                    Add to Wishlist
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Recommendations
