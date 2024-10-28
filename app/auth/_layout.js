import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
      <Stack.Screen name="loginScreen" options={{ title: "Login" }} />
      <Stack.Screen name="registerScreen" options={{ title: "Registro" }} />
      <Stack.Screen name="detallesScreen" options={{ title: "Detalles" }} />
    </Stack>
  );
}
