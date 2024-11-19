import { View, Image, Text, TouchableOpacity } from "react-native";

export const CardCircle = ({ urlImage, name, onPress }) => {
  return (
    <TouchableOpacity className="items-center" onPress={onPress}>
      <View>
        <Image
          source={{
            uri: urlImage,
          }}
          className="w-20 h-20"
        />
      </View>
      <Text className="text-center mt-2">{name}</Text>
    </TouchableOpacity>
  );
};
