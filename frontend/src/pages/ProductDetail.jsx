import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Grid, Typography, Button, ToggleButton,
  ToggleButtonGroup, Rating, Divider, CircularProgress,
  Paper, Avatar, Box, Stack, useTheme
} from '@mui/material';
import {
  LocalShippingOutlined,
  AutorenewOutlined,
  VerifiedOutlined,
  ShoppingBagOutlined
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { productApi } from '../services/api';
import ImageZoom from '../components/product/ImageZoom';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
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
          setDisplayImage(initialSize.imageUrl || p.mainImageUrl);
          setStock(initialSize.stock);
        } else {
          setDisplayImage(p.mainImageUrl);
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
        setDisplayImage(sizeObj.imageUrl || product.mainImageUrl);
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

  if (loading) return (
    <Box className="flex justify-center items-center min-h-[60vh]">
      <CircularProgress color="primary" />
    </Box>
  );

  if (!product) return (
    <Container className="py-20 text-center">
      <Typography variant="h5" color="textSecondary">Product not found.</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg" className="py-12">
      <Grid container spacing={{ xs: 4, md: 8 }}>
        {/* Image Gallery */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={displayImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ImageZoom src={displayImage} alt={product.name} />
              </motion.div>
            </AnimatePresence>

            <Box className="flex space-x-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
                <Paper
                  elevation={displayImage === product.mainImageUrl ? 4 : 1}
                  className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    displayImage === product.mainImageUrl ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setDisplayImage(product.mainImageUrl)}
                >
                  <img src={product.mainImageUrl} alt="main" className="w-full h-full object-cover" />
                </Paper>
                {product.sizes?.filter(s => s.imageUrl).map((s, i) => (
                    <Paper
                      key={i}
                      elevation={displayImage === s.imageUrl ? 4 : 1}
                      className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                        displayImage === s.imageUrl ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => {
                        setDisplayImage(s.imageUrl);
                        setSelectedSize(s.size);
                        setStock(s.stock);
                      }}
                    >
                      <img src={s.imageUrl} alt={s.size} className="w-full h-full object-cover" />
                    </Paper>
                ))}
            </Box>
          </motion.div>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography variant="overline" color="primary" className="font-bold tracking-widest">
                  {product.category}
                </Typography>
                <Typography variant="h3" className="font-serif font-bold mt-1 text-slate-900 dark:text-white">
                  {product.name}
                </Typography>
              </Box>

              <Box className="flex items-center space-x-4">
                <Rating value={product.averageRating} precision={0.5} readOnly size="medium" />
                <Typography variant="body2" color="textSecondary">
                  ({product.reviews?.length || 0} customer reviews)
                </Typography>
              </Box>

              <Typography variant="h4" color="primary" className="font-bold">
                LKR {product.price.toLocaleString()}
              </Typography>

              <Typography variant="body1" className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {product.description}
              </Typography>

              <Box>
                <Typography variant="subtitle1" className="font-bold mb-3 flex items-center gap-2">
                  Select Size <span className="text-sm font-normal text-slate-500">(Required)</span>
                </Typography>
                <ToggleButtonGroup
                  value={selectedSize}
                  exclusive
                  onChange={handleSizeChange}
                  className="flex flex-wrap gap-3"
                  sx={{ border: 'none' }}
                >
                  {product.sizes?.map((s) => (
                    <ToggleButton
                      key={s.size}
                      value={s.size}
                      disabled={s.stock === 0}
                      sx={{
                          borderRadius: '12px !important',
                          border: '1px solid #E2E8F0 !important',
                          minWidth: '60px',
                          height: '60px',
                          fontWeight: 700,
                          transition: 'all 0.2s',
                          '&.Mui-selected': {
                            backgroundColor: theme.palette.primary.main + ' !important',
                            color: 'white !important',
                            boxShadow: '0 4px 12px rgba(31, 162, 166, 0.4)'
                          },
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            backgroundColor: 'rgba(31, 162, 166, 0.05)'
                          }
                      }}
                    >
                      {s.size}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box className="py-4">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  startIcon={<ShoppingBagOutlined />}
                  onClick={handleAddToCart}
                  disabled={stock === 0}
                  className="py-4 text-lg rounded-2xl shadow-premium"
                >
                  {stock > 0 ? 'Add to Bag' : 'Out of Stock'}
                </Button>
              </Box>

              <Grid container spacing={2} className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Grid item xs={6}>
                  <Box className="flex items-center space-x-3">
                    <LocalShippingOutlined color="primary" />
                    <Box>
                      <Typography variant="caption" className="block font-bold">Fast Delivery</Typography>
                      <Typography variant="caption" color="textSecondary">Islandwide 3-5 days</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box className="flex items-center space-x-3">
                    <AutorenewOutlined color="primary" />
                    <Box>
                      <Typography variant="caption" className="block font-bold">Easy Returns</Typography>
                      <Typography variant="caption" color="textSecondary">7-day exchange policy</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </motion.div>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12} className="mt-16">
          <Divider className="mb-12" />
          <Typography variant="h4" className="font-serif font-bold mb-8">What our customers say</Typography>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Paper className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border-none">
                <Stack spacing={2} alignItems="center">
                  <Typography variant="h2" color="primary" className="font-bold">
                    {product.averageRating?.toFixed(1)}
                  </Typography>
                  <Rating value={product.averageRating || 0} precision={0.5} readOnly size="large" />
                  <Typography variant="body2" color="textSecondary">
                    Based on {product.reviews?.length} reviews
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth className="mt-4 rounded-xl">
                    Write a Review
                  </Button>
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                {product.reviews?.map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Box className="flex space-x-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        {review.userName.charAt(0)}
                      </Avatar>
                      <Box flex={1}>
                        <Box className="flex justify-between items-start mb-2">
                          <Box>
                            <Typography className="font-bold">{review.userName}</Typography>
                            <Rating value={review.rating} size="small" readOnly />
                          </Box>
                          <Typography variant="caption" color="textSecondary">
                            {new Date(review.timestamp).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Box className="flex items-center gap-2 mb-2">
                          <VerifiedOutlined color="success" sx={{ fontSize: 16 }} />
                          <Typography variant="caption" className="text-green-600 font-bold uppercase tracking-tighter">
                            Verified Purchase
                          </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary" className="italic">
                          "{review.comment}"
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
