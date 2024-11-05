import { View, Image, Text } from "react-native";
import Login from "../../components/form/Login";
import { Link } from "expo-router";

const splashImage = require("../../assets/jireh.jpg");

export default function Index() {
  return (
    <View className="flex-1 px-10 pt-5 bg-white">
      <View className="items-end">
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
        <Login />
      </View>
    </View>
  );
}
