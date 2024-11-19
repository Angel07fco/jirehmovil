import React, { useState } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router"; // Importamos useRouter de expo-router
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import RadioGroup from "../ui/Buttons/RadioGroup";
import { TitleText } from "../ui/Text";
import { forgotPassword } from "../../lib/auth";

// Expresión regular para validar el correo electrónico
const regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

const ForgotPasswordMethod = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [selectedOption, setSelectedOption] = useState(null);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter(); // Usamos el hook useRouter

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let validationErrors = {};

    // Validación del correo electrónico
    if (!formData.email.trim()) {
      validationErrors.email = "Por favor ingresa tu correo electrónico.";
    } else if (!regexEmail.test(formData.email.trim())) {
      validationErrors.email = "El correo electrónico no es válido.";
    }

    // Validación de selección del método de recuperación
    if (!selectedOption) {
      validationErrors.selectedOption =
        "Por favor selecciona un método de recuperación.";
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await forgotPassword({
          email: formData.email,
          indicator: selectedOption === "option1" ? "1" : "2", // Se envía como cadena
        });

        if (response.success) {
          setResponseMessage(response.data.msj);
          setShowModal(true);

          // Redirección basada en el mensaje de respuesta
          if (
            response.data.msj ===
            "Código enviado exitosamente, Comprueba tu bandeja de entrada."
          ) {
            // Redirigir a forgotPasswordCode y enviar el email
            router.push({
              pathname: "/auth/methodCodeScreen",
              params: { email: formData.email },
            });
          } else if (
            response.data.msj === "Ahora puede escribir su respuesta"
          ) {
            router.push({
              pathname: "/auth/methodSecretQuestionScreen",
              params: {
                question_secret:
                  response.data.createdPasswordReset.question_secret,
                reply_secret: response.data.createdPasswordReset.reply_secret,
                email: formData.email,
              },
            });
          }
        } else {
          // En caso de error, limpiar campos y mostrar error
          setFormData({ email: "" });
          setSelectedOption(null);
          setErrors({ submit: response.error });
        }
      } catch (error) {
        setFormData({ email: "" });
        setSelectedOption(null);
        setErrors({
          submit: "Error inesperado en la recuperación de contraseña.",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <View className="w-full">
      <View>
        <TitleText>Recuperación de contraseña</TitleText>
        <View>
          <Label>Correo electrónico</Label>
          <Input
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && <Text className="text-red-500">{errors.email}</Text>}
        </View>

        <RadioGroup onSelect={(option) => setSelectedOption(option)} />
        {errors.selectedOption && (
          <Text className="text-red-500">{errors.selectedOption}</Text>
        )}

        <View className="mt-4">
          <Button onPress={handleSubmit}>Recuperar</Button>
          {errors.submit && (
            <Text className="text-red-500 mt-2">{errors.submit}</Text>
          )}
        </View>
      </View>

      <CustomModal visible={showModal} onClose={closeModal}>
        <Text className="text-xl font-semibold mb-4">
          Recuperación de contraseña
        </Text>
        <Text>{responseMessage}</Text>
      </CustomModal>
    </View>
  );
};

export default ForgotPasswordMethod;
