import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { TitleText } from "../ui/Text";
import { verifyAccount } from "../../lib/auth";
import { useRouter } from "expo-router";

const ConfirmarCuenta = ({ email }) => {
  const [formData, setFormData] = useState({ email, otp: "" });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("loading");

  const router = useRouter();

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validación de código
    const validationErrors = {};
    const regexCode = /^\d{4}$/;

    if (!formData.otp.trim()) {
      validationErrors.otp = "Por favor ingresa tu código.";
    } else if (!regexCode.test(formData.otp.trim())) {
      validationErrors.otp =
        "El código debe ser de exactamente 4 dígitos numéricos.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setShowModal(true);
    setModalMessage("Verificando...");
    setModalStatus("loading");

    try {
      const result = await verifyAccount(formData);

      if (result.error) {
        setModalStatus("error");
        setModalMessage(`Error: ${result.error}`);
        setFormData((prev) => ({ ...prev, otp: "" }));
      } else {
        setModalStatus("success");
        setModalMessage("Cuenta verificada exitosamente");
        setTimeout(() => {
          setShowModal(false);
          router.push("/auth/loginScreen");
        }, 1500);
      }
    } catch (error) {
      setModalStatus("error");
      setModalMessage("Error en la verificación de cuenta");
      setFormData((prev) => ({ ...prev, otp: "" })); // Limpia el campo del código
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData((prev) => ({ ...prev, otp: "" })); // Limpia el campo del código
  };

  return (
    <View className="w-full">
      <View>
        <TitleText style="text-center">Activar mi cuenta</TitleText>
        <Text
          className="font-bold text-base mb-4"
          style={{ textDecorationLine: "underline" }}
        >
          {email}
        </Text>
        <View>
          <Label>Código</Label>
          <Input
            value={formData.otp}
            onChangeText={(value) => handleChange("otp", value)}
            placeholder="Ingrese su código de 4 dígitos"
            keyboardType="numeric"
          />
          {errors.otp && <Text className="text-red-500">{errors.otp}</Text>}
        </View>

        <View className="mt-6">
          <Button onPress={handleSubmit}>Confirmar</Button>
        </View>
      </View>

      <CustomModal
        visible={showModal}
        onClose={closeModal}
        status={modalStatus}
      >
        <Text className="text-xl font-semibold mb-4">{modalMessage}</Text>
      </CustomModal>
    </View>
  );
};

export default ConfirmarCuenta;
