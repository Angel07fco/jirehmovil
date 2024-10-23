import { View, Text } from "react-native";
import RadioButton from "./RadioButton";
import { useState } from "react";
import { SubTitleText } from "../Text";

const RadioGroup = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <View className="mt-4">
      <SubTitleText>
        Seleccione el método por el que desea recuperar su contraseña:
      </SubTitleText>
      <RadioButton
        label="Con un código a mi correo"
        selected={selectedOption === "option1"}
        onPress={() => setSelectedOption("option1")}
      />
      <RadioButton
        label="Pregunta secreta"
        selected={selectedOption === "option2"}
        onPress={() => setSelectedOption("option2")}
      />
    </View>
  );
};

export default RadioGroup;
