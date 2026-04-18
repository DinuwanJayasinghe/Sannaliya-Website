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
      main: '#2A9D8F', // Sannaliya Teal
    },
    secondary: {
      main: '#1B4332', // Dark Green
    },
  },
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
