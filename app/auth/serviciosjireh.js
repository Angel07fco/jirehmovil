import React from "react";
import { View, Text, FlatList } from "react-native";

const services = [
  { id: "1", name: "Consulta Veterinaria" },
  { id: "2", name: "Vacunación" },
  { id: "3", name: "Estética" },
];

const ServicesList = () => {
  return (
    <View className="flex-1 px-5 py-5 bg-white">
      <Text className="text-lg font-bold text-center mb-5">Servicios Disponibles</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="border-b border-gray-300 p-3" testID={`service-${item.id}`}>
            {item.name}
          </Text>
        )}
      />
    </View>
  );
};

export default ServicesList;
