import { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "../Icons";

export const InputPassword = ({
  value,
  onChangeText,
  placeholder,
  isPassword = true, // Cambia el valor por defecto de isPassword a true
}) => {
  const [isSecure, setIsSecure] = useState(true); // Inicializa isSecure como true para que el texto esté oculto por defecto

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View className="relative w-full">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={isSecure}
        className="border border-secondaryBlue text-secondaryBlue rounded-md p-2 w-full text-base"
      />
      {isPassword && (
        <TouchableOpacity
          onPress={toggleSecureEntry}
          className="absolute right-3 top-3"
        >
          {isSecure ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
        </TouchableOpacity>
      )}
    </View>
  );
};
