import React from "react";
import { View, Text } from "react-native";

const IndicatorCita = ({ currentStep }) => {
  return (
    <View className="w-full flex-row justify-between items-center mb-8">
      {/* Paso 1 */}
      <View
        className={`w-14 h-14 items-center justify-center rounded-full ${
          currentStep >= 1 ? "bg-secondaryBlue" : "bg-gray-300"
        }`}
      >
        <Text
          className={`text-xl font-bold ${
            currentStep >= 1 ? "text-primaryBlue" : "text-secondaryBlue"
          }`}
        >
          1
        </Text>
      </View>

      {/* Línea de conexión entre pasos */}
      <View
        className={`w-16 h-1 ${currentStep >= 2 ? "bg-secondaryBlue" : "bg-gray-300"}`}
      ></View>

      {/* Paso 2 */}
      <View
        className={`w-14 h-14 items-center justify-center rounded-full ${
          currentStep >= 2 ? "bg-secondaryBlue" : "bg-gray-300"
        }`}
      >
        <Text
          className={`text-xl font-bold ${
            currentStep >= 2 ? "text-primaryBlue" : "text-secondaryBlue"
          }`}
        >
          2
        </Text>
      </View>

      {/* Línea de conexión entre pasos */}
      <View
        className={`w-16 h-1 ${currentStep >= 3 ? "bg-secondaryBlue" : "bg-gray-300"}`}
      ></View>

      {/* Paso 3 */}
      <View
        className={`w-14 h-14 items-center justify-center rounded-full ${
          currentStep >= 3 ? "bg-secondaryBlue" : "bg-gray-300"
        }`}
      >
        <Text
          className={`text-xl font-bold ${
            currentStep >= 3 ? "text-primaryBlue" : "text-secondaryBlue"
          }`}
        >
          3
        </Text>
      </View>
    </View>
  );
};

export default IndicatorCita;
