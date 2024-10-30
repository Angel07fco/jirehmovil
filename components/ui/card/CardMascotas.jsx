import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const CardMascotas = ({ imageUrl, title, description, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full flex-row items-center py-3 bg-primaryBlue rounded-lg mb-6"
    >
      <Image
        source={{ uri: imageUrl }}
        className="w-20 h-20 mx-5 rounded-2xl"
      />
      <View className="flex-1">
        <Text className="font-bold text-secondaryBlue text-xl">{title}</Text>
        <Text className="text-secondaryBlue text-base">{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardMascotas;
