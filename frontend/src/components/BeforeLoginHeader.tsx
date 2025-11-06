import { useState } from 'react'
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import logo from '../assets/logo/logo.svg'

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
            onClick={() => navigate('/')}
          />
        </Box>

        {/* Center Section: Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{ flexGrow: 1, maxWidth: '600px', px: 2 }}
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
                  <IconButton type="submit" edge="end" sx={{ color: 'text.secondary' }}>
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

          {/* Login/SignUp */}
          <Button
            variant="contained"
            onClick={() => navigate('/login')}
            sx={{
              whiteSpace: 'nowrap',
              background: 'linear-gradient(135deg, #003266 0%, #1a4d7a 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #002147 0%, #003266 100%)',
              }
            }}
          >
            Login / SignUp
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default BeforeLoginHeader
