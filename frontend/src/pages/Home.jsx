import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';
import ProductCard from '../components/product/ProductCard';
import { productApi } from '../services/api';
import { motion } from 'framer-motion';
import SLMap from '../components/checkout/SLMap';

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
      <div className="bg-teal-gradient text-white py-40 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
             <defs>
               <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" style={{stopColor:'rgb(255,255,255)', stopOpacity:1}} />
                 <stop offset="100%" style={{stopColor:'rgb(255,255,255)', stopOpacity:0}} />
               </linearGradient>
             </defs>
           </svg>
        </motion.div>

        <Container maxWidth="md" className="relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography variant="h2" className="font-serif font-bold mb-6 text-5xl md:text-8xl tracking-tight">
              Elegance in <span className="text-sannaliya-mint italic">Every Stitch</span>
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography variant="h5" className="mb-12 text-xl md:text-2xl opacity-90 font-light max-w-2xl mx-auto">
              Sannaliya brings you premium casual and office wear, crafted for the modern Sri Lankan lifestyle.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <Button
                variant="contained"
                className="bg-white text-sannaliya-teal hover:bg-sannaliya-mint hover:text-sannaliya-teal-dark px-12 py-4 rounded-full font-bold text-lg shadow-2xl transform transition-all active:scale-95"
            >
              Shop Collection
            </Button>
            <Button
                variant="outlined"
                className="border-2 border-white text-white hover:bg-white hover:text-sannaliya-teal px-12 py-4 rounded-full font-bold text-lg transition-all"
            >
              New Arrivals
            </Button>
          </motion.div>
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

      {/* Delivery Section */}
      <div className="bg-white py-24">
        <Container>
            <Grid container spacing={10} items="center">
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography variant="overline" className="text-sannaliya-teal font-bold tracking-widest">Our Service</Typography>
                        <Typography variant="h3" className="font-serif font-bold text-sannaliya-gray mb-6 mt-2">Islandwide Fast Delivery</Typography>
                        <Typography variant="body1" className="text-gray-600 text-lg mb-8 leading-relaxed">
                            We deliver to every corner of Sri Lanka. Select your district on the map to check delivery charges.
                            Our optimized logistics ensure your Sannaliya favorites reach you within 3-5 working days.
                        </Typography>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-sannaliya-bg rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sannaliya-teal/20 rounded-full flex items-center justify-center text-sannaliya-teal mr-4">📍</div>
                                <div>
                                    <Typography className="font-bold">Zone 1 Districts</Typography>
                                    <Typography variant="body2" className="text-gray-500">LKR 450 for 1st Kg (Colombo, Gampaha, etc.)</Typography>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-sannaliya-bg rounded-2xl border border-gray-100">
                                <div className="w-12 h-12 bg-sannaliya-teal-dark/20 rounded-full flex items-center justify-center text-sannaliya-teal-dark mr-4">🚚</div>
                                <div>
                                    <Typography className="font-bold">Zone 2 Districts</Typography>
                                    <Typography variant="body2" className="text-gray-500">LKR 500 for 1st Kg (Outstation areas)</Typography>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-4 bg-sannaliya-bg rounded-[40px] shadow-2xl border border-white"
                    >
                        <SLMap onDistrictSelect={(d) => console.log(d)} />
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
      </div>

      {/* Promotional Banner */}
      <Container className="mb-24">
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-teal-gradient rounded-[40px] p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10 mb-8 md:mb-0 text-white">
                <Typography variant="h3" className="font-serif font-bold mb-3">Exclusive Launch Offer</Typography>
                <Typography variant="h6" className="opacity-90 font-light">Get 15% off your first order with code: <span className="font-bold border-b-2 border-sannaliya-mint text-sannaliya-mint">SANNALIYA15</span></Typography>
            </div>
            <Button
                variant="contained"
                className="bg-white text-sannaliya-teal hover:bg-sannaliya-mint hover:text-sannaliya-teal-dark font-bold px-12 py-5 rounded-full text-lg shadow-xl relative z-10"
            >
                Claim Offer Now
            </Button>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;
