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
import { feedbackPostAgendamientoCita } from "../../lib/feedback";
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
  const [comentariosModal, setComentariosModal] = useState("");
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
  };

  // Función para manejar el envío del formulario
  const handleSubmitFeedback = async () => {
    if (pregunta1 === 0 || pregunta2 === 0 || pregunta3 === 0) {
      setResponseErrors("Por favor, responde todas las preguntas.");
      return;
    }

    const feedbackData = {
      userId: user,
      citaId: idCita,
      pregunta1,
      pregunta2,
      pregunta3,
      comentarios: comentariosModal,
    };

    try {
      const { success, message } =
        await feedbackPostAgendamientoCita(feedbackData);

      if (success) {
        setResponseSuccess(message);
        setResponseErrors("");
        setPregunta1(0);
        setPregunta2(0);
        setPregunta3(0);
        setComentariosModal("");
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
                  1. ¿Qué tan fácil fue agendar tu cita a través de la
                  aplicación móvil?
                </Text>
                <Picker
                  selectedValue={pregunta1}
                  onValueChange={(itemValue) => setPregunta1(itemValue)}
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                >
                  <Picker.Item label="Seleccione una respuesta" value="" />
                  <Picker.Item label="Muy insatisfecho" value={1} />
                  <Picker.Item label="Insatisfecho" value={2} />
                  <Picker.Item label="Neutral" value={3} />
                  <Picker.Item label="Satisfecho" value={4} />
                  <Picker.Item label="Muy satisfecho" value={5} />
                </Picker>
              </View>

              <View className="mb-4">
                <Text>
                  2. ¿La información proporcionada durante el proceso de
                  agendamiento fue clara y suficiente?
                </Text>
                <Picker
                  selectedValue={pregunta2}
                  onValueChange={(itemValue) => setPregunta2(itemValue)}
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                >
                  <Picker.Item label="Seleccione una respuesta" value="" />
                  <Picker.Item label="Muy confusa" value={1} />
                  <Picker.Item label="Confusa" value={2} />
                  <Picker.Item label="Neutral" value={3} />
                  <Picker.Item label="Clara" value={4} />
                  <Picker.Item label="Muy clara" value={5} />
                </Picker>
              </View>

              <View className="mb-4">
                <Text>
                  3. ¿Qué tan satisfecho estás con el proceso de agendamiento de
                  cita en general?
                </Text>
                <Picker
                  selectedValue={pregunta3}
                  onValueChange={(itemValue) => setPregunta3(itemValue)}
                  style={{
                    height: 40,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                >
                  <Picker.Item label="Seleccione una respuesta" value="" />
                  <Picker.Item label="Muy insatisfecho" value={1} />
                  <Picker.Item label="Insatisfecho" value={2} />
                  <Picker.Item label="Neutral" value={3} />
                  <Picker.Item label="Satisfecho" value={4} />
                  <Picker.Item label="Muy satisfecho" value={5} />
                </Picker>
              </View>

              <View className="mb-4">
                <Text>Comentarios adicionales:</Text>
                <TextInput
                  className="border border-gray-500 h-20 px-2 text-secondaryBlue"
                  value={comentariosModal}
                  onChangeText={setComentariosModal}
                  multiline
                />
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
