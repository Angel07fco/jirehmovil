import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { TitleText } from "../ui/Text";
import { verifyAccount } from "../../lib/auth";
import { useRouter } from "expo-router";

const MethodCode = ({ email }) => {
  const [formData, setFormData] = useState({ code: "" });
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
    const validationErrors = {};
    const regexCode = /^\d{4}$/;

    if (!formData.code.trim()) {
      validationErrors.code = "Por favor ingresa tu código.";
    } else if (!regexCode.test(formData.code.trim())) {
      validationErrors.code =
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
      const result = await verifyAccount({ email, otp: formData.code });

      if (result.error) {
        setModalStatus("error");
        setModalMessage(`Error: ${result.error}`);
        setFormData((prev) => ({ ...prev, code: "" }));
      } else {
        setModalStatus("success");
        setModalMessage("Código verificado exitosamente");
        setTimeout(() => {
          setShowModal(false);
          router.push({
            pathname: "/auth/updatePasswordScreen",
            params: { email },
          });
        }, 1500);
      }
    } catch (error) {
      setModalStatus("error");
      setModalMessage("Error en la verificación del código");
      setFormData((prev) => ({ ...prev, code: "" }));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setErrors({});
    setFormData((prev) => ({ ...prev, code: "" }));
  };

  return (
    <View className="w-full">
      <View>
        <TitleText>Recuperación de contraseña</TitleText>
        <Text
          className="font-bold text-base mb-4"
          style={{ textDecorationLine: "underline" }}
        >
          {email}
        </Text>
        <View>
          <Label>Código</Label>
          <Input
            value={formData.code}
            onChangeText={(value) => handleChange("code", value)}
            placeholder="Ingrese su código de 4 dígitos"
            keyboardType="numeric"
          />
          {errors.code && <Text className="text-red-500">{errors.code}</Text>}
        </View>

        <View className="mt-6">
          <Button onPress={handleSubmit}>Verificar código</Button>
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

export default MethodCode;
