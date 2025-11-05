import { useState } from 'react'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material'
import Header from '../components/Header'
import { RentItem } from '../types'

const RentItems = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<RentItem>({
    itemName: '',
    itemCategory: '',
    itemQuantity: 0,
    itemDescription: '',
    itemDurationOfRent: 0,
    baseRent: 0,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call when backend is ready
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        itemName: '',
        itemCategory: '',
        itemQuantity: 0,
        itemDescription: '',
        itemDurationOfRent: 0,
        baseRent: 0,
      })
    }, 2000)
  }

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              List Item for Rent
            </Typography>

            {showSuccess && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Item listed successfully!
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name of the Product"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Category"
                name="itemCategory"
                value={formData.itemCategory}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Quantity"
                name="itemQuantity"
                type="number"
                value={formData.itemQuantity}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                name="itemDescription"
                multiline
                rows={3}
                value={formData.itemDescription}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Rent Period (days)"
                name="itemDurationOfRent"
                type="number"
                value={formData.itemDurationOfRent}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Best Value Price"
                name="baseRent"
                type="number"
                value={formData.baseRent}
                onChange={handleChange}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <Button variant="outlined" component="label" fullWidth>
                  Choose File
                  <input type="file" hidden />
                </Button>
                <Button variant="outlined" fullWidth>
                  Upload File
                </Button>
              </Box>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                Confirm And Rent
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default RentItems
