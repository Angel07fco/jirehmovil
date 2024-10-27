import React from "react";
import { View, Image, Text } from "react-native";

const CardServicios = ({ imageUrl, title, description }) => {
  return (
    <View className="flex-row items-center py-4 bg-lightBlue rounded-lg">
      <Image source={{ uri: imageUrl }} className="w-14 h-14 mr-5" />
      <View className="flex-1">
        <Text className="font-bold text-darkBlue text-lg">{title}</Text>
        <Text className="text-gray-600 text-sm">{description}</Text>
      </View>
    </View>
  );
};

export default CardServicios;