import { View, ImageBackground, Text } from "react-native";

const CardValores = ({ imagenUri, textValor }) => {
  return (
    <View className="w-full h-48 overflow-hidden rounded-lg">
      <ImageBackground
        source={{
          uri: imagenUri,
        }}
        resizeMode="cover"
        className="flex-1 justify-center items-center w-48"
      >
        <View className="bg-white/70 w-full py-3">
          <Text className="text-xl font-bold text-center text-secondaryBlue">
            {textValor}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CardValores;
