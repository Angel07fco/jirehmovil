import { View, Image, ScrollView } from "react-native";
import {
  ArrowLeftIcon,
  FileIcon,
  ArrowRightIcon,
  PerfilIcon,
  SecurityIcon,
} from "../../../components/ui/Icons";
import { Screen } from "../../../components/Screen";
import { TitleText } from "../../../components/ui/Text";
import CardOption from "../../../components/ui/card/CardOption";
import { useRouter } from "expo-router";

export default function perfil() {
  const router = useRouter();

  return (
    <Screen>
      <View className="w-full mb-5">
        <ArrowLeftIcon onPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>AngelMh</TitleText>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
              }}
              className="w-32 h-32 rounded-full mt-2"
            />

            <View className="mt-10">
              <CardOption
                icon={FileIcon}
                title="Información personal"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/infoPersonal")}
              />
              <CardOption
                icon={PerfilIcon}
                title="Datos de la cuenta"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/infoCuenta")}
              />
              <CardOption
                icon={SecurityIcon}
                title="Seguridad"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/seguridad")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
