import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import logo from '../../assets/logo.jpg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" className="bg-sannaliya-dark">
      <Toolbar className="bg-sannaliya-dark flex justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Sannaliya Logo" className="h-12 mr-4" />
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit">Casual Wear</Button>
            <Button color="inherit">Office Wear</Button>
            <Button color="inherit">Kids Wear</Button>
            <Button color="inherit">Footwear</Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <IconButton color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {user ? (
            <div>
              <IconButton color="inherit" onClick={handleMenu}>
                <AccountCircle />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {user.role === 'ROLE_ADMIN' && <MenuItem onClick={handleClose} component={Link} to="/admin">Dashboard</MenuItem>}
                <MenuItem onClick={() => { handleClose(); logout(); }}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
