import { View, Text } from "react-native";
import { Link } from "expo-router";
import Register from "../../components/form/Register";

export default function registerScreen() {
  return (
    <View className="flex-1 px-10 pt-5 bg-white">
      <View className="items-end">
        <Link href="/">
          <Text className="font-bold text-lg text-darkBlue underline">
            Salir
          </Text>
        </Link>
      </View>
      <View className="items-center pt-6">
        <Register />
      </View>
    </View>
  );
}
