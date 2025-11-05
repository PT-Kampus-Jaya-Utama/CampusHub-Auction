import { useState, useEffect } from 'react'
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
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import useAuthStore from '../store/authStore'

const Header = () => {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const [searchValue, setSearchValue] = useState('')
  const [categoryAnchor, setCategoryAnchor] = useState<null | HTMLElement>(null)
  const [userAnchor, setUserAnchor] = useState<null | HTMLElement>(null)

  // Real-time search - navigate on every input change
  useEffect(() => {
    if (searchValue.trim()) {
      const timer = setTimeout(() => {
        navigate(`/search/${searchValue}`)
      }, 500) // Debounce for 500ms
      return () => clearTimeout(timer)
    }
  }, [searchValue, navigate])

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchor(event.currentTarget)
  }

  const handleCategoryClose = () => {
    setCategoryAnchor(null)
  }

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserAnchor(event.currentTarget)
  }

  const handleUserClose = () => {
    setUserAnchor(null)
  }

  const handleLogout = () => {
    logout()
    handleUserClose()
    navigate('/login')
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo */}
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, cursor: 'pointer', minWidth: '150px' }}
          onClick={() => navigate('/landing')}
        >
          StackBid
        </Typography>

        {/* Search Bar */}
        <Box sx={{ flexGrow: 1, maxWidth: '500px' }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
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

        {/* Wishlist */}
        <IconButton color="inherit" onClick={() => navigate('/favs')}>
          <FavoriteIcon />
        </IconButton>

        {/* HelpDesk */}
        <Button color="inherit" onClick={() => navigate('/helpdesk')}>
          HelpDesk
        </Button>

        {/* User Menu */}
        <IconButton color="inherit" onClick={handleUserClick}>
          <AccountCircleIcon />
        </IconButton>
        <Menu anchorEl={userAnchor} open={Boolean(userAnchor)} onClose={handleUserClose}>
          <MenuItem onClick={handleUserClose}>My Account</MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/rentItems')
              handleUserClose()
            }}
          >
            Rent Items
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
