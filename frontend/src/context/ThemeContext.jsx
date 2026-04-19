import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export const ThemeToggleProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1FA2A6',
      },
      secondary: {
        main: '#2F3E46',
      },
      background: {
        default: darkMode ? '#121212' : '#F8F9FA',
        paper: darkMode ? '#1E1E1E' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Inter", "sans-serif"',
      h1: { fontFamily: '"Playfair Display", "serif"' },
      h2: { fontFamily: '"Playfair Display", "serif"' },
      h3: { fontFamily: '"Playfair Display", "serif"' },
      h4: { fontFamily: '"Playfair Display", "serif"' },
    },
    shape: {
      borderRadius: 12,
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => useContext(ThemeContext);
