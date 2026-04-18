import React, { createContext, useState, useContext, useEffect } from 'react';
import { connectWebSocket, disconnectWebSocket } from '../services/websocket';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const role = localStorage.getItem('role');
      setUser({ token, role });
      connectWebSocket(role);
    } else {
      disconnectWebSocket();
    }
  }, [token]);

  const login = (newToken, role) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', role);
    setToken(newToken);
    setUser({ token: newToken, role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
    disconnectWebSocket();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
