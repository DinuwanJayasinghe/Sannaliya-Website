import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const DashboardHome = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Paper className="p-6">
        <Typography variant="h6" className="mb-4">Real-time Sales Overview</Typography>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#1FA2A6" strokeWidth={3} dot={{ fill: '#0F6B6E' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} md={6}>
      <Paper className="p-6">
        <Typography variant="h6" className="mb-4">Orders per Category</Typography>
        <div style={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={[{name: 'Casual', value: 45}, {name: 'Office', value: 32}, {name: 'Footwear', value: 12}]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1FA2A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    </Grid>
    <Grid item xs={12} md={6}>
        <Paper className="p-6 h-full flex flex-col justify-center items-center bg-teal-gradient text-white">
            <Typography variant="h4" className="font-bold">124</Typography>
            <Typography variant="subtitle1" className="opacity-80">Total Orders Today</Typography>
            <Divider className="w-full my-4 bg-white opacity-20" />
            <Typography variant="h4" className="font-bold">LKR 45,200</Typography>
            <Typography variant="subtitle1" className="opacity-80">Revenue Today</Typography>
        </Paper>
    </Grid>
  </Grid>
);

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="xl" className="py-8">
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Paper className="p-4 h-full">
            <Typography variant="h6" className="mb-4 font-bold">Admin Panel</Typography>
            <List component="nav">
              <ListItem button component={Link} to="/admin" selected={location.pathname === '/admin'}>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem button component={Link} to="/admin/products" selected={location.pathname === '/admin/products'}>
                <ListItemText primary="Products" />
              </ListItem>
              <ListItem button component={Link} to="/admin/orders" selected={location.pathname === '/admin/orders'}>
                <ListItemText primary="Orders" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <Routes>
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="/" element={<DashboardHome />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
