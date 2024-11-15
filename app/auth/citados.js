import { View, ScrollView, ActivityIndicator, Text, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { SubTitleText, TitleText } from "../../components/ui/Text";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Select } from "../../components/ui/Inputs/Select";
import { useEffect, useState } from "react";
import { getPetsByUser } from "../../lib/pets";
import { obtenerInfoUser } from "../../lib/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function citados() {
  const router = useRouter();
  const {
    medico,
    fecha,
    horariosDisponibles: horariosStr = "",
  } = useLocalSearchParams();
  const horariosDisponibles = horariosStr.split(",");
  const [selectedOption, setSelectedOption] = useState("");
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [selectedMascotaId, setSelectedMascotaId] = useState(null);

  useEffect(() => {
    const fetchUserAndPets = async () => {
      try {
        const token = await AsyncStorage.getItem("userEmail");

        if (token) {
          const userInfo = await obtenerInfoUser(token);
          if (userInfo && userInfo.id) {
            setUserId(userInfo.id);
            const petsData = await getPetsByUser(userInfo.id);

            if (petsData.error) {
              setError(petsData.error);
            } else {
              setPets(petsData);
            }
          } else {
            setError(
              "No se pudo obtener la información sobre las mascotas del usuario."
            );
          }
        } else {
          setError("Token de usuario no encontrado.");
        }
      } catch (error) {
        console.error("Error al obtener usuario y mascotas:", error);
        setError("Hubo un error al cargar las mascotas.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPets();
  }, []);

  const handleNextStep = () => {
    if (!selectedOption) {
      Alert.alert("Error", "Por favor, seleccione una hora para su cita.");
      return;
    }

    if (!selectedMascotaId) {
      Alert.alert("Error", "Por favor, seleccione una mascota.");
      return;
    }

    router.push({
      pathname: "/auth/citatres",
      params: {
        medico,
        fecha,
        hora: selectedOption,
        mascotaId: selectedMascotaId,
      },
    });
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={2} />

          {/* Selección de hora */}
          <View className="mb-6">
            <TitleText>Seleccione la hora de su cita:</TitleText>
            <Select
              selectedValue={selectedOption}
              onValueChange={(itemValue) => setSelectedOption(itemValue)}
              options={(horariosDisponibles || []).map((hora) => ({
                label: hora,
                value: hora,
              }))}
              placeholder="Seleccione una hora"
            />
          </View>

          {/* Selección de mascota */}
          <TitleText>Seleccione a su mascota:</TitleText>
          {pets.length === 0 ? (
            <Text>No se encontraron mascotas registradas.</Text>
          ) : (
            pets.map((mascota) => (
              <CardCita
                key={mascota._id}
                imagenUri={mascota.img}
                onPress={() => setSelectedMascotaId(mascota._id)}
                isSelected={selectedMascotaId === mascota._id}
              >
                <TitleText style="mb-2">
                  {mascota.name} ({mascota.genero})
                </TitleText>
                <SubTitleText style="mb-0 text-base">
                  {mascota.raza}
                </SubTitleText>
              </CardCita>
            ))
          )}

          {/* Botones de navegación */}
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
              <Button onPress={handleNextStep}>Siguiente</Button>
            </View>
          </View>

          {/* Botón de cancelar */}
          <Button onPress={() => router.push("/citas")}>Cancelar</Button>
        </View>
      </ScrollView>
    </Screen>
  );
}
