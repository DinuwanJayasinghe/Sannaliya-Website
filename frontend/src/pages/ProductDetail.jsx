import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, ToggleButton, ToggleButtonGroup, Rating, Divider, Chip, CircularProgress, Paper, TextField, Avatar } from '@mui/material';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { productApi } from '../services/api';
import ImageZoom from '../components/product/ImageZoom';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    productApi.getById(id)
      .then(res => {
        const p = res.data;
        setProduct(p);
        if (p.sizes && p.sizes.length > 0) {
          const initialSize = p.sizes[0];
          setSelectedSize(initialSize.size);
          setDisplayImage(initialSize.imageUrl || p.imageData);
          setStock(initialSize.stock);
        } else {
          setDisplayImage(p.imageData || p.mainImageUrl);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSizeChange = (event, newSize) => {
    if (newSize !== null) {
      setSelectedSize(newSize);
      const sizeObj = product.sizes.find(s => s.size === newSize);
      if (sizeObj) {
        setDisplayImage(sizeObj.imageUrl);
        setStock(sizeObj.stock);
      }
    }
  };

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart(product, selectedSize, displayImage);
      toast.success(`${product.name} (${selectedSize}) added to cart!`);
    } else {
      toast.error('Sorry, this size is out of stock.');
    }
  };

  if (loading) return <div className="flex justify-center py-20"><CircularProgress /></div>;
  if (!product) return <Typography className="py-20 text-center">Product not found.</Typography>;

  return (
    <Container className="py-12 bg-white">
      <Grid container spacing={8}>
        <Grid item xs={12} md={6}>
          <ImageZoom src={displayImage} alt={product.name} />
          <div className="flex space-x-2 mt-4 overflow-x-auto py-2">
              <img
                src={product.imageData || product.mainImageUrl} alt="main"
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${displayImage === (product.imageData || product.mainImageUrl) ? 'border-sannaliya-teal scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => { setDisplayImage(product.imageData || product.mainImageUrl); }}
              />
              {product.sizes?.filter(s => s.imageUrl).map((s, i) => (
                  <img
                    key={i} src={s.imageUrl} alt={s.size}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all ${displayImage === s.imageUrl ? 'border-sannaliya-teal scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                    onClick={() => { setDisplayImage(s.imageUrl); setSelectedSize(s.size); setStock(s.stock); }}
                  />
              ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="mb-2 font-serif font-bold text-sannaliya-gray">{product.name}</Typography>
          <div className="flex items-center mb-6">
            <Rating value={product.averageRating || 4.5} precision={0.5} readOnly />
            <Typography variant="body2" className="ml-2 text-gray-500">({product.reviews?.length || 12} Verified Reviews)</Typography>
          </div>
          <Typography variant="h4" className="mb-6 font-bold text-sannaliya-teal">LKR {product.price.toLocaleString()}</Typography>

          <div className="mb-8 p-4 bg-sannaliya-bg rounded-xl inline-block border border-gray-100">
            {stock > 0 ? (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <Typography variant="body2" className="text-green-700 font-semibold">Available Stock: {stock} units</Typography>
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <Typography variant="body2" className="text-red-700 font-semibold">Currently Out of Stock</Typography>
              </div>
            )}
          </div>

          <Typography variant="body1" className="mb-8 leading-relaxed text-gray-600 text-lg">{product.description}</Typography>

          <Typography variant="h6" className="mb-3 font-semibold text-sannaliya-gray">Choose Size</Typography>
          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            className="mb-10 flex flex-wrap gap-2"
            sx={{ border: 'none' }}
          >
            {product.sizes?.map((s) => (
              <ToggleButton
                key={s.size}
                value={s.size}
                disabled={s.stock === 0}
                sx={{
                    borderRadius: '12px !important',
                    border: '1px solid #E5E7EB !important',
                    px: 3,
                    '&.Mui-selected': { backgroundColor: '#1FA2A6 !important', color: 'white !important' }
                }}
              >
                {s.size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Box className="flex space-x-4">
            <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                disabled={stock === 0}
                className="py-4 shadow-xl hover:shadow-2xl transition-all"
            >
                Add to Shopping Bag
            </Button>
          </Box>

          <div className="mt-12 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">🚚</div>
                  <span>Quick Delivery Islandwide</span>
              </div>
              <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">🔄</div>
                  <span>Easy 7-day Returns</span>
              </div>
          </div>
        </Grid>

        <Grid item xs={12}>
            <Divider className="my-12" />
            <Typography variant="h4" className="font-serif font-bold mb-8 text-sannaliya-gray">Customer Feedback</Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper className="p-8 bg-sannaliya-bg text-center">
                        <Typography variant="h2" className="text-sannaliya-teal font-bold mb-2">4.5</Typography>
                        <Rating value={4.5} precision={0.5} readOnly size="large" />
                        <Typography variant="body2" className="mt-2 text-gray-500">Based on 12 reviews</Typography>
                        <Button variant="outlined" fullWidth className="mt-6">Write a Review</Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <div className="space-y-6">
                        {[1, 2].map(i => (
                            <div key={i} className="flex space-x-4 border-b pb-6">
                                <Avatar className="bg-sannaliya-teal">C</Avatar>
                                <div>
                                    <div className="flex items-center mb-1">
                                        <Typography className="font-bold mr-2">Customer {i}</Typography>
                                        <Rating value={5} size="small" readOnly />
                                    </div>
                                    <Typography variant="body2" className="text-gray-600 italic mb-1">Verified Purchase</Typography>
                                    <Typography variant="body1" className="text-sannaliya-gray">Absolutely love the quality of this fabric! It fits perfectly and looks very elegant for office wear.</Typography>
                                </div>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
