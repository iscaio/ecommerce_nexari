import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Zap, Mail, Lock } from "lucide-react-native";
import api from "../services/api";
import {
  Card,
  Label,
  InputContainer,
  StyledInput,
  Button,
} from "../components/ui";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password)
      return Alert.alert("Erro", "Preencha todos os campos");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      await AsyncStorage.setItem("@token", response.data.access_token);

      // Navegação do Expo Router
      router.replace("/promotions");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-slate-950 justify-center px-6">
      <View className="items-center mb-10">
        <View className="w-20 h-20 bg-indigo-600 rounded-3xl items-center justify-center mb-4 shadow-lg shadow-indigo-500/50">
          <Zap color="white" size={40} fill="white" />
        </View>
        <Text className="text-3xl font-bold text-white">NEXARI</Text>
        <Text className="text-gray-400 mt-2"> Entre com suas credenciais</Text>
      </View>

      <Card>
        <Label>E-mail</Label>
        <InputContainer>
          <Mail size={20} color="#64748b" />
          <StyledInput
            placeholder="seu@email.com"
            placeholderTextColor="#475569"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </InputContainer>

        <Label>Senha</Label>
        <InputContainer>
          <Lock size={20} color="#64748b" />
          <StyledInput
            placeholder="••••••••"
            placeholderTextColor="#475569"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </InputContainer>

        <Button onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : "Entrar"}
        </Button>
      </Card>

      <View className="mt-8 flex-row justify-center">
        <Text className="text-gray-400">Não tem conta? </Text>
        <Text className="text-indigo-400 font-bold">Cadastre-se</Text>
      </View>
    </View>
  );
}
