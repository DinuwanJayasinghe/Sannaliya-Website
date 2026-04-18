import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const districts = [
    "Kaluthara", "Colombo", "Gampaha", "Galle", "Mathara", "Kegalle",
    "Kandy", "Matale", "Nuwara Eliya", "Ampara", "Batticaloa", "Trincomalee",
    "Anuradhapura", "Polonnaruwa", "Jaffna", "Kilinochchi", "Mannar", "Mullaitivu",
    "Vavuniya", "Kurunegala", "Puttalam", "Ratnapura", "Hambantota", "Badulla", "Monaragala"
];

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '',
    phone: '', address: '', district: '', city: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simplified register for demo
    login('mock-jwt-token', 'ROLE_USER');
    toast.success('Account created successfully');
    navigate('/');
  };

  return (
    <Container maxWidth="sm" className="py-12">
      <Paper className="p-8">
        <Typography variant="h5" className="mb-6 text-center font-bold">Register Account</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" name="firstName" required onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" name="lastName" required onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" type="email" required onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" name="password" type="password" required onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" name="phone" required onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" required multiline rows={2} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="District" name="district" required value={formData.district} onChange={handleChange}>
                {districts.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="City" name="city" required onChange={handleChange} />
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary" type="submit" className="py-2 mt-6">
            Register
          </Button>
        </form>
        <Typography variant="body2" className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-sannaliya-teal">Login</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
