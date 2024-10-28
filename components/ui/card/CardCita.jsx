import { View, Image } from "react-native";

const CardCita = ({ imagenUri, children }) => {
  return (
    <View className="w-full flex-row items-center py-2 border-y border-t-secondaryBlue">
      <View className="flex justify-center">
        <Image
          source={{
            uri: imagenUri,
          }}
          className="w-20 h-20"
        />
      </View>
      <View className="ml-4 flex-1">{children}</View>
    </View>
  );
};

export default CardCita;
