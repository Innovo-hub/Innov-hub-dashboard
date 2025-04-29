// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' if you prefer
    primary: {
      main: '#126090', // Gold
      contrastText: '#1f1f1f', // Text on gold
    },
    secondary: {
      main: '#4B5563', // Slate gray
    },
    text: {
      primary: '#1F2937', // Dark blue-gray
      secondary: '#ffffff', // Used in your TableHead
    },
    background: {
      default: '#F9FAFB',
      paper: '#ffffff',
    },
    warning: {
      main: '#FF9800',
    },
  },
  typography: {
    fontFamily: '"Cairo", serif',
    fontSize: 14,
    fontWeightBold: 700,
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: '0.95rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});

export default theme;
