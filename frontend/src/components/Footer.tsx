import { Box, Container, Typography, Link, IconButton, Toolbar } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: '#EAF4FF',
        borderTop: '1px solid rgba(0, 50, 102, 0.08)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              About Us
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              FAQ
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Contact Us
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              24x7 Help
            </Link>
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  color: 'info.main',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Partner With Us
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              sx={{
                color: 'primary.main',
                backgroundColor: 'white',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'info.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              size="small"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              sx={{
                color: 'primary.main',
                backgroundColor: 'white',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'info.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              size="small"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              sx={{
                color: 'primary.main',
                backgroundColor: 'white',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: 'info.main',
                  color: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              size="small"
            >
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 3,
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          © 2025 PT Kampus Jaya Utama
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
