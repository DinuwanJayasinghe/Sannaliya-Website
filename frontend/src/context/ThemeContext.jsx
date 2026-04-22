import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#1FA2A6',
            dark: '#0F6B6E',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#A8DADC',
          },
          background: {
            default: mode === 'light' ? '#F8F9FA' : '#0F172A',
            paper: mode === 'light' ? '#ffffff' : '#1E293B',
          },
          text: {
            primary: mode === 'light' ? '#2F3E46' : '#F8FAFC',
            secondary: mode === 'light' ? '#4B5563' : '#94A3B8',
          },
        },
        typography: {
          fontFamily: '"Inter", "sans-serif"',
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
                borderRadius: '8px',
                padding: '8px 24px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(31, 162, 166, 0.3)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
