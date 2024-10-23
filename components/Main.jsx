import { View, Image } from "react-native";
import { Screen } from "./Screen";
import Header from "./Header";
import { CardCircle } from "./ui/card/CardCircle";
import { TitleText } from "./ui/Text";

const splashImage = require("../assets/slider.jpg");

export default function Main() {
  return (
    <Screen>
      <View className="w-full mb-5">
        <Header />
        <Image
          source={splashImage}
          className="w-full h-40 rounded-2xl"
          resizeMode="cover"
        />
      </View>
      <TitleText>Servicios</TitleText>
      <View className="flex-row flex-wrap justify-between w-full gap-y-4">
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
        <View className="w-[30%]">
          <CardCircle
            urlImage="https://cdn-icons-png.flaticon.com/512/219/219986.png"
            name="Urgencias"
          />
        </View>
      </View>
    </Screen>
  );
}
