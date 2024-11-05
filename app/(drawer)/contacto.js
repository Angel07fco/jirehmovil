import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../components/Screen";
import Header from "../../components/Header";
import { TitleText } from "../../components/ui/Text";
import {
  WhatsAppIcon,
  CallIcon,
  LocationIcon,
} from "../../components/ui/Icons";

export default function nosotros() {
  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
          <TitleText>¡Queremos conocer tu opinión!</TitleText>
          <Text className="text-secondaryBlue text-base mb-6">
            Nuestra misión es brindarte una atención de calidad a ti y a tus
            mascotas, fomentando su salud y bienestar. Es por ello que deseamos
            saber cual es tu experiencia con la clinica. Comparte tu opinión,
            comentarios, quejas y sugerencias en los siguientes contactos.
          </Text>

          <TitleText>Síguenos en nuestras redes sociales</TitleText>
          <View className="flex-row justify-between">
            <View className="w-[48%] border border-secondaryBlue p-3">
              <WhatsAppIcon size={20} />
              <Text className="font-bold text-secondaryBlue text-base">
                Escribenos
              </Text>
              <Text>7711620008</Text>
            </View>
            <View className="w-[48%] border border-secondaryBlue p-3">
              <CallIcon size={20} />
              <Text className="font-bold text-secondaryBlue text-base">
                Llamadas
              </Text>
              <Text>77 1162 0008</Text>
            </View>
          </View>
          <View className="w-full border border-secondaryBlue p-3 my-4">
            <LocationIcon size={20} />
            <Text className="font-bold text-secondaryBlue text-base">
              Visítanos
            </Text>
            <Text>Bulevar Adolfo López S/N Colonia Aviación Civil</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
