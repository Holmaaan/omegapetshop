import React, { createContext, useState, useContext } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Asegúrate de que el hook de autenticación esté importado

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { isAuthenticated } = useAuth(); // Asegúrate de que el estado de autenticación esté disponible

  const addToCart = (product) => {
    if (isAuthenticated) { // Verifica si el usuario está autenticado
      setCart((prevCart) => [...prevCart, product]);
    } else {
      alert('Debes estar registrado para agregar productos al carrito.');
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(product => product.id !== productId));
  };

  const getCartCount = () => cart.length;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
