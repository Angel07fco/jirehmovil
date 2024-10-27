import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar @expo/vector-icons

const CardPlanVet = ({ imageUrl, name, title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-40 h-52 bg-lightBlue rounded-2xl overflow-hidden shadow-lg"
      style={{ position: "relative" }}
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-full object-cover"
        style={{ borderRadius: 16 }}
      />
      <View
        className="absolute bottom-0 left-0 right-0 p-3 bg-secondaryBlue opacity-80 flex-row justify-between items-center"
        style={{ borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}
      >
        <View>
          <Text className="text-white font-bold text-base">{name}</Text>
          <Text className="text-white text-sm">{title}</Text>
        </View>

        <Ionicons name="arrow-forward-circle" size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default CardPlanVet;
