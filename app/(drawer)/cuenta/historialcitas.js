import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Screen } from "../../../components/Screen";
import { TitleText } from "../../../components/ui/Text";
import CardOption from "../../../components/ui/card/CardOption";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  VerifyIcon,
  OpinionIcon,
  CalendarIcon,
} from "../../../components/ui/Icons";
import { useRouter } from "expo-router";
import CardCitaInfo from "../../../components/ui/card/CardCitaInfo";
import { obtenerInfoUser } from "../../../lib/auth";
import { getCitasEnVivo, getCitasProximas } from "../../../lib/citas";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function historialcitas() {
  const router = useRouter();
  const [citasProximas, setCitasProximas] = useState([]);
  const [citasEnVivo, setCitasEnVivo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Función para obtener el usuario desde AsyncStorage
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

  const fetchCitasEnVivo = async () => {
    try {
      setLoading(true);
      const userInfo = await fetchUser();
      if (userInfo?.id) {
        const { success, citasEnVivo } = await getCitasEnVivo(userInfo.id);
        if (success && Array.isArray(citasEnVivo)) {
          setCitasEnVivo(citasEnVivo);
        } else {
          setCitasEnVivo([]);
        }
      }
    } catch (error) {
      console.error("Error al obtener citas:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCitasProximas = async () => {
    try {
      setLoading(true);
      const userInfo = await fetchUser();
      if (userInfo?.id) {
        const { success, citasProximas } = await getCitasProximas(userInfo.id);
        if (success && Array.isArray(citasProximas)) {
          setCitasProximas(citasProximas);
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
    fetchCitasEnVivo();
    fetchCitasProximas();
  }, []);

  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <ArrowLeftIcon onPress={() => router.back()} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex items-center">
              <TitleText>Mis citas</TitleText>

              {loading ? (
                <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
                  Cargando citas...
                </Text>
              ) : (
                citasEnVivo.length > 0 && (
                  <View className="w-full mb-5" key={citasEnVivo[0]._id}>
                    <Text className="text-xl font-bold bg-yellow-300 py-1 text-secondaryBlue text-center mb-1">
                      Cita en vivo
                    </Text>
                    <CardCitaInfo
                      key={citasEnVivo[0]._id}
                      fecha={citasEnVivo[0].fecha}
                      hora={citasEnVivo[0].hora}
                      imagen={citasEnVivo[0].mascota?.img}
                      icono={citasEnVivo[0].servicio?.icono}
                      servicio={citasEnVivo[0].servicio?.name}
                      medico={citasEnVivo[0].medico?.nombre}
                      citaAgendada={citasEnVivo[0].citaCreated}
                      style="bg-yellow-200"
                    />
                  </View>
                )
              )}

              {loading ? (
                <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
                  Cargando citas...
                </Text>
              ) : Array.isArray(citasProximas) && citasProximas.length > 0 ? (
                citasProximas.map((cita) => (
                  <View key={cita._id}>
                    <Text className="text-xl font-bold bg-red-300 py-1 text-secondaryBlue text-center mt-3 mb-1">
                      Cita proxima
                    </Text>
                    <CardCitaInfo
                      key={cita._id}
                      fecha={cita.fecha}
                      hora={cita.hora}
                      imagen={cita.mascota?.img}
                      icono={cita.servicio?.icono}
                      servicio={cita.servicio?.name}
                      medico={cita.medico?.nombre}
                      citaAgendada={cita.citaCreated}
                    />
                  </View>
                ))
              ) : (
                <View className="w-full flex-1 justify-center items-center">
                  <CalendarIcon size={36} />
                  <Text className="mt-4 px-8 text-secondaryBlue text-lg text-center">
                    No tienes ninguna cita próxima agendada en este momento.
                  </Text>
                </View>
              )}

              <View className="mt-6">
                <CardOption
                  icon={VerifyIcon}
                  title="Historial de citas"
                  rightIcon={ArrowRightIcon}
                  onPress={() => router.push("/auth/citasOpinadas")}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  );
}
