import { View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl px-4 py-3 items-center justify-center ${style}`}
    >
      <Text className={`text-base ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

const ButtonGroup = () => {
  const router = useRouter();

  return (
    <View className="flex-row w-full space-x-4 justify-between mb-4">
      <View className="flex-1">
        <CustomButton
          title="Iniciar Sesión"
          onPress={() => router.push("/loginScreen")}
          style="bg-primaryBlue"
          textStyle="text-secondaryBlue"
        />
      </View>

      <View className="flex-1">
        <CustomButton
          title="Nuevo Usuario"
          onPress={() => router.push("/registerScreen")}
          style="bg-secondaryBlue"
          textStyle="text-primaryBlue"
        />
      </View>
    </View>
  );
};

export default ButtonGroup;
