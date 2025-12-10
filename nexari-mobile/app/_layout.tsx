import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      {/* Deixa a barra de status do celular branca/clara */}
      <StatusBar style="light" />

      {/* Configura as telas */}
      <Stack screenOptions={{ headerShown: false }}>
        {/* Tela de Login (index) */}
        <Stack.Screen name="index" />

        {/* Tela de Promoções */}
        <Stack.Screen name="promotions" />
      </Stack>
    </>
  );
}
