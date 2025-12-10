import React, { useEffect, useState } from "react"; // Adicionei useEffect e useState
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Importando a API
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Package,
  Calendar,
  CreditCard,
  ShoppingBag,
  Loader2,
} from "lucide-react";

const Orders = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Estados para dados reais
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar pedidos assim que a tela abre
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Faça login para ver seus pedidos
          </h2>
          <p className="text-gray-600 mb-8">
            Acesse sua conta para visualizar o histórico de compras
          </p>
          <Button onClick={() => navigate("/login")} size="lg">
            Fazer Login
          </Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-700 border-green-200";
      case "Em trânsito":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Processando":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Cancelado":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Meus Pedidos
          </h1>
          <p className="text-gray-600">
            Acompanhe seus pedidos e histórico de compras
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum pedido ainda
            </h2>
            <p className="text-gray-600 mb-6">
              Comece a comprar para ver seus pedidos aqui
            </p>
            <Button onClick={() => navigate("/")}>Explorar Produtos</Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="border-b bg-gray-50">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-lg mb-2">
                        Pedido #{order.id.substring(0, 8).toUpperCase()}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.createdAt).toLocaleDateString(
                            "pt-BR"
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          R$ {order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                          {/* Tenta mostrar imagem, se não tiver mostra ícone */}
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {item.name}
                          </h4>
                          <div className="flex gap-4 text-sm text-gray-600 mt-1">
                            <span>Tamanho: {item.size}</span>
                            <span>Cor: {item.color}</span>
                            <span>Qtd: {item.quantity}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            R$ {item.price.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">unitário</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t">
                    <Button variant="outline">Rastrear Pedido</Button>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total do Pedido</p>
                      <p className="text-2xl font-bold text-teal-600">
                        R$ {order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
