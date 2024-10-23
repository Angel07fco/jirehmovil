import { View, Image, Text } from "react-native";
import MethodSecretQuestion from "../components/form/MethodSecretQuestion";
import { Link } from "expo-router";

const splashImage = require("../assets/jireh.jpg");

export default function Index() {
  return (
    <View className="flex-1 px-10">
      <View className="items-end mt-4">
        <Link href="/">
          <Text className="font-bold text-lg text-darkBlue underline">
            Salir
          </Text>
        </Link>
      </View>
      <View className="items-center">
        <Image
          source={splashImage}
          className="w-2/6 h-2/6"
          resizeMode="contain"
        />
        <MethodSecretQuestion />
      </View>
    </View>
  );
}
