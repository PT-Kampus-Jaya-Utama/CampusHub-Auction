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
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          My Wishlist
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && wishlist.length === 0 && (
          <Box sx={{ textAlign: 'center', my: 8 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Your wishlist is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/recommendations')}
              sx={{ mt: 2 }}
            >
              Browse Recommendations
            </Button>
          </Box>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {wishlist.map((product, index) => (
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
                  image="https://via.placeholder.com/300x200?text=Wishlist+Item"
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
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(product)}
                    aria-label="delete"
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
