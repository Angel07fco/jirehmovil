import { View, ScrollView, ActivityIndicator, Modal } from "react-native";
import { ArrowLeftIcon } from "../../../components/ui/Icons";
import { Screen } from "../../../components/Screen";
import { TitleText } from "../../../components/ui/Text";
import CardMascotas from "../../../components/ui/card/CardMascotas";
import { Button } from "../../../components/ui/Buttons/Button";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerInfoUser } from "../../../lib/auth";
import { getPetsByUser } from "../../../lib/pets";
import FormAgregarMascota from "../../../components/form/formMascotas";

export default function Mascotas() {
  const router = useRouter();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);

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
  }, [pets]);

  const handleAddPetClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <Screen>
      <View className="w-full mb-5">
        <ArrowLeftIcon onPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>Mis mascotas</TitleText>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <TitleText>{error}</TitleText>
            ) : (
              <View className="mt-6">
                {pets.length > 0 ? (
                  pets.map((pet) => (
                    <CardMascotas
                      key={pet._id}
                      imageUrl={pet.img || "https://via.placeholder.com/150"}
                      title={`${pet.name} (${pet.genero})`}
                      description={pet.raza || "Raza no especificada"}
                      onPress={() =>
                        router.push({
                          pathname: "/auth/detallesPet",
                          params: {
                            pet: JSON.stringify(pet),
                          },
                        })
                      }
                    />
                  ))
                ) : (
                  <TitleText>No tienes mascotas registradas</TitleText>
                )}
              </View>
            )}
            <Button onPress={handleAddPetClick}>Agregar nueva mascota</Button>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showForm}
          onRequestClose={handleFormClose}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="w-11/12 bg-white p-5 rounded-lg">
              <FormAgregarMascota onClose={handleFormClose} userId={userId} />
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}
