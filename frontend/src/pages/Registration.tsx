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
  Alert,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  InputAdornment,
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { registrationService } from '../services/registrationService'
import { IUser } from '../types'

const CATEGORIES = ['Electronics', 'Car & Bike', 'Fashion', 'Antique', 'Artifacts', 'Jewellery']

const Registration = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<IUser>({
    userName: '',
    userEmail: '',
    userPassword: '',
    userPhoneNumber: '',
    userAadharNumber: '',
    userGender: '',
    category: [],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value
    setFormData({ ...formData, category: typeof value === 'string' ? value.split(',') : value })
  }

  const validateForm = (): boolean => {
    // Phone validation: 10 digits starting with 6-9
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(formData.userPhoneNumber)) {
      setError('Phone number must be 10 digits starting with 6-9')
      return false
    }

    // Aadhar validation: 13 digits
    const aadharRegex = /^[1-9]\d{12}$/
    if (!aadharRegex.test(formData.userAadharNumber)) {
      setError('Aadhar number must be 13 digits')
      return false
    }

    if (formData.category.length === 0) {
      setError('Please select at least one category')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      await registrationService.registerUser(formData)
      navigate('/login')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
              Create Account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="userEmail"
                type="email"
                value={formData.userEmail}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="userPassword"
                type={showPassword ? 'text' : 'password'}
                value={formData.userPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Phone Number"
                name="userPhoneNumber"
                value={formData.userPhoneNumber}
                onChange={handleChange}
                helperText="10 digits starting with 6-9"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Aadhar Number"
                name="userAadharNumber"
                value={formData.userAadharNumber}
                onChange={handleChange}
                helperText="13 digits"
              />

              <FormControl component="fieldset" margin="normal" required>
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  row
                  name="userGender"
                  value={formData.userGender}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth margin="normal" required>
                <FormLabel>Categories</FormLabel>
                <Select
                  multiple
                  value={formData.category}
                  onChange={handleCategoryChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Submit'}
              </Button>
              <Button fullWidth onClick={() => navigate('/login')} variant="outlined">
                Already have an account? Login
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default Registration
