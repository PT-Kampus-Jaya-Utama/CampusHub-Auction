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
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Search Results for "{value}"
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Typography variant="h6" color="error" align="center" sx={{ my: 4 }}>
            {error}
          </Typography>
        )}

        {!loading && !error && products.length === 0 && (
          <Typography variant="h6" align="center" sx={{ my: 4 }}>
            No products found
          </Typography>
        )}

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {products.map((product) =>
            product.details.map((detail, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${product.id}-${index}`}>
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
                    image="https://via.placeholder.com/300x200?text=Product+Image"
                    alt={product.productName}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Item ID: {detail.itemid}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {detail.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Owner: {detail.owner}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button variant="contained" fullWidth>
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
