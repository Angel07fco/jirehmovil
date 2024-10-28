import { Text, View, ScrollView } from "react-native";
import { Screen } from "../components/Screen";
import Header from "../components/Header";
import { TitleText } from "../components/ui/Text";
import { Button } from "../components/ui/Buttons/Button";
import { useRouter } from "expo-router";

export default function citas() {
  const router = useRouter();
  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
          <View className="flex items-center">
            <TitleText>¡Estamos listos para recibir a tu mascota!</TitleText>
          </View>
          <Text className="text-secondaryBlue text-lg mb-8">
            Si quieres reservar un espacio para uno de nuestros servicios, por
            favor completa el proceso de “Agendar una cita”.
          </Text>

          <Button onPress={() => router.push("/auth/citauno")}>
            Agendar una cita
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
