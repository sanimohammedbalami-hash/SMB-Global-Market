import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import * as cartService from '../services/cartService';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { profile } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!profile) {
      setItems([]);
      return;
    }
    setLoading(true);
    try {
      const data = await cartService.getCart(profile.id);
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addItem(productId, quantity = 1) {
    if (!profile) throw new Error('Must be signed in to add to cart');
    await cartService.addToCart(profile.id, productId, quantity);
    await refresh();
  }

  async function updateQuantity(cartItemId, quantity) {
    await cartService.updateCartQuantity(cartItemId, quantity);
    await refresh();
  }

  async function removeItem(cartItemId) {
    await cartService.removeFromCart(cartItemId);
    await refresh();
  }

  return (
    <CartContext.Provider value={{ items, loading, addItem, updateQuantity, removeItem, refresh }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
