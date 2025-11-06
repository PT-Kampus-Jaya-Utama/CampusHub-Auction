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
import placeholder from '../assets/images/placeholder.svg'

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
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Typography
          variant="h3"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 700, mb: 1 }}
        >
          Recommended for You
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Based on your preferences and browsing history
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={48} />
          </Box>
        )}

        {!loading && recommendations.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              my: 8,
              p: 4,
              backgroundColor: '#EAF4FF',
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No recommendations available
            </Typography>
          </Box>
        )}

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {recommendations.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(135deg, #ffffff 0%, #EAF4FF 100%)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 32px rgba(0, 50, 102, 0.12)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="220"
                  image={placeholder}
                  alt={product.name}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                    {product.des}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Owner: {product.owner}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<FavoriteIcon />}
                    onClick={() => handleAddToWishlist(product)}
                    sx={{
                      background: 'linear-gradient(135deg, #027FFF 0%, #035acc 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #0166cc 0%, #027FFF 100%)',
                      },
                    }}
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
