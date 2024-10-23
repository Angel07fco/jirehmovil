import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import RadioGroup from "../ui/Buttons/RadioGroup";
import { TitleText } from "../ui/Text";

const ForgotPasswordMethod = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        <TitleText>Recuperación de contraseña</TitleText>
        <View>
          <Label>Correo electrónico</Label>
          <Input
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Ingrese su correo electrónico"
          />
        </View>

        <RadioGroup />

        <View className="mt-4">
          <Button onPress={handleSubmit}>Recuperar</Button>
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

export default ForgotPasswordMethod;
