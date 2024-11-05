import React, { useState } from "react";
import { View, Text } from "react-native";
import RadioButton from "./RadioButton";
import { SubTitleText } from "../Text";

const RadioGroup = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // Notificar al formulario principal de la selección
  };

  return (
    <View className="mt-4">
      <SubTitleText>
        Seleccione el método por el que desea recuperar su contraseña:
      </SubTitleText>
      <RadioButton
        label="Con un código a mi correo"
        selected={selectedOption === "option1"}
        onPress={() => handleSelect("option1")}
      />
      <RadioButton
        label="Pregunta secreta"
        selected={selectedOption === "option2"}
        onPress={() => handleSelect("option2")}
      />
    </View>
  );
};

export default RadioGroup;
