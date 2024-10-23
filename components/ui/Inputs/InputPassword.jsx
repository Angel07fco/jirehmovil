import { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import { EyeIcon, EyeSlashIcon } from "../Icons";

export const InputPassword = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  isPassword = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

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
        className="border border-gray-300 rounded-md p-2 w-full text-base"
      />
      {isPassword && (
        <TouchableOpacity
          onPress={toggleSecureEntry}
          className="absolute right-3 top-3"
        >
          {isSecure ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
        </TouchableOpacity>
      )}
    </View>
  );
};
