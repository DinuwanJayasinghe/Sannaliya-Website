import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Grid, Paper, IconButton, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, subtotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="py-20 text-center">
        <Typography variant="h5" className="mb-4">Your cart is empty</Typography>
        <Button variant="contained" color="primary" component={Link} to="/">Go Shopping</Button>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <Typography variant="h4" className="mb-8">{t('cart')}</Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper className="p-4">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${item.size}`}>
                <div className="flex items-center py-4">
                  <img src={item.selectedImage} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="ml-4 flex-grow">
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="textSecondary">Size: {item.size}</Typography>
                    <Typography variant="body1" className="font-bold">LKR {item.price.toLocaleString()}</Typography>
                  </div>
                  <div className="flex items-center">
                    <Typography variant="body1" className="mr-4">Qty: {item.quantity}</Typography>
                    <IconButton onClick={() => removeFromCart(item.id, item.size)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </div>
                </div>
                {index < cartItems.length - 1 && <Divider />}
              </div>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="p-6">
            <Typography variant="h6" className="mb-4">Order Summary</Typography>
            <div className="flex justify-between mb-2">
              <Typography>Subtotal</Typography>
              <Typography>LKR {subtotal.toLocaleString()}</Typography>
            </div>
            <Typography variant="body2" className="text-gray-500 mb-4">
              * Delivery charges will be calculated at checkout.
            </Typography>
            <Divider className="my-4" />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/checkout"
            >
              Proceed to Checkout
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
