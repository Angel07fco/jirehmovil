import { View, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import ConfirmarCuenta from "../../components/form/ConfirmarCuenta";

export default function ConfirmarCuentaScreen() {
  // Extraemos el email de los parámetros de navegación usando useLocalSearchParams
  const { email } = useLocalSearchParams();

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
        {/* Pasamos el email al componente ConfirmarCuenta */}
        <ConfirmarCuenta email={email} />
      </View>
    </View>
  );
}
