import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Home,
  Tag,
  Package,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Button } from "./ui/button";

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/promotions", label: "Promoções", icon: Tag },
    { path: "/pedidos", label: "Pedidos", icon: Package },
    {
      path: "/carrinho",
      label: "Carrinho",
      icon: ShoppingCart,
      badge: getCartCount(),
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-indigo-500/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-lg 
              flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300"
              >
                <Zap className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg blur-md 
              opacity-0 group-hover:opacity-50 transition-opacity duration-300"
              ></div>
            </div>
            <span className="text-2xl font-bold gradient-text mono">
              NEXARI
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`relative smooth-transition ${
                      isActive(item.path)
                        ? "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                        : "text-gray-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center neon-glow">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}

            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <span className="text-sm text-gray-400">
                  Olá,{" "}
                  <span className="text-cyan-400 font-semibold">
                    {user.name}
                  </span>
                </span>
                <Button
                  variant="outline"
                  onClick={logout}
                  className="border-indigo-500/50 text-indigo-400 hover:bg-indigo-500/10"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login" className="ml-4">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 btn-glow">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-indigo-500/20">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-indigo-500/20 text-indigo-400"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span className="ml-auto bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            {user ? (
              <div className="pt-3 border-t border-indigo-500/20">
                <p className="text-sm text-gray-400 px-4 mb-2">
                  Olá,{" "}
                  <span className="text-cyan-400 font-semibold">
                    {user.name}
                  </span>
                </p>
                <Button
                  variant="outline"
                  className="w-full border-indigo-500/50 text-indigo-400"
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
