import { View, Image, Text } from "react-native";

const splashImage = require("../assets/jireh.jpg");

export default function Splash() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={splashImage}
        className="w-2/6 h-2/6"
        resizeMode="contain"
        testID="splash-image" 
      />
      <Text className="text-xl text-secondaryBlue font-bold">
        Bienvenidos a JIREH
      </Text>
    </View>
  );
}
