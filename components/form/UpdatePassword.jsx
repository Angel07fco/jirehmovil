import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { InputPassword } from "../ui/Inputs/InputPassword";
import { TitleText } from "../ui/Text";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <View className="w-full">
      <View>
        <TitleText>Actualizar contraseña</TitleText>
        <View className="mt-4">
          <Label>Nueva contraseña</Label>
          <InputPassword
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Ingrese su contraseña"
            isPassword={true}
          />
        </View>
        <View className="mt-4">
          <Label>Confirmar nueva contraseña</Label>
          <InputPassword
            value={formData.confirmPassword}
            onChangeText={(value) => handleChange("confirmPassword", value)}
            placeholder="Ingrese su contraseña"
            isPassword={true}
          />
        </View>

        <View className="mt-6">
          <Button onPress={handleSubmit}>Actualizar contraseña</Button>
        </View>
      </View>

      <CustomModal visible={showModal} onClose={closeModal}>
        <Text className="text-xl font-semibold mb-4">Datos ingresados</Text>
        <Text>
          <Text className="font-bold">Email:</Text> {formData.email}
        </Text>
        <Text>
          <Text className="font-bold">Password:</Text> {formData.password}
        </Text>
      </CustomModal>
    </View>
  );
};

export default UpdatePassword;
