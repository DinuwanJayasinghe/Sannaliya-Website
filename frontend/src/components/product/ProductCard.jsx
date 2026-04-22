import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div
        whileHover={{ y: -10 }}
        transition={{ type: "spring", stiffness: 300 }}
    >
        <Card className="h-full flex flex-col border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-[30px] overflow-hidden group">
        <Box className="relative overflow-hidden h-72">
            <CardMedia
                component="img"
                image={product.imageData || product.mainImageUrl || (product.sizes && product.sizes[0]?.imageUrl)}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            {product.isNewArrival && (
                <div className="absolute top-4 left-4 bg-teal-gradient text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                    New Arrival
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                 <Button
                    variant="contained"
                    className="bg-white text-sannaliya-teal hover:bg-sannaliya-mint font-bold rounded-full px-6"
                    component={Link} to={`/product/${product.id}`}
                >
                    Quick View
                </Button>
            </div>
        </Box>
        <CardContent className="flex-grow bg-white p-6">
            <Typography variant="caption" className="text-gray-400 font-bold uppercase tracking-widest mb-1 block">
            {product.category}
            </Typography>
            <Typography gutterBottom variant="h6" className="font-serif font-bold text-sannaliya-gray line-clamp-1 mb-2">
            {product.name}
            </Typography>
            <Typography variant="h6" className="font-bold text-sannaliya-teal">
            LKR {product.price.toLocaleString()}
            </Typography>
        </CardContent>
        </Card>
    </motion.div>
  );
};

export default ProductCard;
