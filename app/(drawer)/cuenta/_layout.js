import React, { useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import {
  PerfilIcon,
  MascotasIcon,
  HistorialCitasIcon,
} from "../../../components/ui/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, Text } from "react-native";
import { CustomModal } from "../../../components/ui/Modal";

export default function CuentaTabsLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userEmail = await AsyncStorage.getItem("userEmail");
        if (userEmail) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setShowModal(true); // Mostrar el modal si no está autenticado
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error);
        setIsAuthenticated(false);
        setShowModal(true);
      }
    };

    checkAuth();
  }, []);

  const handleModalClose = () => {
    setShowModal(false);
    router.push("/");
  };

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            paddingVertical: 5,
            height: 60,
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

      {/* Modal de autenticación */}
      <CustomModal visible={showModal} onClose={handleModalClose}>
        <Text className="text-xl font-semibold mb-4">
          Debes acceder primero
        </Text>
      </CustomModal>
    </>
  );
}
