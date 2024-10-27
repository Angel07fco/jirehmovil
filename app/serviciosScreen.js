import { View, ScrollView } from "react-native";
import { Screen } from "../components/Screen";
import Header from "../components/Header";
import { TitleText } from "../components/ui/Text";
import CardServicios from "../components/ui/card/CardServicios";

export default function Index() {
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
