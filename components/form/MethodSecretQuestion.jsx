import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { TitleText } from "../ui/Text";
import { useRouter } from "expo-router";

const MethodSecretQuestion = ({ question, expectedAnswer, email }) => {
  const [formData, setFormData] = useState({ answer: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    let validationErrors = {};

    // Validación: el campo no debe estar vacío
    if (!formData.answer.trim()) {
      validationErrors.answer = "Por favor ingresa una respuesta.";
    } else if (formData.answer.trim() !== expectedAnswer.trim()) {
      // Comparar la respuesta ingresada con la respuesta esperada
      validationErrors.answer = "La respuesta no es correcta.";
    }

    if (Object.keys(validationErrors).length === 0) {
      setResponseMessage("Respuesta correcta.");
      setShowModal(true);
      setTimeout(() => {
        // Redirigir a la pantalla de actualización de contraseña
        router.push({
          pathname: "/auth/updatePasswordScreen",
          params: { email },
        });
      }, 1000); // Retraso para mostrar el mensaje antes de redirigir
    } else {
      setErrors(validationErrors);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <View className="w-full">
      <View>
        <TitleText>Recuperación de contraseña</TitleText>
        <Text
          className="font-bold text-base mb-4"
          style={{ textDecorationLine: "underline" }}
        >
          {question || "¿Cuál es el nombre de tu mascota favorita?"}
        </Text>
        <View>
          <Label>Respuesta</Label>
          <Input
            value={formData.answer}
            onChangeText={(value) => handleChange("answer", value)}
            placeholder="Ingrese su respuesta"
          />
          {errors.answer && (
            <Text className="text-red-500">{errors.answer}</Text>
          )}
        </View>

        <View className="mt-4">
          <Button onPress={handleSubmit}>Validar respuesta</Button>
        </View>
      </View>

      <CustomModal visible={showModal} onClose={closeModal}>
        <Text className="text-xl font-semibold mb-4">Resultado</Text>
        <Text>{responseMessage}</Text>
      </CustomModal>
    </View>
  );
};

export default MethodSecretQuestion;
