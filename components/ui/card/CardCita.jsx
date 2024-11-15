import { View, Image, TouchableOpacity } from "react-native";

const CardCita = ({ isSelected, onPress, imagenUri, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-center py-2 border-y border-t-secondaryBlue ${
        isSelected ? "bg-primaryBlue" : "bg-transparent"
      }`}
    >
      <View className="flex justify-center">
        <Image
          source={{
            uri: imagenUri,
          }}
          className="w-20 h-20 ml-4 rounded-full"
        />
      </View>
      <View className="ml-4 flex-1">{children}</View>
    </TouchableOpacity>
  );
};

export default CardCita;
