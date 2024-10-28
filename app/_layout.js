import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // Desactivar encabezado
        drawerType: "front",
        gestureEnabled: false, // Desactivar apertura mediante gesto
      }}
    >
      <Drawer.Screen name="index" options={{ title: "Inicio" }} />
      <Drawer.Screen name="serviciosScreen" options={{ title: "Servicios" }} />
      <Drawer.Screen name="cuenta" options={{ title: "Mi Cuenta" }} />
      <Drawer.Screen name="citas" options={{ title: "Citas" }} />
      <Drawer.Screen name="auth" options={{ title: "Contacto" }} />
      <Drawer.Screen name="nosotros" options={{ title: "¿Quiénes somos?" }} />
    </Drawer>
  );
}
