import { TextInput } from "react-native";

export const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      className="border border-gray-300 rounded-md p-2 w-full text-base"
    />
  );
};
