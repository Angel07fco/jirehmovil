import React from "react";
import { View, Modal, Text, ActivityIndicator } from "react-native";
import { Button } from "./Buttons/Button";

export const CustomModal = ({ visible, onClose, children, status }) => {
  // Determinamos los estilos de fondo y color de texto en función del estado
  let backgroundColor;
  let textColor;

  switch (status) {
    case "success":
      backgroundColor = "bg-green-200";
      textColor = "text-green-800";
      break;
    case "error":
      backgroundColor = "bg-red-200";
      textColor = "text-red-800";
      break;
    default:
      backgroundColor = "bg-gray-600"; // Fondo oscuro para el estado de carga
      textColor = "text-white"; // Texto blanco para estado de carga
      break;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-gray-100 bg-opacity-50">
        <View
          className={`p-6 rounded-lg shadow-lg w-11/12 max-w-sm ${backgroundColor}`}
        >
          {/* Muestra el ActivityIndicator cuando el estado es "loading" */}
          {status === "loading" ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <>
              <Text className={`text-xl font-semibold ${textColor} mb-4`}>
                {children}
              </Text>
              <View className="mt-4">
                <Button onPress={onClose}>Cerrar</Button>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};
