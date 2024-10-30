import { Tabs } from "expo-router";
import {
  PerfilIcon,
  MascotasIcon,
  HistorialCitasIcon,
} from "../../components/ui/Icons";

export default function CuentaTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue", // Color del icono activo
        tabBarInactiveTintColor: "gray", // Color del icono inactivo
        tabBarStyle: {
          backgroundColor: "white", // Fondo de las tabs
          paddingVertical: 5, // Ajuste vertical de los íconos
          height: 60, // Altura de la barra de pestañas
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      }}
    >
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <PerfilIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="mascotas"
        options={{
          title: "Mascotas",
          tabBarIcon: ({ color, size }) => (
            <MascotasIcon color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="historialcitas"
        options={{
          title: "Historial de citas",
          tabBarIcon: ({ color, size }) => (
            <HistorialCitasIcon color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
