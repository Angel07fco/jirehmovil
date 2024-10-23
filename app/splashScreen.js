import { Image, View } from "react-native";
const splashImage = require("../assets/jireh.jpg");

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={splashImage}
        className="w-1/2 h-1/2"
        resizeMode="contain"
      />
    </View>
  );
}
