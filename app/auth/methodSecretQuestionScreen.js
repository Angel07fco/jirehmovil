import { View, Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router"; // Cambiamos a useLocalSearchParams
import MethodSecretQuestion from "../../components/form/MethodSecretQuestion";

const splashImage = require("../../assets/jireh.jpg");

export default function methodSecretQuestionScreen() {
  const { question_secret, reply_secret, email } = useLocalSearchParams(); // Usamos useLocalSearchParams

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
        <MethodSecretQuestion
          question={question_secret}
          expectedAnswer={reply_secret}
          email={email}
        />
      </View>
    </View>
  );
}
