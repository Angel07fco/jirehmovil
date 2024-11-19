import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import Header from "../../components/Header";
import { TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { CustomModal } from "../../components/ui/Modal";

export default function citas() {
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
          setShowModal(true);
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
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
          <View className="flex items-center">
            <TitleText>¡Estamos listos para recibir a tu mascota!</TitleText>
          </View>
          <Text className="text-secondaryBlue text-lg mb-8">
            Si quieres reservar un espacio para uno de nuestros servicios, por
            favor completa el proceso de “Agendar una cita”.
          </Text>

          <Button onPress={() => router.push("/auth/citauno")}>
            Agendar una cita
          </Button>
        </View>

        {/* Modal de autenticación */}
        <CustomModal visible={showModal} onClose={handleModalClose}>
          <Text className="text-xl font-semibold mb-4">
            Debes acceder primero
          </Text>
        </CustomModal>
      </ScrollView>
    </Screen>
  );
}
