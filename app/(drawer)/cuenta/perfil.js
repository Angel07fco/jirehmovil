import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Text,
  Modal,
} from "react-native";
import {
  ArrowLeftIcon,
  FileIcon,
  ArrowRightIcon,
  PerfilIcon,
  SecurityIcon,
  LogoutIcon,
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
import * as Updates from "expo-updates";

export default function perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

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

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      Alert.alert(
        "Confirmar",
        "¿Estás seguro de que deseas actualizar la imagen de perfil?",
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Confirmar",
            onPress: async () => {
              const uploadResult = await uploadImageToCloudinary(imageUri);
              if (uploadResult?.secure_url) {
                setSelectedImage(uploadResult.secure_url);
                const updatedDataImage = { img: uploadResult.secure_url };
                const result = await updateUserData({
                  userId: user.id,
                  updateData: updatedDataImage,
                });
                result.success
                  ? Alert.alert("Éxito", result.message)
                  : Alert.alert("Error", result.message);
              }
            },
          },
        ]
      );
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileExtension = uri.split(".").pop();
      const mimeType = `image/${fileExtension}`;
      const data = new FormData();
      data.append("file", {
        uri: `data:${mimeType};base64,${file}`,
        type: mimeType,
        name: `image.${fileExtension}`,
      });
      data.append("upload_preset", "proyectojireh");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dl8odylct/image/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    } catch (error) {
      console.error("Error subiendo la imagen a Cloudinary:", error);
      Alert.alert("Error", "Hubo un problema al subir la imagen");
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("idUser");
      await AsyncStorage.removeItem("user");

      await Updates.reloadAsync();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
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
        <ArrowLeftIcon onPress={() => router.push("/")} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <TitleText>{user?.user || "Usuario"}</TitleText>
            <Image
              source={{ uri: selectedImage || "default_image_url" }}
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
              <CardOption
                icon={LogoutIcon}
                title="Cerrar sesión"
                onPress={() => setModalVisible(true)}
                style="bg-red-400"
                styleText="text-white"
              />
            </View>
          </View>
        </ScrollView>

        {/* Modal de confirmación */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center text-center items-center bg-black/50">
            <View className="bg-white p-5 rounded-md w-80">
              <Text className="text-lg font-bold mb-4">
                ¿Deseas cerrar sesión?
              </Text>
              <View className="w-full flex-row justify-around mt-4">
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded"
                >
                  <Text className="text-white">Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Screen>
  );
}
