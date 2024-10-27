import { View, Image, ScrollView } from "react-native";
import { Screen } from "./Screen";
import Header from "./Header";
import { CardCircle } from "./ui/card/CardCircle";
import { TitleText } from "./ui/Text";
import CardPlanVet from "./ui/card/CardPlanVet";

const splashImage = require("../assets/slider.jpg");

export default function Main() {
  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
          <Image
            source={splashImage}
            className="w-full h-40 rounded-2xl"
            resizeMode="cover"
          />
        </View>
        <TitleText>Servicios</TitleText>
        <View className="flex-row flex-wrap justify-between w-full gap-y-4 mb-8">
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
        <TitleText>Planes de salud para Perros</TitleText>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          <View>
            <CardPlanVet
              imageUrl="https://static.vecteezy.com/system/resources/previews/004/808/886/non_2x/little-cute-animal-doctor-veterinarian-dog-puppy-cartoon-pet-health-care-vector.jpg"
              name="MVZ. Eddi Vidal"
              title="Médico Veterinario"
              onPress={() => console.log("VetCard 1 presionado")}
            />
          </View>
          <View className="mx-8">
            <CardPlanVet
              imageUrl="https://static.vecteezy.com/system/resources/previews/004/808/886/non_2x/little-cute-animal-doctor-veterinarian-dog-puppy-cartoon-pet-health-care-vector.jpg"
              name="MVZ. Eddi Vidal"
              title="Médico Veterinario"
              onPress={() => console.log("VetCard 1 presionado")}
            />
          </View>
          <View>
            <CardPlanVet
              imageUrl="https://static.vecteezy.com/system/resources/previews/004/808/886/non_2x/little-cute-animal-doctor-veterinarian-dog-puppy-cartoon-pet-health-care-vector.jpg"
              name="MVZ. Eddi Vidal"
              title="Médico Veterinario"
              onPress={() => console.log("VetCard 1 presionado")}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </Screen>
  );
}
