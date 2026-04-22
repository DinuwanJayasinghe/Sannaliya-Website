import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useColorMode } from '../../context/ThemeContext';
import {
  AppBar, Toolbar, Typography, Button, IconButton,
  Badge, Menu, MenuItem, Box, Container, Tooltip,
  useScrollTrigger, Slide, useTheme, Avatar, Divider, ListItemIcon
} from '@mui/material';
import {
  ShoppingBagOutlined,
  PersonOutlineOutlined,
  KeyboardArrowDown,
  DarkModeOutlined,
  LightModeOutlined,
  DashboardOutlined,
  LogoutOutlined,
  FavoriteBorderOutlined,
  LocalShippingOutlined,
  SearchOutlined
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const { toggleColorMode } = useColorMode();

  const [anchorEl, setAnchorEl] = useState(null);
  const [catAnchorEl, setCatAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleCatMenu = (event) => setCatAnchorEl(event.currentTarget);
  const handleCatClose = () => setCatAnchorEl(null);

  const categories = [
    { name: "Casual Wear", path: "/category/casual" },
    { name: "Office Wear", path: "/category/office" },
    { name: "Footwear", path: "/category/footwear" },
    { name: "Accessories", path: "/category/accessories" },
    { name: "Kids Wear", path: "/category/kids" },
    { name: "Gift Items", path: "/category/gifts" },
    { name: "New Arrivals", path: "/category/new" }
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="sticky"
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md shadow-soft py-0'
            : 'bg-white dark:bg-dark-bg border-b border-slate-100 dark:border-slate-800 py-2'
        }`}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar className="px-0 flex justify-between">
              {/* Left: Brand Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="Sannaliya" className="h-12 md:h-16 w-auto object-contain" />
                </Link>
              </motion.div>

              {/* Center: Navigation Links */}
              <Box className="hidden lg:flex items-center space-x-2">
                  <Button
                    component={Link} to="/"
                    className={`font-bold px-4 ${location.pathname === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}
                  >
                    Home
                  </Button>

                  <Button
                      endIcon={<KeyboardArrowDown />}
                      onClick={handleCatMenu}
                      className="text-slate-600 dark:text-slate-300 font-bold px-4"
                  >
                      Shop
                  </Button>
                  <Menu
                    anchorEl={catAnchorEl}
                    open={Boolean(catAnchorEl)}
                    onClose={handleCatClose}
                    PaperProps={{
                      elevation: 4,
                      sx: { borderRadius: '20px', mt: 1.5, minWidth: 200, p: 1 }
                    }}
                  >
                      {categories.map(cat => (
                          <MenuItem
                            key={cat.name}
                            onClick={handleCatClose}
                            component={Link}
                            to={cat.path}
                            className="rounded-xl py-2 px-4 transition-all"
                            sx={{ '&:hover': { bgcolor: 'primary.light', color: 'white' } }}
                          >
                            {cat.name}
                          </MenuItem>
                      ))}
                  </Menu>

                  <Button className="text-slate-600 dark:text-slate-300 font-bold px-4">Collections</Button>
                  <Button className="text-slate-600 dark:text-slate-300 font-bold px-4">About</Button>
              </Box>

              {/* Right: Actions */}
              <Box className="flex items-center space-x-1 md:space-x-3">
                  <Tooltip title="Search">
                    <IconButton className="text-slate-600 dark:text-slate-300">
                      <SearchOutlined />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Toggle Theme">
                    <IconButton onClick={toggleColorMode} className="text-slate-600 dark:text-slate-300">
                      {theme.palette.mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Shopping Bag">
                    <IconButton component={Link} to="/cart" className="text-slate-600 dark:text-slate-300">
                        <Badge
                          badgeContent={cartItems.length}
                          color="primary"
                          sx={{ '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                        >
                            <ShoppingBagOutlined />
                        </Badge>
                    </IconButton>
                  </Tooltip>

                  {user ? (
                      <Box>
                        <Tooltip title="Account">
                          <IconButton onClick={handleMenu} className="p-0.5 border-2 border-primary/20">
                            <Avatar
                              sx={{
                                width: 32, height: 32,
                                bgcolor: 'primary.main',
                                fontSize: '0.875rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {user.firstName.charAt(0)}
                            </Avatar>
                          </IconButton>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                          PaperProps={{
                            elevation: 4,
                            sx: { borderRadius: '20px', mt: 1.5, minWidth: 240, p: 1 }
                          }}
                        >
                            <Box className="px-4 py-2">
                              <Typography variant="subtitle2" className="font-bold">{user.firstName} {user.lastName}</Typography>
                              <Typography variant="caption" color="textSecondary">{user.email}</Typography>
                            </Box>
                            <Divider className="my-2" />

                            {user.roles.includes('ROLE_ADMIN') && (
                              <MenuItem onClick={handleClose} component={Link} to="/admin" className="rounded-xl">
                                <ListItemIcon><DashboardOutlined fontSize="small" color="primary" /></ListItemIcon>
                                <Typography variant="body2" className="font-bold text-primary">Admin Panel</Typography>
                              </MenuItem>
                            )}

                            <MenuItem onClick={handleClose} className="rounded-xl">
                              <ListItemIcon><LocalShippingOutlined fontSize="small" /></ListItemIcon>
                              <Typography variant="body2">Track Orders</Typography>
                            </MenuItem>

                            <MenuItem onClick={handleClose} className="rounded-xl">
                              <ListItemIcon><FavoriteBorderOutlined fontSize="small" /></ListItemIcon>
                              <Typography variant="body2">My Wishlist</Typography>
                            </MenuItem>

                            <Divider className="my-2" />

                            <MenuItem onClick={() => { handleClose(); logout(); }} className="rounded-xl text-red-500">
                              <ListItemIcon><LogoutOutlined fontSize="small" className="text-red-500" /></ListItemIcon>
                              <Typography variant="body2" className="font-bold">Sign Out</Typography>
                            </MenuItem>
                        </Menu>
                      </Box>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                          variant="contained"
                          component={Link} to="/login"
                          className="shadow-premium px-6 py-2 rounded-full hidden sm:flex"
                      >
                          Login
                      </Button>
                      <IconButton component={Link} to="/login" className="flex sm:hidden text-primary">
                        <PersonOutlineOutlined />
                      </IconButton>
                    </motion.div>
                  )}
              </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Navbar;
