'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Product } from '../lib/marketplace';

type CartItem = { product: Product; quantity: number };

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('zentro_cart');
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem('zentro_cart', JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => {
    const addToCart = (product: Product) => {
      setItems((prev) => {
        const existing = prev.find((it) => it.product.id === product.id);
        if (existing) {
          return prev.map((it) => (it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it));
        }
        return [...prev, { product, quantity: 1 }];
      });
    };

    const removeFromCart = (productId: string) => setItems((prev) => prev.filter((it) => it.product.id !== productId));
    const updateQuantity = (productId: string, quantity: number) =>
      setItems((prev) => prev.map((it) => (it.product.id === productId ? { ...it, quantity: Math.max(1, quantity) } : it)));

    const clearCart = () => setItems([]);
    const total = items.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
    const count = items.reduce((acc, it) => acc + it.quantity, 0);

    return { items, addToCart, removeFromCart, updateQuantity, clearCart, total, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
