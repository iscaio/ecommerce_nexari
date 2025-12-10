import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState(() => {
    if (typeof window === "undefined") return [];

    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await api.get("/cart");
      const items = response.data.items || response.data;
      setCart(items);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const addToCart = async (product, size, color, quantity = 1) => {
    if (isAuthenticated) {
      try {
        const response = await api.post("/cart/add", {
          productId: product.id,
          size,
          color,
          quantity,
        });
        setCart(response.data.cart.items);
      } catch (error) {
        console.error("Erro ao adicionar ao carrinho:", error);
        throw error;
      }
    } else {
      const existingItem = cart.find(
        (item) =>
          item.id === product.id && item.size === size && item.color === color
      );

      let newCart;
      if (existingItem) {
        newCart = cart.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [
          ...cart,
          {
            id: product.id,
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size,
            color,
            quantity,
          },
        ];
      }
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const removeFromCart = async (id, size, color) => {
    if (isAuthenticated) {
      try {
        const response = await api.delete("/cart/remove", {
          data: { productId: id, size, color },
        });
        setCart(response.data.items);
      } catch (error) {
        console.error("Erro ao remover do carrinho:", error);
      }
    } else {
      const newCart = cart.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color)
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const updateQuantity = async (id, size, color, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(id, size, color);
      return;
    }

    if (isAuthenticated) {
      try {
        const response = await api.put("/cart/update", {
          productId: id,
          size,
          color,
          quantity,
        });
        setCart(response.data.items);
      } catch (error) {
        console.error("Erro ao atualizar quantidade:", error);
      }
    } else {
      const newCart = cart.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      );
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await api.delete("/cart/clear");
        setCart([]);
      } catch (error) {
        console.error("Erro ao limpar carrinho:", error);
      }
    } else {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal: () => cartTotal,
    getCartCount,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
