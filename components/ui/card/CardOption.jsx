import { View, Text, TouchableOpacity } from "react-native";
import { TitleText } from "../Text";

const CardOption = ({
  icon: IconComponent,
  iconSize = 36,
  title,
  rightIcon: RightIconComponent,
  rightIconSize = 36,
  onPress,
  style,
  styleText,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-center py-4 mb-6 bg-primaryBlue rounded-2xl ${style}`}
    >
      {/* Icono izquierdo */}
      <View className="w-1/5 items-center">
        {IconComponent && <IconComponent size={iconSize} />}
      </View>

      {/* Título */}
      <View className={`w-3/5 items-start`}>
        <TitleText style={`mb-0 ${styleText}`}>{title}</TitleText>
      </View>

      {/* Icono derecho */}
      <View className="w-1/5 items-center">
        {RightIconComponent && <RightIconComponent size={rightIconSize} />}
      </View>
    </TouchableOpacity>
  );
};

export default CardOption;
