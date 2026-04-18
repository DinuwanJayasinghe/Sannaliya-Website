import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { authApi } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authApi.login({ email, password })
      .then(res => {
        login(res.data.token, res.data.role);
        toast.success('Logged in successfully');
        if (res.data.role === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      })
      .catch(err => {
        toast.error('Invalid email or password');
        console.error(err);
      });
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
