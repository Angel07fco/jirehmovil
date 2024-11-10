import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerInfoUser, updateUserData } from "../../lib/auth";
import { TitleText } from "../../components/ui/Text";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function Seguridad() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [errorQuestion, setErrorQuestion] = useState("");
  const [errorAnswer, setErrorAnswer] = useState("");

  const questions = [
    "¿Cuál es el nombre de tu mascota favorita?",
    "¿Cuál es tu película favorita?",
    "¿Cuál es tu comida favorita?",
    "¿Cuál es tu deporte favorito?",
    "¿Cuál es tu color favorito?",
  ];

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

  const validateForm = () => {
    let valid = true;
    if (!selectedQuestion) {
      setErrorQuestion("Debe seleccionar una pregunta secreta.");
      valid = false;
    } else {
      setErrorQuestion("");
    }

    if (answer.trim().length < 3) {
      setErrorAnswer("La respuesta debe tener al menos 3 caracteres.");
      valid = false;
    } else {
      setErrorAnswer("");
    }

    return valid;
  };

  const handleUpdateQuestionAndAnswer = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Preparamos los datos para actualizar
      const updateData = {
        question_secret: selectedQuestion,
        reply_secret: answer,
      };

      const userId = user?.id; // Obtener el ID del usuario
      if (!userId) {
        Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        return;
      }

      // Realizamos la actualización
      const result = await updateUserData({ userId, updateData });

      if (result.success) {
        Alert.alert("Éxito", result.message || "Pregunta secreta actualizada.");
        setUser({ ...user, question: selectedQuestion }); // Actualizar el estado local
        setIsEditing(false);
        setSelectedQuestion("");
        setAnswer("");
      } else {
        Alert.alert(
          "Error",
          result.error || "No se pudo actualizar el usuario."
        );
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "Ocurrió un problema al actualizar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedQuestion("");
    setAnswer("");
    setErrorQuestion("");
    setErrorAnswer("");
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="w-full">
      <View className="bg-secondaryBlue flex items-center justify-center w-full h-20">
        <Text className="text-primaryBlue font-bold text-2xl">
          Seguridad y contraseñas
        </Text>
      </View>

      <View className="px-6 mt-10">
        <View className="flex-row items-center justify-between">
          <Text className="text-secondaryBlue">Contraseña</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/auth/updatePasswordScreen",
                params: { email: user?.email },
              })
            }
          >
            <Text className="text-secondaryBlue underline">
              Cambiar mi contraseña
            </Text>
          </TouchableOpacity>
        </View>
        <TitleText>********</TitleText>

        <View className="mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-secondaryBlue">Pregunta</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text className="text-secondaryBlue underline">
                Cambiar mi pregunta y respuesta
              </Text>
            </TouchableOpacity>
          </View>

          {isEditing ? (
            <View>
              <Text className="text-secondaryBlue">
                Selecciona una pregunta:
              </Text>
              <Picker
                selectedValue={selectedQuestion}
                onValueChange={(itemValue) => setSelectedQuestion(itemValue)}
                style={{ height: 50, marginVertical: 10 }}
              >
                <Picker.Item label="Selecciona una pregunta" value="" />
                {questions.map((question, index) => (
                  <Picker.Item key={index} label={question} value={question} />
                ))}
              </Picker>
              {errorQuestion ? (
                <Text className="text-red-500">{errorQuestion}</Text>
              ) : null}

              <Text className="text-secondaryBlue mt-2">Respuesta:</Text>
              <TextInput
                placeholder="Ingresa tu respuesta"
                value={answer}
                onChangeText={setAnswer}
                className="border rounded p-2 mb-1 text-secondaryBlue"
              />
              {errorAnswer ? (
                <Text className="text-red-500">{errorAnswer}</Text>
              ) : null}

              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  onPress={handleUpdateQuestionAndAnswer}
                  className="bg-secondaryBlue rounded p-3 flex-1 mr-2"
                >
                  <Text className="text-white text-center">
                    Guardar cambios
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancel}
                  className="bg-red-500 rounded p-3 flex-1 ml-2"
                >
                  <Text className="text-white text-center">Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <TitleText>
                {user?.question || "Aún no ha ingresado una pregunta secreta"}
              </TitleText>

              <Text className="text-secondaryBlue mt-2">Respuesta</Text>
              <TitleText>*******</TitleText>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
