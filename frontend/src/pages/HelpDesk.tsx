import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from '@mui/material'
import Header from '../components/Header'

const HelpDesk = () => {
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    telephone: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccess(true)
    setTimeout(() => {
      navigate('/landing')
    }, 2000)
  }

  const remainingChars = 256 - message.length

  return (
    <>
      <Header />
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Card
          sx={{
            boxShadow: '0 12px 32px rgba(0, 50, 102, 0.08)',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Typography
              variant="h3"
              gutterBottom
              color="primary"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Help Desk
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We're here to help! Send us a message and we'll get back to you soon.
            </Typography>

            {showSuccess && (
              <Alert
                severity="success"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                We will get back to you soon. Thank You!
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <TextField
                margin="normal"
                required
                fullWidth
                label="Telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="+91"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                helperText={`${remainingChars} characters remaining`}
                inputProps={{ maxLength: 256 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}

export default HelpDesk
