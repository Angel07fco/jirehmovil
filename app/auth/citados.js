import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { SubTitleText, TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";
import { Select } from "../../components/ui/Inputs/Select";
import { useState } from "react";

export default function citados() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { label: "Opción 1", value: "1" },
    { label: "Opción 2", value: "2" },
    { label: "Opción 3", value: "3" },
  ];

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={2} />

          <View className="mb-6">
          <TitleText>Seleccione la hora de su cita:</TitleText>
          <Select
            selectedValue={selectedOption}
            onValueChange={(itemValue) => setSelectedOption(itemValue)}
            options={options}
            placeholder="Seleccione una opción"
          />
          </View>

          <TitleText>Seleccione a su mascota:</TitleText>
          <CardCita imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png">
            <TitleText style="mb-2">Rojo (macho)</TitleText>
            <SubTitleText style="mb-0 text-base">Pitbull</SubTitleText>
          </CardCita>
          <CardCita imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1712975583/jireh/medicoo_lvrevy.png">
            <TitleText style="mb-2">Malu (macho)</TitleText>
            <SubTitleText style="mb-0 text-base">Pastor belga</SubTitleText>
          </CardCita>

          <View className="mt-10 mb-5 flex-row items-center justify-between">
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
              <Button onPress={() => router.push("/auth/citatres")}>
                Siguiente
              </Button>
            </View>
          </View>
          <Button onPress={() => router.push("/")}>Cancelar</Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
