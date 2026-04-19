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
    <div className="bg-sannaliya-bg min-h-screen dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-teal-gradient text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <Typography variant="h2" className="font-serif font-bold mb-6 animate-fade-in-down">
            Elevate Your Style with Sannaliya
          </Typography>
          <Typography variant="h5" className="mb-10 max-w-2xl text-sannaliya-mint opacity-90">
            Discover a curated collection of elegant casual wear, office attire, and graceful accessories designed for the modern Sri Lankan lifestyle.
          </Typography>
          <div className="flex space-x-4">
            <Button variant="contained" color="secondary" size="large" className="rounded-full px-8 py-3 shadow-lg hover:scale-105 transition-transform">
              Shop Now
            </Button>
            <Button variant="outlined" color="inherit" size="large" className="rounded-full px-8 py-3 border-2 hover:bg-white hover:text-sannaliya-teal transition-all">
              View Arrivals
            </Button>
          </div>
        </div>
        {/* Abstract shapes for background */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-sannaliya-mint opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Featured Categories */}
      <Container className="py-20">
        <Typography variant="h4" className="mb-4 text-center font-serif text-sannaliya-gray dark:text-white">
          Shop by Category
        </Typography>
        <div className="w-24 h-1 bg-sannaliya-teal mx-auto mb-12 rounded-full"></div>
        <Grid container spacing={4}>
          {['Casual Wear', 'Office Wear', 'Kids Wear', 'Accessories', 'Footwear', 'Gift Items'].map((cat) => (
            <Grid item xs={12} sm={6} md={4} key={cat}>
              <div className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer">
                <div className="absolute inset-0 bg-sannaliya-gray opacity-40 group-hover:opacity-20 transition-opacity"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Typography variant="h5" className="text-white font-bold tracking-widest">{cat.toUpperCase()}</Typography>
                </div>
                <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80')` }}></div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Arrivals Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <Container>
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <Typography variant="h4" className="font-serif text-sannaliya-gray dark:text-white mb-2">
                New Arrivals
              </Typography>
              <Typography variant="body1" className="text-gray-500 dark:text-gray-400">
                Check out our latest releases and stay ahead of the fashion curve.
              </Typography>
            </div>
            <Button color="primary" className="font-bold">View All</Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><CircularProgress /></div>
          ) : (
            <Grid container spacing={4}>
              {products.filter(p => p.isNewArrival).map(product => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </div>

      {/* Newsletter Section */}
      <div className="bg-sannaliya-gray text-white py-16">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h4" className="font-serif mb-4">Stay in the Loop</Typography>
          <Typography variant="body1" className="mb-8 opacity-80">
            Subscribe to our newsletter and be the first to know about new collections and exclusive offers.
          </Typography>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-6 py-3 rounded-full text-sannaliya-gray focus:outline-none focus:ring-2 focus:ring-sannaliya-teal"
            />
            <Button variant="contained" color="primary" className="rounded-full px-8 py-3">
              Subscribe
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Home;
