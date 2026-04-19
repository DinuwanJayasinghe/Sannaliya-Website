import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Box, Container } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = useState(null);
  const [catAnchorEl, setCatAnchorEl] = useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCatMenu = (event) => setCatAnchorEl(event.currentTarget);
  const handleCatClose = () => setCatAnchorEl(null);

  const categories = [
    "Casual Wear", "Office Wear", "Footwear", "Accessories", "Kids Wear", "Gift Items", "New Arrivals"
  ];

  return (
    <AppBar position="sticky" elevation={0} className="bg-white border-b border-gray-100">
      <Container maxWidth="xl">
        <Toolbar className="bg-white px-0 flex justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
                <img src={logo} alt="Sannaliya Logo" className="h-14 hover:scale-105 transition-transform" />
            </Link>

            {/* Menu Center */}
            <Box className="hidden lg:flex items-center space-x-6">
                <Button component={Link} to="/" className="text-sannaliya-gray hover:text-sannaliya-teal font-bold">Home</Button>

                <Button
                    endIcon={<KeyboardArrowDownIcon />}
                    onClick={handleCatMenu}
                    className="text-sannaliya-gray hover:text-sannaliya-teal font-bold"
                >
                    Shop By Category
                </Button>
                <Menu anchorEl={catAnchorEl} open={Boolean(catAnchorEl)} onClose={handleCatClose} PaperProps={{ sx: { borderRadius: '15px', mt: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}>
                    {categories.map(cat => (
                        <MenuItem key={cat} onClick={handleCatClose} className="px-6 py-3 font-medium hover:bg-sannaliya-mint/20">{cat}</MenuItem>
                    ))}
                </Menu>

                <Button className="text-sannaliya-gray hover:text-sannaliya-teal font-bold">Collections</Button>
                <Button className="text-sannaliya-gray hover:text-sannaliya-teal font-bold">About Us</Button>
            </Box>

            {/* Icons Right */}
            <div className="flex items-center space-x-3">
                <IconButton component={Link} to="/cart" className="text-sannaliya-gray hover:bg-sannaliya-mint/20">
                    <Badge badgeContent={cartItems.length} color="primary" sx={{ '& .MuiBadge-badge': { background: '#1FA2A6' } }}>
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>

                {user ? (
                    <Box>
                    <IconButton onClick={handleMenu} className="text-sannaliya-teal bg-sannaliya-mint/20 ml-2">
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} PaperProps={{ sx: { borderRadius: '15px', mt: 1 } }}>
                        {user.role === 'ROLE_ADMIN' && <MenuItem onClick={handleClose} component={Link} to="/admin" className="font-bold text-sannaliya-teal">Admin Dashboard</MenuItem>}
                        <MenuItem onClick={handleClose}>My Orders</MenuItem>
                        <MenuItem onClick={() => { handleClose(); logout(); }} className="text-red-500">Sign Out</MenuItem>
                    </Menu>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        component={Link} to="/login"
                        className="bg-teal-gradient shadow-lg hover:shadow-xl ml-2 px-8"
                    >
                        Login
                    </Button>
                )}
            </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
