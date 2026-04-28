import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CutPreference } from "@workspace/api-client-react";

export interface CartItem {
  fishId: string;
  name: string;
  emoji: string;
  pricePerKg: number;
  quantityKg: number;
  cut: CutPreference;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (fishId: string, cut: CutPreference) => void;
  updateQuantity: (fishId: string, cut: CutPreference, quantityKg: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("fishyspot-cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("fishyspot-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.fishId === newItem.fishId && i.cut === newItem.cut);
      if (existing) {
        return prev.map(i => 
          i === existing ? { ...i, quantityKg: i.quantityKg + newItem.quantityKg } : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (fishId: string, cut: CutPreference) => {
    setItems(prev => prev.filter(i => !(i.fishId === fishId && i.cut === cut)));
  };

  const updateQuantity = (fishId: string, cut: CutPreference, quantityKg: number) => {
    if (quantityKg <= 0) {
      removeItem(fishId, cut);
      return;
    }
    setItems(prev => prev.map(i => 
      (i.fishId === fishId && i.cut === cut) ? { ...i, quantityKg } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + 1, 0); // Count of unique items, or could be sum of quantities. Let's do distinct lines.
  const subtotal = items.reduce((acc, item) => acc + (item.pricePerKg * item.quantityKg), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}