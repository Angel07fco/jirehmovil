import React from "react";
import { Text } from "react-native";

// Componente para títulos grandes
export const TitleText = ({ children, style }) => {
  return (
    <Text className={`text-xl text-secondaryBlue font-bold mb-4 ${style}`}>
      {children}
    </Text>
  );
};

// Componente para subtítulos o instrucciones
export const SubTitleText = ({ children, style }) => {
  return (
    <Text className={`mb-2 font-semibold text-secondaryBlue ${style}`}>
      {children}
    </Text>
  );
};

// Componente para párrafos o texto estándar
export const BodyText = ({ children, style }) => {
  return (
    <Text className={`text-base text-secondaryBlue ${style}`}>{children}</Text>
  );
};
