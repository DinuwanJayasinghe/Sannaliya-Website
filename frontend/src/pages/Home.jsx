import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, Grid, Button } from '@mui/material';
import ProductCard from '../components/product/ProductCard';

const Home = () => {
  const { t } = useTranslation();

  // Placeholder data - in a real app, fetch from API
  const featuredProducts = [
    {
      id: '1',
      name: 'Elegant Office Frock',
      price: 3500.00,
      weight: 0.4,
      sizes: [{ size: 'M', imageUrl: 'https://images.unsplash.com/photo-1539109132304-39155021aa39?auto=format&fit=crop&w=400&q=80' }],
      isNewArrival: true
    },
    {
      id: '2',
      name: 'Casual Floral Dress',
      price: 2800.00,
      weight: 0.3,
      sizes: [{ size: 'M', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' }],
      isNewArrival: false
    }
  ];

  return (
    <div>
      <div className="bg-sannaliya-teal text-white py-20 text-center">
        <Typography variant="h2" className="font-bold mb-4">{t('welcome')}</Typography>
        <Typography variant="h5" className="mb-8">Discover Elegance, Redefine Style.</Typography>
        <Button variant="contained" color="secondary" size="large">Shop Now</Button>
      </div>

      <Container className="py-12">
        <Typography variant="h4" className="mb-8 text-center">{t('new_arrivals')}</Typography>
        <Grid container spacing={4}>
          {featuredProducts.map(product => (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
