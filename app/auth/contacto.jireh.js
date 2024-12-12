import React from "react";
import { View, TextInput, Button, Text } from "react-native";

const ContactForm = () => {
  return (
    <View className="flex-1 px-5 py-5 bg-white">
      <Text className="text-lg font-bold text-center mb-5">Contáctanos</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-4 rounded"
        placeholder="Nombre"
        testID="name-input"
      />
      <TextInput
        className="border border-gray-300 p-3 mb-4 rounded"
        placeholder="Correo electrónico"
        keyboardType="email-address"
        testID="email-input"
      />
      <TextInput
        className="border border-gray-300 p-3 mb-6 rounded"
        placeholder="Mensaje"
        multiline
        numberOfLines={4}
        testID="message-input"
      />
      <Button title="Enviar Mensaje" onPress={() => {}} testID="send-button" />
    </View>
  );
};

export default ContactForm;
