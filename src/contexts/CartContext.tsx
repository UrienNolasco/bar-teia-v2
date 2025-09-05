"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { ProductCategory } from "@prisma/client";
import { useAuth } from "@/hooks/useAuth";

interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
  category: ProductCategory;
  stock: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { requireAuth } = useAuth();

  const addToCart = (product: Product) => {
    requireAuth(() => {
      setItems((prevItems) => {
        const existingItem = prevItems.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevItems, { product, quantity: 1 }];
        }
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
        clearCart,
      }}
    >
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
