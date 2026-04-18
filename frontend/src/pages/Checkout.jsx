import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, MenuItem, Paper, Button, Divider } from '@mui/material';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SLMap from '../components/checkout/SLMap';
import { orderApi } from '../services/api';

const districts = [
  "Kalutara", "Colombo", "Gampaha", "Galle", "Matara", "Kegalle",
  "Kandy", "Matale", "Nuwara Eliya", "Ampara", "Batticaloa", "Trincomalee",
  "Anuradhapura", "Polonnaruwa", "Jaffna", "Kilinochchi", "Mannar", "Mullaitivu",
  "Vavuniya", "Kurunegala", "Puttalam", "Ratnapura", "Hambantota", "Badulla", "Monaragala"
];

const zone1Districts = ["Kalutara", "Colombo", "Gampaha", "Galle", "Matara", "Kegalle"];

const Checkout = () => {
  const { cartItems, subtotal, totalWeight, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    district: '',
    nearestCity: '',
    phone1: '',
    phone2: ''
  });

  const calculateDelivery = () => {
    if (!formData.district) return 0;
    const isZone1 = zone1Districts.includes(formData.district);
    const firstKg = isZone1 ? 450 : 500;
    const additionalKg = 100;

    if (totalWeight <= 1) return firstKg;
    return firstKg + (Math.ceil(totalWeight - 1) * additionalKg);
  };

  const deliveryCharge = calculateDelivery();
  const grandTotal = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDistrictSelect = (district) => {
    setFormData({ ...formData, district });
    toast.info(`District selected: ${district}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      totalPrice: subtotal,
      deliveryCharge,
      grandTotal
    };

    orderApi.placeOrder(orderData)
      .then(res => {
        toast.success('Order placed successfully! (Cash on Delivery)');
        clearCart();
        navigate('/');
      })
      .catch(err => {
        toast.error('Failed to place order');
        console.error(err);
      });
  };

  return (
    <Container className="py-12">
      <Typography variant="h4" className="mb-8">Checkout</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper className="p-6">
              <Typography variant="h6" className="mb-4">Shipping Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" name="firstName" required onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" name="lastName" required onChange={handleChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" name="address" required multiline rows={2} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="District"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleChange}
                  >
                    {districts.map((d) => (
                      <MenuItem key={d} value={d}>{d}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Nearest City" name="nearestCity" required onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number 1" name="phone1" required onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone Number 2" name="phone2" onChange={handleChange} />
                </Grid>
              </Grid>

              <div className="mt-8">
                <Typography variant="h6" className="mb-2">Payment Method</Typography>
                <Paper variant="outlined" className="p-4 border-sannaliya-teal bg-teal-50">
                  <Typography variant="body1" className="font-bold text-sannaliya-teal">
                    Cash on Delivery
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    Pay with cash upon delivery.
                  </Typography>
                </Paper>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper className="p-6 sticky top-4">
              <Typography variant="h6" className="mb-4">Order Summary</Typography>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <Typography>Items Subtotal</Typography>
                  <Typography>LKR {subtotal.toLocaleString()}</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography>Delivery Charge</Typography>
                  <Typography>LKR {deliveryCharge.toLocaleString()}</Typography>
                </div>
                <Divider className="my-2" />
                <div className="flex justify-between">
                  <Typography variant="h6" className="font-bold">Total</Typography>
                  <Typography variant="h6" className="font-bold text-sannaliya-teal">LKR {grandTotal.toLocaleString()}</Typography>
                </div>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                className="py-3"
              >
                Place Order
              </Button>
            </Paper>

            <Paper className="p-6 mt-4 text-center">
               <Typography variant="h6" className="mb-2">Select Your District</Typography>
               <SLMap selectedDistrict={formData.district} onDistrictSelect={handleDistrictSelect} />
               <div className="mt-4 text-xs space-y-1 text-left">
                 <div className="flex items-center">
                   <div className="w-3 h-3 bg-[#2A9D8F] mr-2"></div>
                   <span>Zone 1: LKR 450 (Western & Southern areas)</span>
                 </div>
                 <div className="flex items-center">
                   <div className="w-3 h-3 bg-[#A8D5BA] mr-2"></div>
                   <span>Zone 2: LKR 500 (Other areas)</span>
                 </div>
               </div>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Checkout;
