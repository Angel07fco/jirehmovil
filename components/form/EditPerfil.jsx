import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { InputUpdate } from "../ui/Inputs/InputUpdate";
import { SearchIcon, PerfilIcon } from "../ui/Icons";
import { TitleText } from "../ui/Text";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  obtenerInfoUser,
  buscarPorCodigoPostal,
  updateUserData,
} from "../../lib/auth";
import { ArrowLeftIcon } from "../ui/Icons";
import { useRouter } from "expo-router";

const EditPerfil = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditingDomicilio, setIsEditingDomicilio] = useState(false);

  // Estados para la información del domicilio
  const [codigoPostal, setCodigoPostal] = useState("");
  const [error, setError] = useState("");
  const [estado, setEstado] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipios, setMunicipios] = useState([]);

  // Función para obtener información del usuario
  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo);
        // Inicializar los campos con datos actuales
        setCodigoPostal(userInfo?.domicilio?.codigoPostal || "");
        setEstado(userInfo?.domicilio?.ciudad || "");
        setMunicipio(userInfo?.domicilio?.municipio || "");
        setDireccion(userInfo?.domicilio?.direccion || "");
      }
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  // Manejo de la búsqueda por código postal
  const handleBuscarCodigoPostal = async () => {
    try {
      const data = await buscarPorCodigoPostal(codigoPostal);
      if (data) {
        setEstado(data.estado);
        setMunicipios(data.lugares.map((lugar) => lugar.nombre));
        setMunicipio(data.lugares[0]?.nombre || "");
        setError("");
      } else {
        setError("No se encontraron resultados para este código postal");
      }
    } catch (error) {
      setError("Hubo un error al buscar el código postal.");
    }
  };

  // Función para actualizar la información del domicilio
  const handleGuardarDomicilio = async () => {
    if (codigoPostal.trim() === "" || direccion.trim() === "") {
      Alert.alert("Error", "El código postal y la dirección son obligatorios");
      return;
    }

    setLoading(true);

    const updatedDomicilio = {
      domicilio: {
        codigoPostal,
        ciudad: estado,
        municipio,
        direccion,
      },
    };

    try {
      const result = await updateUserData({
        userId: user.id,
        updateData: updatedDomicilio,
      });

      if (result.success) {
        Alert.alert("Éxito", "Domicilio actualizado correctamente");
        setIsEditingDomicilio(false); // Finalizar edición
      } else {
        Alert.alert(
          "Error",
          result.error || "No se pudo actualizar el domicilio"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al actualizar el domicilio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="w-full">
      <View className="bg-secondaryBlue flex-row items-center w-full h-20">
        <TouchableOpacity
          onPress={() => router.push("/cuenta/perfil")}
          className="ml-4"
        >
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <Text className="text-primaryBlue font-bold text-2xl ml-5">
          Información personal
        </Text>
      </View>
      <View className="px-6 mt-10">
        <TitleText>Nombre(s) y apellidos</TitleText>
        <InputUpdate
          icon={PerfilIcon}
          initialText={user?.nombres || "Sin datos para nombre(s)"}
          placeholder="Ingrese su nombre(s)"
          nameCampo="nombres"
          userId={user.id}
        />

        <InputUpdate
          icon={PerfilIcon}
          initialText={user?.apellidos || "Sin datos para apellidos"}
          placeholder="Ingrese su Apellido Paterno"
          nameCampo="apellidos"
          userId={user.id}
        />

        <View className="flex-row items-center justify-between my-5">
          <TitleText style="mb-0">Domicilio residencial</TitleText>
          <TouchableOpacity
            onPress={() => setIsEditingDomicilio(!isEditingDomicilio)}
          >
            <Text className="text-secondaryBlue underline font-bold">
              {isEditingDomicilio ? "Cancelar" : "Editar domicilio"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Formulario de Edición de Domicilio */}
        {isEditingDomicilio ? (
          <>
            {/* Código Postal */}
            <Text className="text-secondaryBlue">Código postal</Text>
            <View className="flex-row items-center">
              <TextInput
                placeholder="Código Postal"
                value={codigoPostal}
                keyboardType="numeric"
                onChangeText={(text) => setCodigoPostal(text)}
                className="border rounded p-2 flex-1 text-secondaryBlue mr-2"
              />
              <TouchableOpacity onPress={handleBuscarCodigoPostal}>
                <SearchIcon />
              </TouchableOpacity>
            </View>

            {/* Mostrar error debajo del campo si existe */}
            {error && (
              <Text className="text-red-500 text-sm mt-2">{error}</Text> // Estilo para el mensaje de error
            )}

            {/* Estado */}
            <Text className="text-secondaryBlue mt-3">
              Organización federal (Estado)
            </Text>
            <TextInput
              value={estado}
              editable={false}
              className="border rounded p-2 bg-gray-200 text-secondaryBlue"
            />

            {/* Municipio */}
            <Text className="text-secondaryBlue mt-3">Municipio</Text>
            <Picker
              selectedValue={municipio}
              onValueChange={(itemValue) => setMunicipio(itemValue)}
            >
              {municipios.length === 0 ? (
                <Picker.Item label="No disponible" value="" />
              ) : (
                municipios.map((lugar, index) => (
                  <Picker.Item key={index} label={lugar} value={lugar} />
                ))
              )}
            </Picker>

            {/* Dirección */}
            <Text className="text-secondaryBlue mt-3">Domicilio</Text>
            <TextInput
              placeholder="Ingrese su dirección (calle, localidad, número de casa, etc.)"
              value={direccion}
              onChangeText={(text) => setDireccion(text)}
              className="border rounded p-2 text-secondaryBlue"
            />

            <TouchableOpacity
              onPress={handleGuardarDomicilio}
              className="mt-5 bg-secondaryBlue text-primaryBlue rounded-md p-2"
            >
              <Text className="text-white text-center font-bold">Guardar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text className="text-secondaryBlue">Código postal</Text>
            <TitleText>{codigoPostal || "---"}</TitleText>

            <Text className="text-secondaryBlue">
              Organización federal (Estado)
            </Text>
            <TitleText>{estado || "---"}</TitleText>

            <Text className="text-secondaryBlue">Municipio</Text>
            <TitleText>{municipio || "---"}</TitleText>

            <Text className="text-secondaryBlue">Domicilio</Text>
            <TitleText>{direccion || "---"}</TitleText>
          </>
        )}
      </View>
    </View>
  );
};

export default EditPerfil;
