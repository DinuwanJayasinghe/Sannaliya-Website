import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import { productApi } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productApi.getAll()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="bg-sannaliya-teal text-white py-20 text-center">
        <Typography variant="h2" className="font-bold mb-4">Welcome to Sannaliya</Typography>
        <Typography variant="h5" className="mb-8">Discover Elegance, Redefine Style.</Typography>
        <Button variant="contained" color="secondary" size="large">Shop Now</Button>
      </div>

      <Container className="py-12">
        <Typography variant="h4" className="mb-8 text-center">New Arrivals</Typography>
        {loading ? (
          <div className="flex justify-center"><CircularProgress /></div>
        ) : (
          <Grid container spacing={4}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default Home;
