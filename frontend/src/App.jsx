import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './AppRoutes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1FA2A6',
    },
    secondary: {
      main: '#2F3E46',
    },
    background: {
      default: '#F8F9FA',
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif' },
    h2: { fontFamily: '"Playfair Display", serif' },
    h3: { fontFamily: '"Playfair Display", serif' },
    h4: { fontFamily: '"Playfair Display", serif' },
    h5: { fontFamily: '"Playfair Display", serif' },
    h6: { fontFamily: '"Playfair Display", serif' },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 30,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
        }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer position="bottom-right" />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
