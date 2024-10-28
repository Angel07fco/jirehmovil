import { View, ScrollView } from "react-native";
import { Screen } from "../components/Screen";
import Header from "../components/Header";
import { TitleText } from "../components/ui/Text";
import CardServicios from "../components/ui/card/CardServicios";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
          <TitleText>Servicios</TitleText>
          <CardServicios
            imageUrl="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            title="Urgencias"
            description="¿Mascota enferma en medio de la noche? ¡Estamos aquí para ayudar!"
            onPress={() => {
              console.log("Card pressed!");
              router.push("/auth/detallesScreen");
            }}
          />
          <CardServicios
            imageUrl="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            title="Urgencias"
            description="¿Mascota enferma en medio de la noche? ¡Estamos aquí para ayudar!"
          />
          <CardServicios
            imageUrl="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            title="Urgencias"
            description="¿Mascota enferma en medio de la noche? ¡Estamos aquí para ayudar!"
          />
        </View>
      </ScrollView>
    </Screen>
  );
}
