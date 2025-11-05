import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const BeforeLoginHeader = () => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [categoryAnchor, setCategoryAnchor] = useState<null | HTMLElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      navigate(`/search/${searchValue}`)
    }
  }

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchor(event.currentTarget)
  }

  const handleCategoryClose = () => {
    setCategoryAnchor(null)
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, cursor: 'pointer', minWidth: '150px' }}
          onClick={() => navigate('/')}
        >
          StackBid
        </Typography>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ flexGrow: 1, maxWidth: '500px' }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: { backgroundColor: 'white', borderRadius: 1 },
            }}
          />
        </Box>

        {/* Categories */}
        <Button
          color="inherit"
          endIcon={<ArrowDropDownIcon />}
          onClick={handleCategoryClick}
        >
          Categories
        </Button>
        <Menu
          anchorEl={categoryAnchor}
          open={Boolean(categoryAnchor)}
          onClose={handleCategoryClose}
        >
          <MenuItem onClick={handleCategoryClose}>Car & Bike</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Jewellery</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Artifacts</MenuItem>
          <MenuItem onClick={handleCategoryClose}>Electronics</MenuItem>
        </Menu>

        {/* HelpDesk */}
        <Button color="inherit" onClick={() => navigate('/helpdesk')}>
          HelpDesk
        </Button>

        {/* Login/SignUp */}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/login')}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Login / SignUp
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default BeforeLoginHeader
