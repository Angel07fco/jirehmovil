import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { feedbackFunction } from "../../lib/feedback";

const FeedbackModal = ({ visible, onClose, userId }) => {
  const [pregunta1, setPregunta1] = useState(0);
  const [pregunta2, setPregunta2] = useState(0);
  const [pregunta3, setPregunta3] = useState(0);
  const [responseErrors, setResponseErrors] = useState("");
  const [responseSuccess, setResponseSuccess] = useState("");

  const handleSelect = (pregunta, valor) => {
    if (pregunta === 1) setPregunta1(valor);
    else if (pregunta === 2) setPregunta2(valor);
    else if (pregunta === 3) setPregunta3(valor);
  };

  const handleSubmit = async () => {
    if (pregunta1 === 0 || pregunta2 === 0 || pregunta3 === 0) {
      setResponseErrors("Por favor, responde todas las preguntas.");
      return;
    }

    const feedbackData = {
      userId,
      dispositivo: "movil",
      pregunta1,
      pregunta2,
      pregunta3,
    };

    try {
      const result = await feedbackFunction(feedbackData);
      if (result.success) {
        setResponseSuccess(result.message);
        setResponseErrors("");
        setPregunta1(0);
        setPregunta2(0);
        setPregunta3(0);
        onClose();
      } else {
        setResponseErrors(result.message || "Error al enviar el feedback.");
      }
    } catch (error) {
      setResponseErrors("Error al enviar el feedback. Intenta nuevamente.");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
        <View className="w-11/12 p-5 bg-white rounded-lg">
          <Text className="text-secondaryBlue font-bold text-center text-lg mb-4">
            Evaluación de satisfacción
          </Text>

          {/* Pregunta 1 */}
          <View className="mb-4">
            <Text>¿Qué tan fácil fue el proceso de "agendar una cita"?</Text>
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

          {/* Pregunta 2 */}
          <View className="mb-4">
            <Text>
              ¿Encontraste toda la información que necesitabas para "agendar tu
              cita"?
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

          {/* Pregunta 3 */}
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
          <Text className="text-green-500 text-center">{responseSuccess}</Text>

          <TouchableOpacity
            onPress={handleSubmit}
            className="w-full bg-secondaryBlue py-2 rounded-md mt-4"
          >
            <Text className="text-primaryBlue font-bold text-center">
              Enviar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="w-full bg-red-500 py-2 rounded-md mt-4"
          >
            <Text className="text-primaryBlue font-bold text-center">
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
