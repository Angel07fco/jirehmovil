import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity, Alert } from "react-native";
import { updateUserData } from "../../../lib/auth"; // Importa tu función de actualización

export const InputUpdate = ({
  icon: IconComponent,
  initialText,
  placeholder,
  nameCampo,
  userId, // Recibir el ID del usuario como prop
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);
  const [tempText, setTempText] = useState(text);
  const [loading, setLoading] = useState(false);

  // Función para manejar la actualización
  const handleSave = async () => {
    if (tempText.trim() === "") {
      Alert.alert("Error", "El campo no puede estar vacío");
      return;
    }

    setLoading(true);

    try {
      const updateData = {
        [nameCampo]: tempText, // El nombre del campo es dinámico (puede ser nombres, apellidos, etc.)
      };

      const result = await updateUserData({
        userId,
        updateData,
      });

      if (result.success) {
        Alert.alert("Éxito", result.message);
        setText(tempText); // Actualizar el texto localmente solo si la actualización fue exitosa
        setIsEditing(false);
      } else {
        Alert.alert(
          "Error",
          result.error || "No se pudo actualizar el usuario"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al actualizar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempText(text);
    setIsEditing(false);
  };

  return (
    <View className="w-full flex-row mb-5">
      <View className="bg-secondaryBlue h-12 w-12 items-center justify-center rounded-lg">
        {IconComponent && <IconComponent color="white" size={28} />}
      </View>
      <View className="w-5/6">
        {isEditing ? (
          <>
            <TextInput
              value={tempText}
              onChangeText={(text) => setTempText(text)}
              placeholder={placeholder}
              className="ml-5 border border-secondaryBlue text-secondaryBlue rounded-md p-2 w-full text-base"
              autoFocus
            />
            <View className="flex-row justify-end mt-2">
              <TouchableOpacity onPress={handleCancel} className="mr-4">
                <Text className="text-secondaryBlue underline font-bold">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} disabled={loading}>
                <Text className="text-primaryBlue bg-secondaryBlue font-bold p-1 rounded-md">
                  {loading ? "Guardando..." : "Guardar"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex-row h-12 items-center justify-between">
            <Text className="ml-5 text-lg text-secondaryBlue font-bold">
              {text || "Sin datos para este campo"}
            </Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text className="ml-5 text-secondaryBlue underline font-bold">
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
