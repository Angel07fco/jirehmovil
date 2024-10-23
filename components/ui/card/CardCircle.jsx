import { View, Image, Text } from "react-native";

export const CardCircle = ({ urlImage, name }) => {
  return (
    <View className="items-center">
      <View>
        <Image
          source={{
            uri: urlImage,
          }}
          className="w-20 h-20 rounded-full"
        />
      </View>
      <Text className="text-center mt-2">{name}</Text>
    </View>
  );
};
