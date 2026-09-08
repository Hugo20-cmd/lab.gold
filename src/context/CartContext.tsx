'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, LicenseType } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('labgold_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('labgold_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setCartItems(prev => {
      // Check if item already exists (matching itemType, itemId, and licenseType/size if applicable)
      const existingIndex = prev.findIndex(
        item =>
          item.itemType === newItem.itemType &&
          item.itemId === newItem.itemId &&
          item.licenseType === newItem.licenseType &&
          item.size === newItem.size
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      const generatedId = `${newItem.itemType}-${newItem.itemId}-${newItem.licenseType || 'def'}-${newItem.size || 'def'}-${Date.now()}`;
      return [...prev, { ...newItem, id: generatedId, quantity: 1 }];
    });
    openCart();
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItemsCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
