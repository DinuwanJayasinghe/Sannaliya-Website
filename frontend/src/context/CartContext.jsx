import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, selectedImage) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
        );
      }
      return [...prev, { ...product, size, selectedImage, quantity: 1 }];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalWeight = cartItems.reduce((acc, item) => acc + (item.weight * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, subtotal, totalWeight }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
