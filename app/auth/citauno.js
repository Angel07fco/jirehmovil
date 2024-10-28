import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { SubTitleText, TitleText } from "../../components/ui/Text";
import { DateInput } from "../../components/ui/Inputs/DateInput";
import { useState } from "react";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";

export default function citauno() {
  const [selectedDate, setSelectedDate] = useState("");
  const router = useRouter();

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={1} />

          <TitleText>Seleccione el Médico de su confianza:</TitleText>
          <CardCita imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png">
            <TitleText style="mb-2">Médico veterinario</TitleText>
            <SubTitleText style="mb-0 text-base">
              MVZ. Eddi Hernández Vidal
            </SubTitleText>
          </CardCita>

          <View className="mt-6">
            <TitleText>Seleccione el día de su cita:</TitleText>
            <DateInput
              value={selectedDate}
              onChangeDate={setSelectedDate}
              placeholder="Selecciona una fecha (YYYY-MM-DD)"
            />
          </View>

          <View className="mt-10 flex-row items-center justify-between">
            <View className="w-[40%]">
              <Button
                onPress={() => router.push("/")}
                style="border border-secondaryBlue bg-fondoApp"
                style2="text-secondaryBlue"
              >
                Cancelar
              </Button>
            </View>
            <View className="w-[40%]">
              <Button onPress={() => router.push("/auth/citados")}>
                Siguiente
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
