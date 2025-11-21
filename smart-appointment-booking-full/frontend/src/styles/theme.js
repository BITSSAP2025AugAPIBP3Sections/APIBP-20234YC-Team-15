import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Unique blue
    },
    secondary: {
      main: '#ff4081', // Unique pink
    },
    background: {
      default: '#f4f6f8',
      paper: '#fff',
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
