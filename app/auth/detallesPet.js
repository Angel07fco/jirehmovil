import React, { useState } from "react";
import { View, ScrollView, Text, Image, TextInput, Alert } from "react-native";
import { ArrowLeftIcon } from "../../components/ui/Icons";
import { Screen } from "../../components/Screen";
import { TitleText } from "../../components/ui/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { arraypets } from "../../helpers/ArrayPets";
import { updatePet } from "../../lib/pets";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export default function DetallesPet() {
  const router = useRouter();
  const { pet } = useLocalSearchParams();
  const petDetails = pet ? JSON.parse(pet) : {};

  const handleBack = () => {
    router.back();
  };

  // Estados
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...petDetails });
  const [selectedCategoria, setSelectedCategoria] = useState(
    petDetails.categoria
  );
  const [selectedEspecie, setSelectedEspecie] = useState(petDetails.especie);
  const [selectedTamano, setSelectedTamano] = useState(petDetails.tamano);
  const [selectedGenero, setSelectedGenero] = useState(petDetails.genero);
  const [selectedImage, setSelectedImage] = useState(petDetails.img); // Estado para la imagen seleccionada

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    // Datos a actualizar
    const updatedData = {
      name: formData.name,
      age: formData.age,
      categoria: selectedCategoria,
      especie: selectedEspecie,
      tamano: selectedTamano,
      genero: selectedGenero,
      raza: formData.raza,
      peso: formData.peso,
      img: selectedImage, // Imagen de Cloudinary
    };

    const result = await updatePet(formData._id, updatedData);

    if (result.success) {
      Alert.alert("Éxito", result.message);
      router.push("/cuenta/mascotas");
      setEditing(false);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  // Función para seleccionar una imagen y subirla a Cloudinary
  const pickImage = async () => {
    // Solicitar permisos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos denegados",
        "Se necesitan permisos para acceder a la galería de fotos"
      );
      return;
    }

    // Abrir la galería de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Confirmar antes de actualizar la imagen
      Alert.alert(
        "Confirmar",
        "¿Estás seguro de que deseas actualizar la imagen de la mascota?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Confirmar",
            onPress: async () => {
              const uploadResult = await uploadImageToCloudinary(imageUri);
              if (uploadResult?.secure_url) {
                setSelectedImage(uploadResult.secure_url);
                const updatedData = {
                  img: uploadResult.secure_url,
                };

                const result = await updatePet(formData._id, updatedData);

                if (result.success) {
                  Alert.alert("Éxito", result.message);
                  router.push("/cuenta/mascotas");
                  setEditing(false);
                } else {
                  Alert.alert("Error", result.message);
                }
              }
            },
          },
        ]
      );
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      // Leer el archivo desde el URI
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Extraer la extensión y crear un tipo MIME
      const fileExtension = uri.split(".").pop();
      const mimeType = `image/${fileExtension}`;

      // Crear un FormData con la imagen en formato base64
      const data = new FormData();
      data.append("file", {
        uri: `data:${mimeType};base64,${file}`,
        type: mimeType,
        name: `image.${fileExtension}`,
      });
      data.append("upload_preset", "proyectojireh");

      // Hacer la solicitud a Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Imagen subida a Cloudinary:", response.data.secure_url);
      return response.data;
    } catch (error) {
      console.error("Error subiendo la imagen a Cloudinary:", error);
      Alert.alert("Error", "Hubo un problema al subir la imagen");
    }
  };

  return (
    <Screen>
      <View className="w-full mb-5">
        <ArrowLeftIcon onPress={handleBack} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>Detalles de la mascota</TitleText>

            {petDetails ? (
              <View className="mt-6 w-full">
                <View className="mb-4">
                  <View className="flex-row">
                    <View>
                      <Image
                        source={{ uri: selectedImage }}
                        className="w-28 h-28 rounded-2xl"
                      />
                    </View>
                    <View className="ml-6">
                      <TouchableOpacity onPress={handleEditToggle}>
                        <Text
                          className={`underline text-lg font-semibold ${editing ? "text-red-500" : "text-secondaryBlue"}`}
                        >
                          {editing ? "Cancelar edición" : "Editar información"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={pickImage}>
                        <Text className="underline text-secondaryBlue text-lg font-semibold mt-2">
                          Actualizar imagen
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Text className="text-secondaryBlue mt-6">
                    Nombre mascota
                  </Text>
                  {editing ? (
                    <TextInput
                      value={formData.name}
                      onChangeText={(text) => handleInputChange("name", text)}
                      placeholder="Nombre"
                      className="border p-2 rounded mb-3 text-secondaryBlue"
                    />
                  ) : (
                    <TitleText>{petDetails.name}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Edad</Text>
                  {editing ? (
                    <TextInput
                      value={formData.age?.toString()}
                      onChangeText={(text) => handleInputChange("age", text)}
                      placeholder="Edad"
                      keyboardType="numeric"
                      className="border p-2 rounded mb-3 text-secondaryBlue"
                    />
                  ) : (
                    <TitleText>{petDetails.age} años</TitleText>
                  )}

                  <Text className="text-secondaryBlue mt-3">Categoría</Text>
                  {editing ? (
                    <Picker
                      selectedValue={selectedCategoria}
                      onValueChange={(value) => {
                        setSelectedCategoria(value);
                        setSelectedEspecie("");
                      }}
                    >
                      {arraypets.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item.categoria}
                          value={item.categoria}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <TitleText>{petDetails.categoria}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Especie</Text>
                  {editing ? (
                    <Picker
                      selectedValue={selectedEspecie}
                      onValueChange={(value) => setSelectedEspecie(value)}
                    >
                      {arraypets
                        .find((item) => item.categoria === selectedCategoria)
                        ?.especies.map((especie, index) => (
                          <Picker.Item
                            key={index}
                            label={especie.name}
                            value={especie.name}
                          />
                        ))}
                    </Picker>
                  ) : (
                    <TitleText>{petDetails.especie}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Tamaño</Text>
                  {editing ? (
                    <Picker
                      selectedValue={selectedTamano}
                      onValueChange={(value) => setSelectedTamano(value)}
                    >
                      {["Pequeño", "Mediano", "Grande"].map((tamano, index) => (
                        <Picker.Item
                          key={index}
                          label={tamano}
                          value={tamano}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <TitleText>{petDetails.tamano}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Género</Text>
                  {editing ? (
                    <Picker
                      selectedValue={selectedGenero}
                      onValueChange={(value) => setSelectedGenero(value)}
                    >
                      {["Masculino", "Femenino"].map((genero, index) => (
                        <Picker.Item
                          key={index}
                          label={genero}
                          value={genero}
                        />
                      ))}
                    </Picker>
                  ) : (
                    <TitleText>{petDetails.genero}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Raza</Text>
                  {editing ? (
                    <TextInput
                      value={formData.raza}
                      onChangeText={(text) => handleInputChange("raza", text)}
                      placeholder="Raza"
                      className="border p-2 rounded mb-3 text-secondaryBlue"
                    />
                  ) : (
                    <TitleText>{petDetails.raza}</TitleText>
                  )}

                  <Text className="text-secondaryBlue">Peso</Text>
                  {editing ? (
                    <TextInput
                      value={formData.peso}
                      onChangeText={(text) => handleInputChange("peso", text)}
                      placeholder="Peso"
                      className="border p-2 rounded mb-3 text-secondaryBlue"
                    />
                  ) : (
                    <TitleText>{petDetails.peso} kg</TitleText>
                  )}
                </View>

                {editing && (
                  <TouchableOpacity onPress={handleSave}>
                    <View className="mt-6 py-3 px-6 bg-green-500 rounded-xl">
                      <Text className="text-white font-semibold text-center">
                        Guardar cambios
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <Text>Cargando...</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
