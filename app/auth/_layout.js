import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="citauno" options={{ title: "Cita1" }} />
      <Stack.Screen name="citados" options={{ title: "Cita2" }} />
      <Stack.Screen name="citatres" options={{ title: "Cita3" }} />
      <Stack.Screen name="loginScreen" options={{ title: "Login" }} />
      <Stack.Screen name="registerScreen" options={{ title: "Registro" }} />
      <Stack.Screen name="detallesScreen" options={{ title: "Detalles" }} />
    </Stack>
  );
}
