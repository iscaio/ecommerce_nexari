import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Tag, ShoppingCart, LogOut } from "lucide-react-native";
import api from "../services/api"; // Certifique-se que o caminho está correto

export default function PromotionsScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      const response = await api.get("/products/promotions");
      setProducts(response.data);
    } catch (error) {
      console.log("Erro ao buscar produtos:", error);
      Alert.alert("Erro", "Não foi possível carregar as promoções.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = await AsyncStorage.getItem("@token");

      if (!token) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        return router.replace("/");
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await api.post(
        "/cart/add",
        {
          productId: product._id || product.id,
          quantity: 1,
        },
        config
      );

      Alert.alert("Sucesso", `${product.name} adicionado ao carrinho! 🛒`);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Falha ao adicionar ao carrinho.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/");
  };

  const renderProduct = ({ item }) => (
    <View className="flex-1 bg-slate-900 border border-slate-800 m-2 rounded-xl overflow-hidden shadow-sm">
      <View className="h-40 bg-slate-800 relative">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {item.discount && (
          <View className="absolute top-2 right-2 bg-pink-600 px-2 py-1 rounded-md">
            <Text className="text-white text-xs font-bold">
              -{item.discount}%
            </Text>
          </View>
        )}
      </View>

      <View className="p-3">
        <Text
          className="text-white font-bold text-sm mb-1 h-10"
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View className="flex-row items-end gap-2 mb-3">
          <Text className="text-indigo-400 font-bold text-lg">
            R$ {item.price.toFixed(0)}
          </Text>
          {item.oldPrice && (
            <Text className="text-slate-500 text-xs line-through mb-1">
              R$ {item.oldPrice.toFixed(0)}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className="bg-indigo-600 py-2 rounded-lg flex-row justify-center items-center active:bg-indigo-700"
          onPress={() => handleAddToCart(item)}
        >
          <ShoppingCart size={14} color="white" style={{ marginRight: 6 }} />
          <Text className="text-white font-bold text-xs uppercase">
            Comprar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-slate-950 pt-12 px-2">
      <View className="flex-row justify-between items-center mb-6 px-2 pb-4 border-b border-slate-800">
        <View>
          <View className="flex-row items-center gap-2 mb-1">
            <Tag color="#ec4899" size={16} />
            <Text className="text-pink-500 font-bold uppercase tracking-widest text-xs">
              Black Friday
            </Text>
          </View>
          <Text className="text-white text-2xl font-bold">NEXARI Store</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-slate-800 p-3 rounded-full border border-slate-700 active:bg-slate-700"
        >
          <LogOut color="#ef4444" size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4f46e5" />
          <Text className="text-slate-500 mt-4">Buscando ofertas...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id || item.id}
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="items-center mt-20">
              <Tag size={48} color="#334155" />
              <Text className="text-slate-500 mt-4">
                Nenhuma promoção ativa.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
