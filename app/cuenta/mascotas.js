import { View, ScrollView } from "react-native";
import { ArrowLeftIcon } from "../../components/ui/Icons";
import { Screen } from "../../components/Screen";
import { TitleText } from "../../components/ui/Text";
import CardMascotas from "../../components/ui/card/CardMascotas";
import { Button } from "../../components/ui/Buttons/Button";

export default function mascotas() {
  return (
    <Screen>
      <View className="w-full mb-5 pt-10">
        <ArrowLeftIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>Mis mascotas</TitleText>

            <View className="mt-6">
              <CardMascotas
                imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png"
                title="Malu (macho)"
                description="Pastor belga"
              />
              <CardMascotas
                imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png"
                title="Rojo (macho)"
                description="Pitbull"
              />
            </View>
            <Button>Agregar nueva mascota</Button>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
