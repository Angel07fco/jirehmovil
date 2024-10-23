import { Text } from "react-native";

export const Label = ({ children }) => {
  return (
    <Text className="text-sm font-semibold mb-2 text-secondaryBlue">
      {children}
    </Text>
  );
};
