import {
  View,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { Input } from "../../components/ui/Inputs/Input";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getServices } from "../../lib/services";
import { useEffect, useState } from "react";
import { obtenerInfoUser } from "../../lib/auth";
import { addNewCita } from "../../lib/citas";
import { feedbackFunction } from "../../lib/feedback";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

export default function citatres() {
  const router = useRouter();
  const { medico, fecha, hora, mascotaId } = useLocalSearchParams();
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedServicioId, setSelectedServicioId] = useState(null);
  const [comentarios, setComentarios] = useState("");
  const [user, setUser] = useState(null);

  const [pregunta1, setPregunta1] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);
  const [pregunta3, setPregunta3] = useState(0);
  const [responseErrors, setResponseErrors] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const [idCita, setIdCita] = useState("");

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo.id);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchServices();
    fetchUser();
  }, []);

  const handleAgendarCita = async () => {
    // Validación
    if (!selectedServicioId) {
      Alert.alert("Error", "Por favor, seleccione un servicio.");
      return;
    }

    if (!comentarios.trim()) {
      Alert.alert("Error", "Por favor, ingrese algún comentario.");
      return;
    }

    try {
      const data = {
        usuario: user,
        medico: medico,
        fecha: fecha,
        hora: hora,
        servicio: selectedServicioId,
        mascota: mascotaId,
        comentarios: comentarios,
      };

      console.log("Datos enviados:", data); // Verifica que los datos sean correctos
      const result = await addNewCita(data);

      setIdCita(result.idCita);

      if (result.success) {
        openModal();
      } else {
        Alert.alert("Error", result.msg);
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al agendar la cita");
    } finally {
      setLoading(false);
    }
  };

  // Función para abrir el modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    router.push("/cuenta/historialcitas");
  };

  const handleSelect = (pregunta, valor) => {
    if (pregunta === 1) setPregunta1(valor);
    else if (pregunta === 2) setPregunta2(valor);
    else if (pregunta === 3) setPregunta3(valor);
  };

  const handleSubmitFeedback = async () => {
    if (pregunta1 === 0 || pregunta2 === 0 || pregunta3 === 0) {
      setResponseErrors("Por favor, responde todas las preguntas.");
      return;
    }

    const feedbackData = {
      userId: user,
      citaId: idCita,
      dispositivo: "movil",
      pregunta1,
      pregunta2,
      pregunta3,
    };

    try {
      const { success, message } = await feedbackFunction(feedbackData);

      if (success) {
        setResponseSuccess(message);
        setResponseErrors("");
        setPregunta1(0);
        setPregunta2(0);
        setPregunta3(0);
        router.push("/cuenta/historialcitas");
      } else {
        setResponseErrors(message || "Hubo un error al enviar tu feedback.");
      }
    } catch (error) {
      setResponseErrors("Error al enviar el feedback. Intenta nuevamente.");
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

          <View className="mt-10 mb-5">
            <Button onPress={handleAgendarCita}>Agendar cita</Button>
          </View>

          <View className="flex-row items-center justify-between">
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
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="w-11/12 p-5 bg-white rounded-lg">
              <Text className="text-secondaryBlue font-bold text-center text-lg mb-4">
                Evaluación de satisfacción
              </Text>

              <View className="mb-4">
                <Text>
                  ¿Qué tan fácil fue el proceso de "agendar una cita"?
                </Text>
                <View className="w-full flex-row items-center justify-between px-4 mt-3">
                  {[
                    { label: "Fácil", emoji: "😃", value: 1 },
                    { label: "Regular", emoji: "😐", value: 2 },
                    { label: "Difícil", emoji: "😕", value: 3 },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => handleSelect(1, item.value)}
                      className={`cursor-pointer rounded-lg p-1 ${
                        pregunta1 === item.value
                          ? "bg-secondaryBlue"
                          : "bg-primaryBlue"
                      }`}
                    >
                      <Text className="text-center text-4xl mb-1">
                        {item.emoji}
                      </Text>
                      <Text
                        className={`text-center text-sm font-bold ${
                          pregunta1 === item.value
                            ? "text-primaryBlue"
                            : "text-secondaryBlue"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="mb-4">
                <Text>
                  ¿Encontraste toda la información que necesitabas para "agendar
                  tu cita"?
                </Text>
                <View className="w-full flex-row items-center justify-between px-4 mt-3">
                  {[
                    { label: "Sí", emoji: "😃", value: 1 },
                    { label: "No", emoji: "😕", value: 2 },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => handleSelect(2, item.value)}
                      className={`cursor-pointer rounded-lg p-1 ${
                        pregunta2 === item.value
                          ? "bg-secondaryBlue"
                          : "bg-primaryBlue"
                      }`}
                    >
                      <Text className="text-center text-4xl mb-1">
                        {item.emoji}
                      </Text>
                      <Text
                        className={`text-center text-sm font-bold ${
                          pregunta2 === item.value
                            ? "text-primaryBlue"
                            : "text-secondaryBlue"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View className="mb-4">
                <Text>
                  ¿Cómo calificarías tu satisfacción general con el proceso de
                  "agendar una cita"?
                </Text>
                <View className="w-full flex-row items-center justify-between px-4 mt-3">
                  {[
                    { label: "Buena", emoji: "😃", value: 1 },
                    { label: "Neutral", emoji: "😐", value: 2 },
                    { label: "Mala", emoji: "😕", value: 3 },
                  ].map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      onPress={() => handleSelect(3, item.value)}
                      className={`cursor-pointer rounded-lg p-1 ${
                        pregunta3 === item.value
                          ? "bg-secondaryBlue"
                          : "bg-primaryBlue"
                      }`}
                    >
                      <Text className="text-center text-4xl mb-1">
                        {item.emoji}
                      </Text>
                      <Text
                        className={`text-center text-sm font-bold ${
                          pregunta3 === item.value
                            ? "text-primaryBlue"
                            : "text-secondaryBlue"
                        }`}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <Text className="text-red-500 text-center">{responseErrors}</Text>
              <Text className="text-green-500 text-center">
                {responseSuccess}
              </Text>

              <TouchableOpacity
                onPress={handleSubmitFeedback}
                className="w-full bg-secondaryBlue py-2 rounded-md mt-4"
              >
                <Text className="text-primaryBlue font-bold text-center">
                  Enviar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeModal}
                className="w-full bg-red-500 py-2 rounded-md mt-4"
              >
                <Text className="text-primaryBlue font-bold text-center">
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Screen>
  );
}
