import { View, Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import UpdatePassword from "../../components/form/UpdatePassword";

const splashImage = require("../../assets/jireh.jpg");

export default function updatePasswordScreen() {
  const { email } = useLocalSearchParams(); // Usamos useLocalSearchParams

  return (
    <View className="flex-1 px-10 pt-5 bg-white">
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
        <UpdatePassword email={email} />
      </View>
    </View>
  );
}
