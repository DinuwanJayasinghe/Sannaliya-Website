import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified login for demo
    if (email === 'admin@sannaliya.com' && password === 'admin123') {
      login('mock-jwt-token', 'ROLE_ADMIN');
      toast.success('Logged in as Admin');
      navigate('/admin');
    } else {
      login('mock-jwt-token', 'ROLE_USER');
      toast.success('Logged in successfully');
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xs" className="py-20">
      <Paper className="p-8">
        <Typography variant="h5" className="mb-6 text-center font-bold">Login</Typography>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" type="submit" className="py-2">
            Login
          </Button>
        </form>
        <Typography variant="body2" className="mt-4 text-center">
          Don't have an account? <Link to="/register" className="text-sannaliya-teal">Register</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
