import { View, ScrollView, ActivityIndicator, Alert } from "react-native";
import { Screen } from "../../components/Screen";
import IndicatorCita from "../../components/ui/IndicatorCita";
import CardCita from "../../components/ui/card/CardCita";
import { SubTitleText, TitleText } from "../../components/ui/Text";
import { DateInput } from "../../components/ui/Inputs/DateInput";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";
import { getMedicos } from "../../lib/medicos";
import { obtenerHorariosDisponibles } from "../../lib/horarios";

export default function CitaUno() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMedicoId, setSelectedMedicoId] = useState(null);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMedicos = async () => {
      const data = await getMedicos();
      if (!data.error) {
        setMedicos(data);
      } else {
        console.error("Error fetching services:", data.error);
      }
      setLoading(false);
    };
    fetchMedicos();
  }, []);

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleNext = async () => {
    if (!selectedMedicoId || !selectedDate) {
      Alert.alert("Error", "Debe seleccionar un médico y una fecha.");
      return;
    }

    const formattedDate = formatDate(selectedDate);

    // Llamada a la API para obtener los horarios disponibles
    const horariosDisponibles = await obtenerHorariosDisponibles(
      selectedMedicoId,
      formattedDate
    );

    // Si la respuesta es un string (error de horarios no disponibles), mostrar alerta
    if (typeof horariosDisponibles === "string") {
      Alert.alert("Error", horariosDisponibles);
      return;
    }

    if (horariosDisponibles.length === 0) {
      Alert.alert("Error", "No hay horarios disponibles para esta fecha.");
      return;
    }

    router.push({
      pathname: "/auth/citados",
      params: {
        medico: selectedMedicoId,
        fecha: formattedDate,
        horariosDisponibles: horariosDisponibles,
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

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5 pt-8">
          <IndicatorCita currentStep={1} />

          <TitleText>Seleccione el Médico de su confianza:</TitleText>

          {medicos.map((medico) => (
            <CardCita
              key={medico._id}
              imagenUri={medico.img}
              onPress={() => setSelectedMedicoId(medico._id)}
              isSelected={selectedMedicoId === medico._id}
            >
              <TitleText style="mb-2">Médico veterinario</TitleText>
              <SubTitleText style="mb-0 text-base">
                MVZ. {medico.nombre}
              </SubTitleText>
            </CardCita>
          ))}

          <View className="mt-6">
            <TitleText>Seleccione el día de su cita:</TitleText>
            <DateInput
              value={selectedDate}
              onChangeDate={setSelectedDate}
              placeholder="Selecciona una fecha (YYYY-MM-DD)"
            />
          </View>

          <View className="mt-10 flex-row items-center justify-between">
            <View className="w-[40%]">
              <Button
                onPress={() => router.push("/citas")}
                style="border border-secondaryBlue bg-fondoApp"
                style2="text-secondaryBlue"
              >
                Cancelar
              </Button>
            </View>
            <View className="w-[40%]">
              <Button onPress={handleNext}>Siguiente</Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
