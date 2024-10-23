import { View, StatusBar } from "react-native";

export function Screen({ children }) {
  return (
    <View className="bg-fondoApp w-[100%] h-[100%] px-6">
      <StatusBar barStyle="light-content" backgroundColor="#E7EEF8" />
      {children}
    </View>
  );
}
