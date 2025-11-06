import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import GavelIcon from '@mui/icons-material/Gavel'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const StatsCard = () => {
  const stats = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      label: 'Male Users',
      value: '110M',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      label: 'Female Users',
      value: '40M',
    },
    {
      icon: <GavelIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      label: 'Total Bids',
      value: '1 Billion+',
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'info.main' }} />,
      label: 'Total Value',
      value: '$500M',
    },
  ]

  return (
    <Box sx={{ py: 6 }}>
      <Grid container spacing={4}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #ffffff 0%, #EAF4FF 100%)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 32px rgba(0, 50, 102, 0.12)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', width: '100%', py: 4 }}>
                <Box
                  sx={{
                    mb: 2,
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: 3,
                    backgroundColor: 'rgba(0, 50, 102, 0.04)',
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography
                  variant="h3"
                  component="div"
                  fontWeight="700"
                  color="primary"
                  sx={{ mb: 1 }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary" fontWeight="500">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default StatsCard
