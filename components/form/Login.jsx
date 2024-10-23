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

const Login = () => {
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
      <ButtonGroup />
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
          <Label>Contraseña</Label>
          <InputPassword
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
            placeholder="Ingrese su contraseña"
            isPassword={true}
          />
        </View>

        {/* Este es un enlace*/}
        <View className="mt-1 flex items-end">
          <Link href="/forgotScreen">
            <SubTitleText>Recuperar contraseña</SubTitleText>
          </Link>
        </View>
        <View className="mt-4">
          <Button onPress={handleSubmit}>Iniciar sesión</Button>
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

export default Login;
