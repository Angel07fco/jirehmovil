import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { Input } from "../../components/ui/Inputs/Input";
import { useRouter, useLocalSearchParams } from "expo-router";
import { obtenerInfoUser } from "../../lib/auth";
import { addNewCita } from "../../lib/citas";
import { getServices } from "../../lib/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedbackModal from "../../components/ui/FeedbackModal";

export default function citatres() {
  const router = useRouter();
  const { medico, fecha, hora, mascotaId } = useLocalSearchParams();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServicioId, setSelectedServicioId] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [user, setUser] = useState(null);
  const [isFeedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [idCita, setIdCita] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      if (!data.error) {
        setServicios(data);
      } else {
        console.error("Error fetching services:", data.error);
      }
      setLoading(false);
    };

    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userEmail");
        if (token) {
          const userInfo = await obtenerInfoUser(token);
          setUser(userInfo);
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchServices();
    fetchUser();
  }, []);

  const handleAgendarCita = async () => {
    if (!selectedServicioId) {
      Alert.alert("Error", "Por favor, seleccione un servicio.");
      return;
    }

    if (!comentarios.trim()) {
      Alert.alert("Error", "Por favor, ingrese algún comentario.");
      return;
    }

    setLoading(true);

    try {
      const data = {
        usuario: user?.id,
        medico: medico,
        fecha: fecha,
        hora: hora,
        servicio: selectedServicioId,
        mascota: mascotaId,
        comentarios: comentarios,
      };

      const result = await addNewCita(data);

      if (result.success) {
        setIdCita(result.idCita);

        // Verificar feedbackCheck después de crear la cita
        const token = await AsyncStorage.getItem("userEmail");
        const userInfo = await obtenerInfoUser(token);

        if (!userInfo.feedbackCheck) {
          setFeedbackModalVisible(true);
        } else {
          Alert.alert("Su cita", result.message);
          router.push("/cuenta/historialcitas");
        }
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al agendar la cita");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={3} />

          <TitleText>Seleccione el servicio:</TitleText>
          {servicios.length === 0 ? (
            <Text>No se encontraron servicios disponibles.</Text>
          ) : (
            servicios.map((servicio) => (
              <CardCita
                key={servicio._id}
                imagenUri={servicio.img}
                onPress={() => setSelectedServicioId(servicio._id)}
                isSelected={selectedServicioId === servicio._id}
              >
                <TitleText style="mb-2">{servicio.name}</TitleText>
              </CardCita>
            ))
          )}

          <TitleText style="mt-6">Comentarios:</TitleText>
          <Input
            placeholder="Ingrese sus comentarios aquí"
            value={comentarios}
            onChangeText={(text) => setComentarios(text)}
          />

          <View className="mt-10">
            <Button onPress={handleAgendarCita}>Agendar cita</Button>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3 mb-6">
          <View className="w-[40%]">
            <Button
              onPress={() => router.back()}
              style="border border-secondaryBlue bg-fondoApp"
              style2="text-secondaryBlue"
            >
              Anterior
            </Button>
          </View>
          <View className="w-[40%]">
            <Button onPress={() => router.push("/citas")}>Cancelar</Button>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Feedback */}
      <FeedbackModal
        visible={isFeedbackModalVisible}
        onClose={() => {
          setFeedbackModalVisible(false);
          router.push("/cuenta/historialcitas");
        }}
        userId={user?.id}
      />
    </Screen>
  );
}
