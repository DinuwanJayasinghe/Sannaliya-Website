import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
      <CardMedia
        component="img"
        height="260"
        image={product.sizes[0].imageUrl}
        alt={product.name}
        className="h-64 object-cover"
      />
      <CardContent className="flex-grow">
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body1" color="primary" className="font-bold">
          LKR {product.price.toLocaleString()}
        </Typography>
      </CardContent>
      <div className="p-4 pt-0">
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          component={Link}
          to={`/product/${product.id}`}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
