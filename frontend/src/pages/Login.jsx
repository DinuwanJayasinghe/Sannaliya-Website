import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Divider, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { authApi } from '../services/api';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

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
        toast.success('Welcome back to Sannaliya!');
        navigate(res.data.role === 'ROLE_ADMIN' ? '/admin' : '/');
      })
      .catch(err => {
        toast.error('Invalid credentials. Please try again.');
        console.error(err);
      });
  };

  return (
    <div className="bg-sannaliya-bg min-h-screen py-20">
      <Container maxWidth="xs">
        <Paper className="p-10 shadow-2xl rounded-3xl">
          <Typography variant="h4" className="mb-2 text-center font-serif font-bold text-sannaliya-gray">Login</Typography>
          <Typography variant="body2" className="mb-8 text-center text-gray-500">Access your Sannaliya account</Typography>

          <form onSubmit={handleSubmit} className="space-y-5">
            <TextField
              fullWidth label="Email Address" variant="outlined" type="email" required
              value={email} onChange={(e) => setEmail(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' }}}
            />
            <TextField
              fullWidth label="Password" variant="outlined" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' }}}
            />
            <Button
                fullWidth variant="contained" color="primary" type="submit"
                className="py-3 shadow-lg hover:shadow-xl transform transition-all active:scale-95"
            >
              Sign In
            </Button>
          </form>

          <Box className="my-8 flex items-center">
              <Divider className="flex-grow" />
              <Typography variant="body2" className="mx-4 text-gray-400">OR</Typography>
              <Divider className="flex-grow" />
          </Box>

          <div className="space-y-3">
              <Button
                fullWidth variant="outlined" startIcon={<FacebookIcon />}
                className="border-gray-300 text-gray-600 rounded-xl"
                onClick={() => toast.info('Social login coming soon!')}
              >
                  Continue with Facebook
              </Button>
              <Button
                fullWidth variant="outlined" startIcon={<GoogleIcon />}
                className="border-gray-300 text-gray-600 rounded-xl"
                onClick={() => toast.info('Social login coming soon!')}
              >
                  Continue with Google
              </Button>
          </div>

          <Typography variant="body2" className="mt-8 text-center text-gray-600">
            New to Sannaliya? <Link to="/register" className="text-sannaliya-teal font-bold hover:underline">Create Account</Link>
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
