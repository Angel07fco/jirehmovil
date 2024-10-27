import { View, Image, Text, TouchableOpacity } from "react-native";
import { TitleText } from "../components/ui/Text";
import { Button } from "../components/ui/Buttons/Button";
import { ArrowLeftIcon } from "../components/ui/Icons";

export default function Index() {
  return (
    <View className="flex-1 bg-primaryBlue p-4">
      <TouchableOpacity className="mb-4">
        <ArrowLeftIcon />
      </TouchableOpacity>

      <Image
        source={{
          uri: "https://www.consalud.es/animalcare/uploads/s1/25/04/50/3/mascotas.jpeg",
        }}
        className="w-full h-56 rounded-lg mb-4"
        resizeMode="cover"
      />

      {/* Contenido */}
      <View className="bg-lightBlue rounded-lg p-4">
        <View className="flex items-center">
          <TitleText>Limpieza dental</TitleText>
        </View>
        <Text className="text-secondaryBlue text-base mb-4 mt-2">
          Una buena salud bucal es esencial para el bienestar general de tu
          mascota. Nuestro servicio de limpieza dental veterinaria utiliza
          técnicas profesionales para eliminar el sarro y la placa, ayudando a
          prevenir problemas dentales y mantener una sonrisa brillante y
          saludable.
        </Text>

        {/* Botón de agendar */}
        <Button onPress={() => {}}>Agendar una cita</Button>
      </View>
    </View>
  );
}
