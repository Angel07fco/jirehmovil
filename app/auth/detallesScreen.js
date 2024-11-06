import { View, Image, Text, TouchableOpacity } from "react-native";
import { TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { ArrowLeftIcon } from "../../components/ui/Icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DetallesScreen() {
  const router = useRouter();
  const { service } = useLocalSearchParams();
  const serviceData = service ? JSON.parse(service) : {}; // Convertimos el string a un objeto

  return (
    <View className="flex-1 bg-primaryBlue p-4">
      <TouchableOpacity onPress={() => router.back()} className="mb-6">
        <ArrowLeftIcon />
      </TouchableOpacity>

      <Image
        source={{ uri: serviceData.img }}
        className="w-full h-56 rounded-lg mb-4"
        resizeMode="cover"
      />

      <View className="bg-lightBlue rounded-lg p-4">
        <View className="flex items-center">
          <TitleText>{serviceData.name}</TitleText>
        </View>
        <Text className="text-secondaryBlue text-base mb-4 mt-2">
          {serviceData.description}
        </Text>

        <Button
          onPress={() => {
            router.push("/citas");
          }}
        >
          Agendar una cita
        </Button>
      </View>
    </View>
  );
}
