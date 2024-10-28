import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export const Select = ({
  selectedValue,
  onValueChange,
  options,
  placeholder,
}) => {
  return (
    <View className="border border-gray-300 rounded-md w-full">
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: "#333", fontSize: 16 }}
        mode="dropdown"
      >
        <Picker.Item label={placeholder} value="" color="#aaa" />
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};
