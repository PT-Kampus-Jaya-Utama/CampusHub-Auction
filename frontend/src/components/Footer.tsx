import { Box, Container, Typography, Link, IconButton, Toolbar } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.primary.dark,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Link href="#" color="inherit" underline="hover">
              About Us
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Privacy Policy
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Terms & Conditions
            </Link>
            <Link href="#" color="inherit" underline="hover">
              FAQ
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Contact Us
            </Link>
            <Link href="#" color="inherit" underline="hover">
              24x7 Help
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Partner With Us
            </Link>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="inherit" size="small">
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" size="small">
              <TwitterIcon />
            </IconButton>
            <IconButton color="inherit" size="small">
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          © 2025 StackBid.com | Developed with ❤️ @StackRoute
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer
