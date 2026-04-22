import React from 'react';
import { ThemeModeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <ThemeModeProvider>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer position="bottom-right" theme="colored" />
        </CartProvider>
      </AuthProvider>
    </ThemeModeProvider>
  );
}

export default App;
