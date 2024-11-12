import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  ArrowLeftIcon,
  FileIcon,
  ArrowRightIcon,
  PerfilIcon,
  SecurityIcon,
} from "../../../components/ui/Icons";
import { Screen } from "../../../components/Screen";
import { TitleText } from "../../../components/ui/Text";
import CardOption from "../../../components/ui/card/CardOption";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerInfoUser, updateUserData } from "../../../lib/auth";

export default function perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(""); // Iniciar con cadena vacía

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem("userEmail");
      if (token) {
        const userInfo = await obtenerInfoUser(token);
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
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
                const updatedDataImage = {
                  img: uploadResult.secure_url,
                };

                const result = await updateUserData({
                  userId: user.id,
                  updateData: updatedDataImage,
                });

                if (result.success) {
                  Alert.alert("Éxito", result.message);
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

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.imagen) {
      setSelectedImage(user.imagen);
    }
  }, [user]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Screen>
      <View className="w-full mb-5">
        <ArrowLeftIcon onPress={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>{user?.user || "Usuario"}</TitleText>
            <Image
              source={{ uri: selectedImage || "default_image_url" }} // Imagen predeterminada
              className="w-32 h-32 rounded-full mt-2"
            />
            <TouchableOpacity onPress={pickImage}>
              <Text className="underline text-secondaryBlue text-lg font-semibold mt-2">
                Actualizar foto de perfil
              </Text>
            </TouchableOpacity>

            <View className="mt-10">
              <CardOption
                icon={FileIcon}
                title="Información personal"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/infoPersonal")}
              />
              <CardOption
                icon={PerfilIcon}
                title="Datos de la cuenta"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/infoCuenta")}
              />
              <CardOption
                icon={SecurityIcon}
                title="Seguridad"
                rightIcon={ArrowRightIcon}
                onPress={() => router.push("/auth/seguridad")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
