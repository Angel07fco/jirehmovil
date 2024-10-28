import { TouchableOpacity, Text } from "react-native";

export const Button = ({ onPress, children, style, style2 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`bg-secondaryBlue p-3 rounded-lg w-full items-center border ${style}`}
    >
      <Text className={`text-primaryBlue text-base font-semibold ${style2}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
