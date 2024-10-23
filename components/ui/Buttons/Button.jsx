import { TouchableOpacity, Text } from "react-native";

export const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-secondaryBlue p-3 rounded-lg w-full items-center"
    >
      <Text className="text-primaryBlue text-base font-semibold">
        {children}
      </Text>
    </TouchableOpacity>
  );
};
