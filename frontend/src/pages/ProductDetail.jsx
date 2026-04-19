import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, ToggleButton, ToggleButtonGroup, Rating, Divider, Chip, CircularProgress } from '@mui/material';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { productApi } from '../services/api';

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
          setDisplayImage(initialSize.imageUrl);
          setStock(initialSize.stock);
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
    <Container className="py-12 dark:text-white">
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div className="relative overflow-hidden group rounded-xl shadow-lg">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-auto transition-transform duration-500 group-hover:scale-150 cursor-zoom-in"
              onMouseMove={(e) => {
                const { left, top, width, height } = e.target.getBoundingClientRect();
                const x = ((e.pageX - left - window.scrollX) / width) * 100;
                const y = ((e.pageY - top - window.scrollY) / height) * 100;
                e.target.style.transformOrigin = `${x}% ${y}%`;
              }}
            />
          </div>
          <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
            {product.sizes && product.sizes.map((s, idx) => (
              <img
                key={idx}
                src={s.imageUrl}
                alt={s.size}
                className={`h-20 w-20 object-cover rounded border-2 cursor-pointer transition-all ${selectedSize === s.size ? 'border-sannaliya-teal' : 'border-transparent opacity-60'}`}
                onClick={() => {
                  setSelectedSize(s.size);
                  setDisplayImage(s.imageUrl);
                  setStock(s.stock);
                }}
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="mb-2 font-bold">{product.name}</Typography>
          <div className="flex items-center mb-4">
            <Rating value={product.averageRating || 0} precision={0.5} readOnly />
            <Typography variant="body2" className="ml-2">({product.reviews?.length || 0} Reviews)</Typography>
          </div>
          <Typography variant="h4" color="primary" className="mb-4 font-bold">LKR {product.price.toLocaleString()}</Typography>

          <div className="mb-6">
            {stock > 0 ? (
              <Chip label={`In Stock: ${stock} units`} color="success" variant="outlined" />
            ) : (
              <Chip label="Out of Stock" color="error" variant="outlined" />
            )}
          </div>

          <Typography variant="body1" className="mb-6">{product.description}</Typography>

          <Typography variant="h6" className="mb-2">Select Size</Typography>
          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            className="mb-8"
          >
            {product.sizes && product.sizes.map((s) => (
              <ToggleButton key={s.size} value={s.size} disabled={s.stock === 0}>
                {s.size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleAddToCart}
            className="py-3"
            disabled={stock === 0}
          >
            Add to Cart
          </Button>

          <Divider className="my-8" />
          <Typography variant="body2">Category: {product.category}</Typography>
          <Typography variant="body2">Sub-Category: {product.subCategory}</Typography>
          <Typography variant="body2">Shipping Weight: {product.weight} kg</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
