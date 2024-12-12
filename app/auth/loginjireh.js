import React from "react";
import { View, TextInput, Button, Text } from "react-native";

const Login = () => {
  return (
    <View className="flex-1 px-5 py-5 bg-white">
      <Text className="text-lg font-bold text-center mb-5">Iniciar Sesión</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-4 rounded"
        placeholder="Correo electrónico"
        keyboardType="email-address"
        testID="email-input"
      />
      <TextInput
        className="border border-gray-300 p-3 mb-6 rounded"
        placeholder="Contraseña"
        secureTextEntry
        testID="password-input"
      />
      <Button title="Iniciar Sesión" onPress={() => {}} testID="login-button" />
    </View>
  );
};

export default Login;
