import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";

const ErrorScreen = () => {
  const errorOptions = [
    { id: "1", message: "Revisa tu conexión a Internet." },
    { id: "2", message: "Cierra y vuelve a abrir la aplicación." },
    { id: "3", message: "Borra la caché de la aplicación." },
    {
      id: "4",
      message: "Asegúrate de que tienes la última versión instalada.",
    },
    { id: "5", message: "Verifica los permisos de la aplicación." },
  ];

  const handleReload = () => {
    if (typeof window !== "undefined" && window.location) {
      window.location.reload(); // Para PWA
    } else {
      console.log("Recargando aplicación...");
    }
  };

  const renderErrorOption = ({ item }) => (
    <View className="bg-gray-100 p-3 mb-2 rounded-lg">
      <Text className="text-gray-800 text-sm">{item.message}</Text>
    </View>
  );

  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <Text className="text-xl font-bold text-red-500 mb-4">
        Error: Algo salió mal.
      </Text>
      <Text className="text-base text-gray-600 mb-6">
        Prueba alguna de las siguientes opciones para solucionar el problema:
      </Text>

      <FlatList
        data={errorOptions}
        renderItem={renderErrorOption}
        keyExtractor={(item) => item.id}
        className="w-full"
      />

      <TouchableOpacity
        onPress={handleReload}
        className="bg-red-500 rounded-full py-2 px-4 mt-5"
      >
        <Text className="text-white text-center font-semibold">
          Recargar Aplicación
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
