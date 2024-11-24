import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Main from "../../components/Main";
import Splash from "../Splash";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <View className="flex-1 items-center">
      <Main />
    </View>
  );
}
