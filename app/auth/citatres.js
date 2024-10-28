import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { SubTitleText, TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";

export default function citatres() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={3} />

          <TitleText>Seleccione el servicio:</TitleText>
          <CardCita imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png">
            <TitleText style="mb-2">Urgencias</TitleText>
          </CardCita>
          <CardCita imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png">
            <TitleText style="mb-2">Vacunación</TitleText>
          </CardCita>

          <View className="mt-10 mb-5">
            <Button onPress={() => router.push("/")}>Agendar cita</Button>
          </View>
          <View className="flex-row items-center justify-between">
            <View className="w-[40%]">
              <Button
                onPress={() => router.back()}
                style="border border-secondaryBlue bg-fondoApp"
                style2="text-secondaryBlue"
              >
                Anterior
              </Button>
            </View>
            <View className="w-[40%]">
              <Button onPress={() => router.push("/citados")}>Cancelar</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
