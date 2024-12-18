import { View, Image, Text } from "react-native";
import MethodCode from "../../components/form/MethodCode";
import { Link, useLocalSearchParams } from "expo-router"; // Importa useLocalSearchParams

const splashImage = require("../../assets/jireh.jpg");

export default function methodCodeScreen() {
  const { email } = useLocalSearchParams(); // Usa useLocalSearchParams para obtener el parámetro email

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
        <MethodCode email={email} />
      </View>
    </View>
  );
}
