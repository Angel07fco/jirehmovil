import { Tabs } from "expo-router";

export default function CuentaTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="perfil" options={{ title: "Perfil" }} />
      <Tabs.Screen name="mascotas" options={{ title: "Mascotas" }} />
      <Tabs.Screen
        name="historialcitas"
        options={{ title: "Historial de citas" }}
      />
    </Tabs>
  );
}
