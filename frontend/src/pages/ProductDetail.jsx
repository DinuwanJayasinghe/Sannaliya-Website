import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Button, ToggleButton, ToggleButtonGroup, Rating, Divider, Chip } from '@mui/material';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    // Mock fetching product with real-time stock simulation
    const mockProduct = {
      id: id,
      name: 'Elegant Office Frock',
      description: 'A stylish and professional office wear frock designed for comfort and elegance.',
      price: 3500.00,
      weight: 0.4,
      category: 'Office wear',
      averageRating: 4.5,
      sizes: [
        { size: 'Xs', imageUrl: 'https://images.unsplash.com/photo-1539109132304-39155021aa39?auto=format&fit=crop&w=600&q=80', stock: 5 },
        { size: 'S', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', stock: 12 },
        { size: 'M', imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80', stock: 0 },
        { size: 'L', imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80', stock: 8 },
        { size: 'XL', imageUrl: 'https://images.unsplash.com/photo-1518885320299-65a882992983?auto=format&fit=crop&w=600&q=80', stock: 3 }
      ]
    };
    setProduct(mockProduct);
    const initialSize = mockProduct.sizes[1];
    setSelectedSize(initialSize.size);
    setDisplayImage(initialSize.imageUrl);
    setStock(initialSize.stock);
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

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container className="py-12">
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img src={displayImage} alt={product.name} className="w-full h-auto rounded-lg shadow-md" />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" className="mb-2 font-bold">{product.name}</Typography>
          <div className="flex items-center mb-4">
            <Rating value={product.averageRating} precision={0.5} readOnly />
            <Typography variant="body2" className="ml-2">(12 Reviews)</Typography>
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
            aria-label="product size"
            className="mb-8"
          >
            {product.sizes.map((s) => (
              <ToggleButton key={s.size} value={s.size} aria-label={s.size} disabled={s.stock === 0}>
                {s.size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <div className="flex flex-col space-y-4">
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
          </div>

          <Divider className="my-8" />
          <Typography variant="body2">Category: {product.category}</Typography>
          <Typography variant="body2">Shipping Weight: {product.weight} kg</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
