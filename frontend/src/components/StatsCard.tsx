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
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'secondary.main' }} />,
      label: 'Female Users',
      value: '40M',
    },
    {
      icon: <GavelIcon sx={{ fontSize: 40, color: 'primary.dark' }} />,
      label: 'Total Bids',
      value: '1 Billion+',
    },
    {
      icon: <AttachMoneyIcon sx={{ fontSize: 40, color: 'success.main' }} />,
      label: 'Total Value',
      value: '$500M',
    },
  ]

  return (
    <Box sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                <Typography variant="h4" component="div" fontWeight="bold" color="primary">
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
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
