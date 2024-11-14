import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { ArrowLeftIcon, CalendarIcon } from "../../components/ui/Icons";
import { useRouter } from "expo-router";
import { obtenerInfoUser } from "../../lib/auth";
import { getCitasQueYaOpine } from "../../lib/citas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function citasOpinadas() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [citasProximas, setCitasProximas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo);
        return userInfo;
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
    return null;
  };

  const fetchCitasQueYaOpine = async () => {
    try {
      setLoading(true);
      const userInfo = await fetchUser();
      if (userInfo?.id) {
        const { success, citasYaOpinadas } = await getCitasQueYaOpine(
          userInfo.id
        );
        if (success && Array.isArray(citasYaOpinadas)) {
          setCitasProximas(citasYaOpinadas);
        } else {
          setCitasProximas([]);
        }
      }
    } catch (error) {
      console.error("Error al obtener citas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitasQueYaOpine();
  }, []);

  return (
    <View className="w-full">
      <View className="bg-secondaryBlue flex-row items-center w-full h-20">
        <TouchableOpacity
          onPress={() => router.push("/cuenta/historialcitas")}
          className="ml-4"
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <Text className="text-primaryBlue font-bold text-2xl ml-5">
          Citas que ya di mi opinión
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        <View className="w-full mt-4 px-4">
          {loading ? (
            <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
              Cargando citas...
            </Text>
          ) : Array.isArray(citasProximas) && citasProximas.length > 0 ? (
            citasProximas.map((cita) => (
              <View
                key={cita._id}
                className="w-full p-2 border border-gray-400 bg-fondoApp rounded-lg mb-4"
              >
                <View className="flex-row items-center">
                  <Image
                    source={{
                      uri: cita.mascota?.img,
                    }}
                    className="w-20 h-20 ml-2"
                  />
                  <View className="ml-4 flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-secondaryBlue text-base font-bold flex-shrink max-w-[100%] break-words">
                        Tu cita con el servicio {cita.servicio?.name} del día{" "}
                        {cita.fecha} a las {cita.hora} ya has dado tu opinión.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className="w-full flex-1 justify-center items-center">
              <CalendarIcon size={36} />
              <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
                No encontramos ninguna cita.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
