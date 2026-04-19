import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DarkModeIcon from '@mui/icons-material/Brightness4';
import LightModeIcon from '@mui/icons-material/Brightness7';
import { useThemeToggle } from '../../context/ThemeContext';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { darkMode, toggleDarkMode } = useThemeToggle();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" className={`${darkMode ? 'bg-gray-900' : 'bg-teal-gradient'} shadow-md`}>
      <Toolbar className="flex justify-between container mx-auto">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Sannaliya Logo" className="h-12 w-auto mr-2 rounded-full border-2 border-white" />
            <Typography variant="h6" className="font-serif font-bold tracking-wider hidden sm:block">SANNALIYA</Typography>
          </Link>
          <div className="hidden lg:flex ml-10 space-x-6">
            <Button color="inherit" component={Link} to="/" className="hover:text-sannaliya-mint transition-colors">Home</Button>
            <Button color="inherit" className="hover:text-sannaliya-mint transition-colors">Casual Wear</Button>
            <Button color="inherit" className="hover:text-sannaliya-mint transition-colors">Office Wear</Button>
            <Button color="inherit" className="hover:text-sannaliya-mint transition-colors">Kids Wear</Button>
            <Button color="inherit" className="hover:text-sannaliya-mint transition-colors">Footwear</Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton color="inherit" onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.quantity, 0)} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user ? (
            <div>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem disabled className="text-xs font-bold">{user.email}</MenuItem>
                {user.role === 'ROLE_ADMIN' && <MenuItem onClick={handleClose} component={Link} to="/admin">Dashboard</MenuItem>}
                <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" variant="outlined" component={Link} to="/login" className="border-white ml-2">Login</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
