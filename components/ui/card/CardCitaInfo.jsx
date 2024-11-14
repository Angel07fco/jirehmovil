import { View, Image, Text, TouchableOpacity } from "react-native";

const CardCitaInfo = ({
  fecha,
  hora,
  imagen,
  icono,
  servicio,
  medico,
  citaAgendada,
  style,
}) => {
  return (
    <TouchableOpacity
      className={`w-full p-2 border border-gray-400 bg-fondoApp rounded-lg ${style}`}
    >
      <View className="flex-row items-center">
        <Text className="font-bold text-secondaryBlue text-base">{fecha}</Text>
        <Text className="font-bold text-secondaryBlue text-base mx-2">|</Text>
        <Text className="font-bold text-secondaryBlue text-base">{hora}</Text>
      </View>
      <View className="w-full h-[1%] mt-1 mb-2 bg-gray-400"></View>
      <View className="flex-row">
        <Image source={{ uri: imagen }} className="w-20 h-20 ml-2" />
        <View className="ml-4">
          <View className="flex-row items-center">
            <Image source={{ uri: icono }} className="w-9 h-9" />
            <Text className="text-secondaryBlue font-bold text-xl ml-1">
              {servicio}
            </Text>
          </View>
          <Text className="text-secondaryBlue mt-2">
            Lo atiende: MVZ. {medico}
          </Text>
          <Text className="text-secondaryBlue mt-1">
            Fue agendada el: {citaAgendada}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardCitaInfo;
