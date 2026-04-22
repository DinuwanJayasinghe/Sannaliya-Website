import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Button, CircularProgress,
  Box, IconButton, Stack, useTheme, Chip, Paper
} from '@mui/material';
import {
  ArrowForward,
  LocalShippingOutlined,
  VerifiedUserOutlined,
  HeadsetMicOutlined,
  ArrowBackIosNew,
  ArrowForwardIos
} from '@mui/icons-material';
import ProductCard from '../components/product/ProductCard';
import { productApi } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import SLMap from '../components/checkout/SLMap';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    title: "Elegance in <span class='text-primary italic font-serif'>Every Stitch</span>",
    subtitle: "Discover our premium casual and office wear, crafted for the modern Sri Lankan lifestyle.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    color: "#1FA2A6"
  },
  {
    title: "New <span class='text-secondary italic font-serif'>Spring Collection</span>",
    subtitle: "Refresh your wardrobe with our latest arrivals in vibrant colors and breathable fabrics.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop",
    color: "#0F6B6E"
  },
  {
    title: "Sophisticated <span class='text-white italic font-serif'>Office Wear</span>",
    subtitle: "Command the room with our tailored blouses and professional trousers.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2000&auto=format&fit=crop",
    color: "#2F3E46"
  }
];

const Home = () => {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    productApi.getAll()
      .then(res => {
        setProducts(res.data.slice(0, 8)); // Just top 8 for home
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="bg-slate-50 dark:bg-dark-bg min-h-screen transition-colors duration-300">
      {/* Enhanced Hero Slider */}
      <div className="relative h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] scale-110"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <Container className="h-full flex items-center relative z-10">
              <Box className="max-w-2xl text-white">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Typography
                    variant="h1"
                    className="font-serif font-bold mb-6 text-6xl md:text-8xl leading-[1.1]"
                    dangerouslySetInnerHTML={{ __html: heroSlides[currentSlide].title }}
                  />
                  <Typography variant="h5" className="mb-10 text-xl md:text-2xl opacity-90 font-light max-w-lg leading-relaxed">
                    {heroSlides[currentSlide].subtitle}
                  </Typography>
                  <Stack direction="row" spacing={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      className="px-10 py-4 rounded-full font-bold text-lg shadow-premium"
                      component={Link} to="/shop"
                    >
                      Shop Collection
                    </Button>
                    <Button
                      variant="outlined"
                      className="border-2 border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-full font-bold text-lg"
                    >
                      Learn More
                    </Button>
                  </Stack>
                </motion.div>
              </Box>
            </Container>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <Box className="absolute bottom-10 right-10 z-20 flex space-x-4">
          <IconButton
            onClick={prevSlide}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
          >
            <ArrowBackIosNew />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            className="bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20"
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        {/* Progress Dots */}
        <Box className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === i ? 'w-8 bg-primary' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </Box>
      </div>

      {/* Trust Badges */}
      <Box className="bg-white dark:bg-slate-900 border-b dark:border-slate-800 py-10">
        <Container>
          <Grid container spacing={4} className="text-center">
            {[
              { icon: <LocalShippingOutlined />, title: "Free Delivery", desc: "Orders over LKR 10,000" },
              { icon: <VerifiedUserOutlined />, title: "Secure Payment", desc: "Cash on Delivery available" },
              { icon: <HeadsetMicOutlined />, title: "24/7 Support", desc: "Dedicated help center" },
              { icon: <VerifiedUserOutlined />, title: "Quality Guarantee", desc: "Handpicked premium fabrics" }
            ].map((badge, i) => (
              <Grid item xs={6} md={3} key={i}>
                <Box className="flex flex-col items-center">
                  <Box className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {badge.icon}
                  </Box>
                  <Typography variant="subtitle1" className="font-bold mb-1 dark:text-white">{badge.title}</Typography>
                  <Typography variant="caption" className="text-slate-500">{badge.desc}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Featured Collections */}
      <Container className="py-24">
        <Box className="flex justify-between items-end mb-16">
            <Box>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 80 }}
                  viewport={{ once: true }}
                  className="h-1.5 bg-primary mb-4 rounded-full"
                />
                <Typography variant="h3" className="font-serif font-bold text-slate-900 dark:text-white">
                  Trending Now
                </Typography>
            </Box>
            <Button
              endIcon={<ArrowForward />}
              color="primary"
              className="font-bold text-lg hover:translate-x-2 transition-transform"
            >
              Discover All
            </Button>
        </Box>

        {loading ? (
          <Box className="flex justify-center py-20"><CircularProgress /></Box>
        ) : (
          <Grid container spacing={4}>
            {products.map((product, idx) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Delivery Map Section */}
      <Box className="bg-white dark:bg-slate-900 py-24 border-y dark:border-slate-800">
        <Container>
            <Grid container spacing={10} alignItems="center">
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Chip label="Logistics" color="primary" size="small" className="font-bold mb-4" />
                        <Typography variant="h3" className="font-serif font-bold text-slate-900 dark:text-white mb-6">
                          Delivery Across Sri Lanka
                        </Typography>
                        <Typography variant="body1" className="text-slate-600 dark:text-slate-400 text-lg mb-10 leading-relaxed">
                            We take pride in our efficient logistics network. Whether you're in Colombo or Jaffna,
                            Sannaliya brings fashion to your doorstep with our reliable Cash on Delivery service.
                        </Typography>

                        <Stack spacing={3}>
                          {[
                            { zone: "Zone 1", price: "LKR 450", area: "Colombo, Gampaha, Kalutara, Galle, Matara, Kegalle" },
                            { zone: "Zone 2", price: "LKR 500", area: "All other districts islandwide" }
                          ].map((item, i) => (
                            <Paper
                              key={i}
                              elevation={0}
                              className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 dark:bg-dark-bg/50 hover:shadow-soft transition-all"
                            >
                              <Box className="flex justify-between items-center mb-2">
                                <Typography className="font-bold text-primary">{item.zone}</Typography>
                                <Typography className="font-bold text-lg">{item.price}</Typography>
                              </Box>
                              <Typography variant="body2" className="text-slate-500">{item.area}</Typography>
                            </Paper>
                          ))}
                        </Stack>
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <Box className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-3xl" />
                        <Paper className="relative p-6 rounded-[40px] shadow-premium dark:bg-dark-bg border-none overflow-hidden">
                            <SLMap onDistrictSelect={(d) => console.log(d)} />
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
      </Box>

      {/* Promotional Banner */}
      <Container className="my-24">
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-primary rounded-[40px] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between shadow-teal-glow relative overflow-hidden"
        >
            <Box className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
            <Box className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 blur-2xl" />

            <Box className="relative z-10 mb-10 md:mb-0 text-white max-w-xl text-center md:text-left">
                <Typography variant="h3" className="font-serif font-bold mb-4 leading-tight">
                  Join the Sannaliya Insider List
                </Typography>
                <Typography variant="h6" className="opacity-90 font-light mb-8">
                  Get 15% off your first order and stay updated with our exclusive seasonal drops.
                </Typography>
                <Button
                    variant="contained"
                    className="bg-white text-primary hover:bg-slate-100 font-bold px-12 py-5 rounded-full text-lg shadow-xl"
                >
                    Subscribe Now
                </Button>
            </Box>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative z-10 hidden lg:block"
            >
              <Box className="w-64 h-80 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 p-4 shadow-2xl">
                 <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
                    alt="promo"
                    className="w-full h-full object-cover rounded-2xl"
                  />
              </Box>
            </motion.div>
        </motion.div>
      </Container>
    </div>
  );
};

export default Home;
