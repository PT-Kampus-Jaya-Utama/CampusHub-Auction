import { createTheme } from '@mui/material/styles'

// Apple-inspired Modern Theme with Custom Color Palette
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003266', // Deep Navy Blue
      light: '#1a4d7a',
      dark: '#002147',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#EAF4FF', // Light Blue
      light: '#f5f9ff',
      dark: '#d4e8ff',
      contrastText: '#003266',
    },
    info: {
      main: '#027FFF', // Bright Accent Blue
      light: '#35a3ff',
      dark: '#0166cc',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d1d1f', // Near black (Apple style)
      secondary: '#6e6e73', // Gray
    },
    divider: 'rgba(0, 50, 102, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.005em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0, 50, 102, 0.04), 0 1px 2px rgba(0, 50, 102, 0.06)',
    '0 2px 4px rgba(0, 50, 102, 0.04), 0 2px 3px rgba(0, 50, 102, 0.06)',
    '0 4px 6px rgba(0, 50, 102, 0.04), 0 2px 4px rgba(0, 50, 102, 0.06)',
    '0 6px 12px rgba(0, 50, 102, 0.06), 0 4px 8px rgba(0, 50, 102, 0.08)',
    '0 8px 16px rgba(0, 50, 102, 0.08), 0 4px 12px rgba(0, 50, 102, 0.1)',
    '0 12px 24px rgba(0, 50, 102, 0.1), 0 6px 16px rgba(0, 50, 102, 0.12)',
    '0 16px 32px rgba(0, 50, 102, 0.12), 0 8px 20px rgba(0, 50, 102, 0.14)',
    '0 20px 40px rgba(0, 50, 102, 0.14), 0 10px 24px rgba(0, 50, 102, 0.16)',
    '0 24px 48px rgba(0, 50, 102, 0.16), 0 12px 28px rgba(0, 50, 102, 0.18)',
    '0 28px 56px rgba(0, 50, 102, 0.18), 0 14px 32px rgba(0, 50, 102, 0.2)',
    '0 32px 64px rgba(0, 50, 102, 0.2), 0 16px 36px rgba(0, 50, 102, 0.22)',
    '0 36px 72px rgba(0, 50, 102, 0.22), 0 18px 40px rgba(0, 50, 102, 0.24)',
    '0 40px 80px rgba(0, 50, 102, 0.24), 0 20px 44px rgba(0, 50, 102, 0.26)',
    '0 44px 88px rgba(0, 50, 102, 0.26), 0 22px 48px rgba(0, 50, 102, 0.28)',
    '0 48px 96px rgba(0, 50, 102, 0.28), 0 24px 52px rgba(0, 50, 102, 0.3)',
    '0 52px 104px rgba(0, 50, 102, 0.3), 0 26px 56px rgba(0, 50, 102, 0.32)',
    '0 56px 112px rgba(0, 50, 102, 0.32), 0 28px 60px rgba(0, 50, 102, 0.34)',
    '0 60px 120px rgba(0, 50, 102, 0.34), 0 30px 64px rgba(0, 50, 102, 0.36)',
    '0 64px 128px rgba(0, 50, 102, 0.36), 0 32px 68px rgba(0, 50, 102, 0.38)',
    '0 68px 136px rgba(0, 50, 102, 0.38), 0 34px 72px rgba(0, 50, 102, 0.4)',
    '0 72px 144px rgba(0, 50, 102, 0.4), 0 36px 76px rgba(0, 50, 102, 0.42)',
    '0 76px 152px rgba(0, 50, 102, 0.42), 0 38px 80px rgba(0, 50, 102, 0.44)',
    '0 80px 160px rgba(0, 50, 102, 0.44), 0 40px 84px rgba(0, 50, 102, 0.46)',
    '0 84px 168px rgba(0, 50, 102, 0.46), 0 42px 88px rgba(0, 50, 102, 0.48)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '10px 28px',
          fontSize: '15px',
          fontWeight: 600,
          transition: 'all 0.3s ease-in-out',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 50, 102, 0.15)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '16px',
          borderRadius: 18,
        },
        sizeSmall: {
          padding: '6px 20px',
          fontSize: '14px',
          borderRadius: 14,
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 50, 102, 0.2)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 12px rgba(0, 50, 102, 0.06), 0 2px 6px rgba(0, 50, 102, 0.04)',
          border: '1px solid rgba(0, 50, 102, 0.06)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 50, 102, 0.1), 0 4px 12px rgba(0, 50, 102, 0.08)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 50, 102, 0.08)',
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: 'all 0.3s ease-in-out',
            '& fieldset': {
              borderColor: 'rgba(0, 50, 102, 0.12)',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 50, 102, 0.24)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#027FFF',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
        },
        filled: {
          backgroundColor: '#EAF4FF',
          color: '#003266',
          '&:hover': {
            backgroundColor: '#d4e8ff',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: 'rgba(0, 50, 102, 0.04)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0, 50, 102, 0.06)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontSize: '15px',
        },
      },
    },
  },
})

export default theme
