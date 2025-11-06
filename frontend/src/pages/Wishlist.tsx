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
  IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Header from '../components/Header'
import { wishlistService } from '../services/wishlistService'
import { WishlistProduct } from '../types'
import placeholder from '../assets/images/placeholder.svg'

const Wishlist = () => {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = async () => {
    setLoading(true)
    try {
      const data = await wishlistService.getWishlist()
      setWishlist(data)
    } catch (err) {
      console.error('Error fetching wishlist:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const handleDelete = async (product: WishlistProduct) => {
    try {
      await wishlistService.removeFromWishlist(product)
      // Refresh the wishlist
      fetchWishlist()
    } catch (err) {
      console.error('Error removing from wishlist:', err)
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
          sx={{ fontWeight: 700, mb: 4 }}
        >
          My Wishlist
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={48} />
          </Box>
        )}

        {!loading && wishlist.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              my: 8,
              p: 6,
              background: 'linear-gradient(135deg, #EAF4FF 0%, #ffffff 100%)',
              borderRadius: 4,
            }}
          >
            <Typography variant="h5" color="text.secondary" gutterBottom fontWeight={600}>
              Your wishlist is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Start adding items you love!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/recommendations')}
              sx={{
                mt: 2,
                background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                },
              }}
            >
              Browse Recommendations
            </Button>
          </Box>
        )}

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {wishlist.map((product, index) => (
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
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    onClick={() => handleDelete(product)}
                    aria-label="delete"
                    sx={{
                      color: 'error.main',
                      '&:hover': {
                        backgroundColor: 'rgba(211, 47, 47, 0.08)',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Wishlist
