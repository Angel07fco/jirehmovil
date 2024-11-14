import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { ArrowLeftIcon, CalendarIcon } from "../../components/ui/Icons";
import { useRouter } from "expo-router";
import { obtenerInfoUser } from "../../lib/auth";
import { getCitasPorOpinar } from "../../lib/citas";
import { feedbackPostCita } from "../../lib/feedback";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker"; // Importar el Picker

export default function CitasPorOpinar() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [citasProximas, setCitasProximas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  // States para el formulario de feedback
  const [pregunta1, setPregunta1] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);
  const [pregunta3, setPregunta3] = useState(0);
  const [comentarios, setComentarios] = useState("");
  const [responseErrors, setResponseErrors] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");

  // Función para obtener el usuario desde AsyncStorage
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo);
        return userInfo;
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
    return null;
  };

  // Función para obtener citas que esperan opinión
  const fetchCitasPorOpinar = async () => {
    try {
      setLoading(true);
      const userInfo = await fetchUser();
      if (userInfo?.id) {
        const { success, citasRealizadas } = await getCitasPorOpinar(
          userInfo.id
        );
        if (success && Array.isArray(citasRealizadas)) {
          setCitasProximas(citasRealizadas);
        } else {
          setCitasProximas([]);
        }
      }
    } catch (error) {
      console.error("Error al obtener citas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitasPorOpinar();
  }, []);

  // Función para abrir el modal
  const openModal = (cita) => {
    setCitaSeleccionada(cita);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setCitaSeleccionada(null);
  };

  // Función para manejar el envío del formulario
  const handleSubmitFeedback = async () => {
    if (pregunta1 === 0 || pregunta2 === 0 || pregunta3 === 0) {
      setResponseErrors("Por favor, responde todas las preguntas.");
      return;
    }

    const feedbackData = {
      userId: user?.id,
      citaId: citaSeleccionada?._id,
      pregunta1,
      pregunta2,
      pregunta3,
      comentarios,
    };

    const data = {
      opinionUsuario: true,
    };

    try {
      const { success, message } = await feedbackPostCita(
        feedbackData,
        citaSeleccionada?._id,
        data
      );

      if (success) {
        setResponseSuccess(message);
        setResponseErrors("");
        setPregunta1(0);
        setPregunta2(0);
        setPregunta3(0);
        setComentarios("");
        fetchCitasPorOpinar();
        closeModal();
      } else {
        setResponseErrors(message || "Hubo un error al enviar tu feedback.");
      }
    } catch (error) {
      setResponseErrors("Error al enviar el feedback. Intenta nuevamente.");
    }
  };

  return (
    <View className="w-full flex-1">
      {/* Header */}
      <View className="bg-secondaryBlue flex-row items-center w-full h-20">
        <TouchableOpacity
          onPress={() => router.push("/cuenta/historialcitas")}
          className="ml-4"
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <Text className="text-primaryBlue font-bold text-2xl ml-5">
          Citas que esperan tu opinión
        </Text>
      </View>

      <View className="w-full mt-10 px-4">
        {loading ? (
          <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
            Cargando citas...
          </Text>
        ) : citasProximas?.length > 0 ? (
          citasProximas.map((cita) => (
            <View
              key={cita._id}
              className="w-full p-2 border border-gray-400 bg-fondoApp rounded-lg mb-4"
            >
              <View className="flex-row items-center">
                <Image
                  source={{ uri: cita.mascota?.img }}
                  className="w-20 h-20 ml-2 rounded-full"
                />
                <View className="ml-4 flex-1">
                  <Text className="text-secondaryBlue text-base font-bold">
                    Servicio: {cita.servicio?.name}
                  </Text>
                  <Text className="text-secondaryBlue">
                    Fecha: {cita.fecha} a las {cita.hora}
                  </Text>
                  <TouchableOpacity
                    onPress={() => openModal(cita)}
                    className="w-full bg-secondaryBlue py-2 mt-2 rounded-md"
                  >
                    <Text className="text-primaryBlue font-bold text-center">
                      Opinar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View className="w-full flex-1 justify-center items-center">
            <CalendarIcon size={36} />
            <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
              No encontramos ninguna cita.
            </Text>
          </View>
        )}
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
                1. ¿Qué tan satisfecho estás con la atención recibida?
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
              <Text>2. ¿La explicación del diagnóstico fue clara?</Text>
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
                3. ¿Qué tan satisfecho estás con la experiencia general?
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
                value={comentarios}
                onChangeText={setComentarios}
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
    </View>
  );
}
