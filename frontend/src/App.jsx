import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/sonner";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Promotions from "./pages/Promotions";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/carrinho" element={<Cart />} />
              <Route path="/pedidos" element={<Orders />} />
              <Route path="/promotions" element={<Promotions />} />
            </Routes>
          </div>
          <Toaster />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
