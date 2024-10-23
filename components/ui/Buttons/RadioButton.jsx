import { View, Text, TouchableOpacity } from "react-native";

const RadioButton = ({ selected, onPress, label }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center mb-2">
      <View
        className={`h-6 w-6 rounded-full border-2 ${
          selected ? "border-blue-600 bg-blue-600" : "border-gray-400"
        } justify-center items-center`}
      >
        {selected && <View className="h-3 w-3 bg-white rounded-full" />}
      </View>
      <Text className="ml-2 text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
