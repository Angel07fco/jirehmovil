import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerInfoUser } from "../../lib/auth";
import { TitleText } from "../../components/ui/Text";
import { ArrowLeftIcon } from "../../components/ui/Icons";
import { useRouter } from "expo-router";

export default function infoCuenta() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View className="w-full">
      <View className="bg-secondaryBlue flex-row items-center w-full h-20">
        <TouchableOpacity
          onPress={() => router.push("/cuenta/perfil")}
          className="ml-4"
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <Text className="text-primaryBlue font-bold text-2xl ml-5">
          Información de la cuenta
        </Text>
      </View>

      <View className="px-6 mt-10">
        <Text className="text-secondaryBlue">Usuario</Text>
        <TitleText>{user?.user || "Sin datos para Usuario"}</TitleText>

        <Text className="text-secondaryBlue">Correo electrónico</Text>
        <TitleText>
          {user?.email || "Sin datos para Correo electrónico"}
        </TitleText>

        <Text className="text-secondaryBlue">Teléfono</Text>
        <TitleText>{user?.phone || "Sin datos para Teléfono"}</TitleText>

        <Text className="text-secondaryBlue">
          Fecha de creación de la cuenta
        </Text>
        <TitleText>
          {user?.isCreated || "Sin datos para creación de cuenta"}
        </TitleText>

        <Text className="text-secondaryBlue">Último inicio de sesión</Text>
        <TitleText>
          {user?.isLoggin || "Sin datos para Ultimo inicio de sesión"}
        </TitleText>
      </View>
    </View>
  );
}
