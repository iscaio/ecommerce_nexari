import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";
import { useToast } from "../hooks/use-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { success, error } = useToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { user: userData, access_token } = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", access_token);

      success({
        title: "Login realizado!",
        description: `Bem-vindo, ${userData.name || "usuário"}!`,
      });
      return { success: true };
    } catch (err) {
      console.error("Erro no login:", err.response?.status, err.response?.data);
      const message =
        err.response?.data?.message ||
        (err.response?.status === 403
          ? "Acesso negado: usuário ou senha incorretos."
          : "Erro ao fazer login. Tente novamente.");
      error({ title: "Falha no login", description: message });
      return { success: false, message };
    }
  };

  // REGISTER
  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { user: userData, access_token } = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", access_token);

      success({
        title: "Cadastro realizado!",
        description: `Bem-vindo, ${userData.name || "usuário"}!`,
      });
      return { success: true };
    } catch (err) {
      console.error(
        "Erro no cadastro:",
        err.response?.status,
        err.response?.data
      );
      const message = err.response?.data?.message || "Erro ao criar conta";
      error({ title: "Falha no cadastro", description: message });
      return { success: false, message };
    }
  };

  const logout = (onSuccess) => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    if (typeof onSuccess === "function") {
      onSuccess({
        title: "Logout realizado",
        description: "Você saiu da conta com sucesso.",
      });
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
