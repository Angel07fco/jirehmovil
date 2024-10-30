import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../components/Screen";
import { TitleText } from "../../components/ui/Text";
import CardOption from "../../components/ui/card/CardOption";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  VerifyIcon,
  OpinionIcon,
  CalendarIcon,
} from "../../components/ui/Icons";

export default function historialcitas() {
  return (
    <Screen>
      <View className="w-full mb-5 pt-10">
        <ArrowLeftIcon />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>Mis citas</TitleText>

            <View className="flex-1 justify-center items-center">
              <CalendarIcon size={36} />
              <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
                No tienes ninguna cita proxima agendada en este momento.
              </Text>
            </View>

            <View className="mt-6">
              <CardOption
                icon={OpinionIcon}
                title="Citas que esperan tu opinión"
                rightIcon={ArrowRightIcon}
                onPress={() => console.log("Información personal presionada")}
              />
              <CardOption
                icon={VerifyIcon}
                title="Citas que ya di mi opinión"
                rightIcon={ArrowRightIcon}
                onPress={() => console.log("Información personal presionada")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
