import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';
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
    <div className="bg-sannaliya-bg min-h-screen">
      {/* Hero Section */}
      <div className="bg-teal-gradient text-white py-32 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" style={{stopColor:'rgb(255,255,255)', stopOpacity:1}} />
                 <stop offset="100%" style={{stopColor:'rgb(255,255,255)', stopOpacity:0}} />
               </linearGradient>
             </defs>
           </svg>
        </div>
        <Container maxWidth="md" className="relative z-10">
          <Typography variant="h2" className="font-serif font-bold mb-6 text-5xl md:text-7xl">
            Elegance in Every Stitch
          </Typography>
          <Typography variant="h5" className="mb-10 text-xl opacity-90 font-light">
            Discover a curated collection of feminine fashion and wellness essentials.
          </Typography>
          <Box className="flex justify-center space-x-4">
            <Button variant="contained" className="bg-white text-sannaliya-teal hover:bg-gray-100 px-10 py-3 shadow-xl">
              Shop Women
            </Button>
            <Button variant="outlined" className="border-white text-white hover:bg-white hover:text-sannaliya-teal px-10 py-3">
              New Arrivals
            </Button>
          </Box>
        </Container>
      </div>

      {/* Categories Bar */}
      <div className="bg-white shadow-sm border-b overflow-x-auto whitespace-nowrap py-4">
        <Container className="flex justify-center space-x-8">
            {["Frocks", "Tops", "Skirts", "Pants", "Denims", "Footwear", "Accessories"].map(cat => (
                <button key={cat} className="text-sannaliya-gray font-semibold hover:text-sannaliya-teal transition-colors">
                    {cat}
                </button>
            ))}
        </Container>
      </div>

      <Container className="py-20">
        <div className="flex justify-between items-end mb-12">
            <div>
                <Typography variant="h4" className="font-serif font-bold text-sannaliya-gray">Latest Collections</Typography>
                <div className="w-20 h-1 bg-sannaliya-teal mt-2"></div>
            </div>
            <Button color="primary" className="font-bold">View All</Button>
        </div>

        {loading ? (
          <div className="flex justify-center"><CircularProgress /></div>
        ) : (
          <Grid container spacing={5}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Promotional Banner */}
      <Container className="mb-20">
        <div className="bg-sannaliya-mint rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between shadow-inner">
            <div className="mb-8 md:mb-0">
                <Typography variant="h4" className="font-serif font-bold text-sannaliya-teal-dark mb-2">Exclusive Offer</Typography>
                <Typography variant="h6" className="text-sannaliya-gray opacity-80">Get 15% off your first order with code: SANNALIYA15</Typography>
            </div>
            <Button variant="contained" color="primary" size="large">Claim Offer</Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
