import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
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
import logo from '../assets/logo/logo.svg'

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
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        color: 'primary.main',
      }}
    >
      <Toolbar sx={{ py: 1.5, justifyContent: 'space-between', gap: 2 }}>
        {/* Left Section: Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 200 }}>
          <Box
            component="img"
            src={logo}
            alt="CampusHub Auction"
            sx={{
              height: 32,
              cursor: 'pointer',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              }
            }}
            onClick={() => navigate('/landing')}
          />
        </Box>

        {/* Center Section: Search Bar */}
        <Box sx={{ flexGrow: 1, maxWidth: '600px', px: 2 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" sx={{ color: 'text.secondary' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                backgroundColor: '#EAF4FF',
                borderRadius: 3,
                border: '1px solid rgba(0, 50, 102, 0.08)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: '#d4e8ff',
                  border: '1px solid rgba(0, 50, 102, 0.12)',
                },
                '& fieldset': {
                  border: 'none',
                },
              },
            }}
          />
        </Box>

        {/* Right Section: Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 200, justifyContent: 'flex-end' }}>
          {/* Categories */}
          <Button
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 50, 102, 0.04)',
              }
            }}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleCategoryClick}
          >
            Categories
          </Button>
          <Menu
          anchorEl={categoryAnchor}
          open={Boolean(categoryAnchor)}
          onClose={handleCategoryClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0, 50, 102, 0.12)',
                border: '1px solid rgba(0, 50, 102, 0.06)',
              }
            }
          }}
        >
          <MenuItem
            onClick={handleCategoryClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            Car & Bike
          </MenuItem>
          <MenuItem
            onClick={handleCategoryClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            Jewellery
          </MenuItem>
          <MenuItem
            onClick={handleCategoryClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            Artifacts
          </MenuItem>
          <MenuItem
            onClick={handleCategoryClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            Electronics
          </MenuItem>
        </Menu>

          {/* Wishlist */}
          <IconButton
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 50, 102, 0.04)',
                color: 'info.main',
              }
            }}
            onClick={() => navigate('/favs')}
          >
            <FavoriteIcon />
          </IconButton>

          {/* HelpDesk */}
          <Button
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(0, 50, 102, 0.04)',
              }
            }}
            onClick={() => navigate('/helpdesk')}
          >
            HelpDesk
          </Button>

          {/* User Menu */}
          <IconButton
            sx={{
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(0, 50, 102, 0.04)',
              }
            }}
            onClick={handleUserClick}
          >
            <AccountCircleIcon />
          </IconButton>
        <Menu
          anchorEl={userAnchor}
          open={Boolean(userAnchor)}
          onClose={handleUserClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                borderRadius: 3,
                boxShadow: '0 8px 24px rgba(0, 50, 102, 0.12)',
                border: '1px solid rgba(0, 50, 102, 0.06)',
              }
            }
          }}
        >
          <MenuItem
            onClick={handleUserClose}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            My Account
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate('/rentItems')
              handleUserClose()
            }}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              '&:hover': { backgroundColor: '#EAF4FF' }
            }}
          >
            Rent Items
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 1,
              my: 0.5,
              color: 'error.main',
              '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
            }}
          >
            Logout
          </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
