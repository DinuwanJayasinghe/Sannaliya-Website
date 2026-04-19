import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Box, Button } from '@mui/material';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { orderApi } from '../services/api';

const DashboardHome = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        revenue: 0,
        chartData: [
            { name: 'Mon', sales: 0 }, { name: 'Tue', sales: 0 }, { name: 'Wed', sales: 0 },
            { name: 'Thu', sales: 0 }, { name: 'Fri', sales: 0 }, { name: 'Sat', sales: 0 }, { name: 'Sun', sales: 0 }
        ]
    });

    useEffect(() => {
        orderApi.getAll().then(res => {
            const orders = res.data;
            const revenue = orders.reduce((acc, o) => acc + o.grandTotal, 0);
            // Simulate data mapping for charts based on real orders
            setStats(prev => ({
                ...prev,
                totalOrders: orders.length,
                revenue: revenue,
                chartData: prev.chartData.map((d, i) => i === 4 ? { ...d, sales: revenue / 100 } : d) // Mock distribution
            }));
        });
    }, []);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
                <Paper className="p-8 text-center bg-gradient-to-br from-white to-sannaliya-mint/20 border-0 shadow-lg rounded-3xl">
                    <Typography variant="h6" className="text-gray-500 font-semibold mb-2">Total Revenue</Typography>
                    <Typography variant="h3" className="text-sannaliya-teal font-bold">LKR {stats.revenue.toLocaleString()}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className="p-8 text-center bg-gradient-to-br from-white to-sannaliya-mint/20 border-0 shadow-lg rounded-3xl">
                    <Typography variant="h6" className="text-gray-500 font-semibold mb-2">Active Orders</Typography>
                    <Typography variant="h3" className="text-sannaliya-teal-dark font-bold">{stats.totalOrders}</Typography>
                </Paper>
            </Grid>
             <Grid item xs={12} md={4}>
                <Paper className="p-8 text-center bg-gradient-to-br from-white to-sannaliya-mint/20 border-0 shadow-lg rounded-3xl">
                    <Typography variant="h6" className="text-gray-500 font-semibold mb-2">Customer Satisfaction</Typography>
                    <Typography variant="h3" className="text-sannaliya-teal font-bold">98%</Typography>
                </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
                <Paper className="p-8 rounded-3xl shadow-lg border-0">
                    <Typography variant="h6" className="mb-6 font-bold text-sannaliya-gray">Sales Performance (Weekly)</Typography>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart data={stats.chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }} />
                                <Line type="monotone" dataKey="sales" stroke="#1FA2A6" strokeWidth={4} dot={{ r: 6, fill: '#1FA2A6' }} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
                <Paper className="p-8 rounded-3xl shadow-lg border-0 h-full">
                    <Typography variant="h6" className="mb-6 font-bold text-sannaliya-gray">Top Categories</Typography>
                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={[{ name: 'Frocks', v: 45 }, { name: 'Tops', v: 30 }, { name: 'Denim', v: 25 }]}>
                                <XAxis dataKey="name" hide />
                                <YAxis hide />
                                <Tooltip />
                                <Bar dataKey="v" radius={[10, 10, 0, 0]}>
                                    {[0, 1, 2].map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#1FA2A6' : '#2F3E46'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user.role !== 'ROLE_ADMIN') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="bg-sannaliya-bg min-h-screen">
        <Container maxWidth="xl" className="py-12">
            <Grid container spacing={4}>
                <Grid item xs={12} md={2}>
                    <Paper className="p-6 rounded-3xl shadow-lg border-0 h-full">
                        <Typography variant="h6" className="mb-8 font-serif font-bold text-sannaliya-teal">Admin Panel</Typography>
                        <List component="nav" className="space-y-2">
                            <ListItem button component={Link} to="/admin" selected={location.pathname === '/admin'} className={`rounded-xl transition-all ${location.pathname === '/admin' ? 'bg-sannaliya-teal/10 text-sannaliya-teal' : 'hover:bg-gray-100'}`}>
                                <ListItemText primary={<Typography className="font-bold">Overview</Typography>} />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/products" selected={location.pathname === '/admin/products'} className={`rounded-xl transition-all ${location.pathname === '/admin/products' ? 'bg-sannaliya-teal/10 text-sannaliya-teal' : 'hover:bg-gray-100'}`}>
                                <ListItemText primary={<Typography className="font-bold">Inventory</Typography>} />
                            </ListItem>
                            <ListItem button component={Link} to="/admin/orders" selected={location.pathname === '/admin/orders'} className={`rounded-xl transition-all ${location.pathname === '/admin/orders' ? 'bg-sannaliya-teal/10 text-sannaliya-teal' : 'hover:bg-gray-100'}`}>
                                <ListItemText primary={<Typography className="font-bold">Orders</Typography>} />
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
    </div>
  );
};

export default AdminDashboard;
