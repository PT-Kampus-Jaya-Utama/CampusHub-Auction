import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
import Header from '../components/Header'
import { productService } from '../services/productService'
import { Product } from '../types'
import placeholder from '../assets/images/placeholder.svg'

const Search = () => {
  const { value } = useParams<{ value: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      if (!value) return

      setLoading(true)
      setError('')
      try {
        const data = await productService.searchProducts(value)
        setProducts(data)
      } catch (err) {
        setError('No products found')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [value])

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
          Search Results
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Showing results for "{value}"
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress size={48} />
          </Box>
        )}

        {error && (
          <Box
            sx={{
              textAlign: 'center',
              my: 8,
              p: 4,
              backgroundColor: '#EAF4FF',
              borderRadius: 4,
            }}
          >
            <Typography variant="h6" color="error">
              {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && products.length === 0 && (
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
              No products found
            </Typography>
          </Box>
        )}

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {products.map((product) =>
            product.details.map((detail, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${product.id}-${index}`}>
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
                    alt={product.productName}
                    sx={{ objectFit: 'contain', p: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Item ID: {detail.itemid}
                    </Typography>
                    <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                      {detail.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Owner: {detail.owner}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                        },
                      }}
                    >
                      BID
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Search
