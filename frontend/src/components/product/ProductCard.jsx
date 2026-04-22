import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Rating, Tooltip, useTheme } from '@mui/material';
import { ShoppingBagOutlined, FavoriteBorder, VisibilityOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const { addToCart } = useCart();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0].size : 'M';
    addToCart(product, defaultSize, product.mainImageUrl);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card
        className="h-full flex flex-col group relative overflow-hidden bg-white dark:bg-slate-900 border-none rounded-3xl"
        elevation={0}
      >
        <Box className="relative overflow-hidden aspect-[3/4]">
          <Link to={`/product/${product.id}`}>
            <CardMedia
              component="img"
              image={product.mainImageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </Link>

          {product.isNewArrival && (
            <Chip
              label="NEW"
              className="absolute top-4 left-4 bg-primary text-white font-bold text-[10px] rounded-lg"
              size="small"
            />
          )}

          {/* Action Overlay */}
          <Box className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <Tooltip title="Quick Add">
                <IconButton
                    onClick={handleQuickAdd}
                    className="bg-white hover:bg-primary hover:text-white text-slate-900 shadow-xl scale-0 group-hover:scale-100 transition-all delay-75"
                >
                    <ShoppingBagOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip title="View Details">
                <IconButton
                    component={Link} to={`/product/${product.id}`}
                    className="bg-white hover:bg-primary hover:text-white text-slate-900 shadow-xl scale-0 group-hover:scale-100 transition-all delay-100"
                >
                    <VisibilityOutlined />
                </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <CardContent className="flex-grow p-5">
          <Typography variant="caption" className="text-primary font-bold tracking-widest uppercase mb-1 block">
            {product.category}
          </Typography>
          <Link to={`/product/${product.id}`} className="no-underline">
            <Typography variant="h6" className="font-serif font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 hover:text-primary transition-colors">
                {product.name}
            </Typography>
          </Link>

          <Box className="flex items-center mb-3">
            <Rating value={product.averageRating || 4.5} readOnly size="small" precision={0.5} />
            <Typography variant="caption" className="ml-1 text-slate-400">
              ({product.reviews?.length || 0})
            </Typography>
          </Box>

          <Box className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold text-slate-900 dark:text-white">
                LKR {product.price.toLocaleString()}
            </Typography>
            <IconButton size="small" className="text-slate-400 hover:text-red-500">
                <FavoriteBorder fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
