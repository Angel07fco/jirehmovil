import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "../ui/Inputs/Input";
import { Label } from "../ui/Label";
import { Button } from "../ui/Buttons/Button";
import { CustomModal } from "../ui/Modal";
import { InputPassword } from "../ui/Inputs/InputPassword";
import ButtonGroup from "../ui/Buttons/ButtonGroup";
import { SubTitleText } from "../ui/Text";
import { Link } from "expo-router";

const Contacto = () => {
  const [formData, setFormData] = useState({
    email: "",
    asunto: "",
    mensaje: "",
  });
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
        <View>
          <Label>Correo electrónico</Label>
          <Input
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            placeholder="Ingrese su correo electrónico"
          />
        </View>

        <View className="mt-4">
          <Label>Asunto</Label>
          <Input
            value={formData.asunto}
            onChangeText={(value) => handleChange("asunto", value)}
            placeholder="Ingrese su correo electrónico"
          />
        </View>

        <View className="mt-4">
          <Label>Mensaje</Label>
          <Input
            value={formData.mensaje}
            onChangeText={(value) => handleChange("mensaje", value)}
            placeholder="Ingrese su correo electrónico"
          />
        </View>

        <View className="mt-4">
          <Button onPress={handleSubmit}>Enviar</Button>
        </View>
      </View>

      <CustomModal visible={showModal} onClose={closeModal}>
        <Text className="text-xl font-semibold mb-4">Datos ingresados</Text>
        <Text>
          <Text className="font-bold">Email:</Text> {formData.email}
        </Text>
        <Text>
          <Text className="font-bold">Asunto:</Text> {formData.asunto}
        </Text>
        <Text>
          <Text className="font-bold">Mensaje:</Text> {formData.mensaje}
        </Text>
      </CustomModal>
    </View>
  );
};

export default Contacto;
