import { View, StatusBar } from "react-native";

export function Screen({ children }) {
  return (
    <View className="bg-primaryBlue w-[100%] h-[100%] flex-1 items-center p-5">
      <StatusBar barStyle="light-content" backgroundColor="#b9d5de" />
      {children}
    </View>
  );
}
