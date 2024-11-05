import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { InputPassword } from "../ui/Inputs/InputPassword";
import ButtonGroup from "../ui/Buttons/ButtonGroup";
import { createUserAccount } from "../../lib/auth";
import { validationsForm } from "../../utils/validationsForm";
import { useRouter } from "expo-router";

const Register = () => {
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
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
    const validationErrors = validationsForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      setModalStatus("loading");
      setModalMessage("Cargando...");
      setShowModal(true);

      const { confirmPassword, ...dataToSend } = formData;
      const result = await createUserAccount(dataToSend);

      if (result.error) {
        setModalStatus("error");
        setModalMessage(`Error: ${result.error}`);
        resetForm();
      } else {
        setModalStatus("success");
        setModalMessage(`Registro exitoso: ${result.message}`);

        setTimeout(() => {
          setShowModal(false);
          router.push({
            pathname: "/auth/confirmarCuenta",
            params: { email: formData.email }, // Enviar email a la pantalla de confirmación
          });
        }, 2000);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setFormData({
      user: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <View className="w-full">
      <ButtonGroup />
      <View>
        <View>
          <Label>Usuario</Label>
          <Input
            value={formData.user}
            onChangeText={(value) => handleChange("user", value)}
            placeholder="Ingrese un nombre de Usuario"
          />
          {errors.user && <Text className="text-red-500">{errors.user}</Text>}
        </View>

        <View className="mt-4">
          <Label>Correo electrónico</Label>
          <Input
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Ingrese su correo electrónico"
          />
          {errors.email && <Text className="text-red-500">{errors.email}</Text>}
        </View>

        <View className="mt-4">
          <Label>Teléfono</Label>
          <Input
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            placeholder="Ingrese su número de teléfono"
          />
          {errors.phone && <Text className="text-red-500">{errors.phone}</Text>}
        </View>

        <View className="mt-4">
          <Label>Contraseña</Label>
          <InputPassword
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Ingrese su contraseña"
            isPassword={true}
          />
          {errors.password && (
            <Text className="text-red-500">{errors.password}</Text>
          )}
        </View>

        <View className="mt-4">
          <Label>Confirmar Contraseña</Label>
          <InputPassword
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            placeholder="Confirme su contraseña"
            isPassword={true}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500">{errors.confirmPassword}</Text>
          )}
        </View>

        <View className="mt-6">
          <Button onPress={handleSubmit}>Registrarme</Button>
        </View>
      </View>

      <CustomModal
        visible={showModal}
        onClose={closeModal}
        status={modalStatus}
      >
        {modalStatus === "loading" ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <Text className="text-xl font-semibold mb-4">{modalMessage}</Text>
        )}
      </CustomModal>
    </View>
  );
};

export default Register;
