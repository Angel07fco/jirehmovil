import { View, Image, ScrollView, ActivityIndicator } from "react-native";
import { Screen } from "./Screen";
import Header from "./Header";
import { CardCircle } from "./ui/card/CardCircle";
import { TitleText } from "./ui/Text";
import CardPlanVet from "./ui/card/CardPlanVet";
import { getServices } from "../lib/services";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Main() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      if (!data.error) {
        setServices(data);
      } else {
        return;
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />
        </View>
        <TitleText>Servicios</TitleText>
        <View className="flex-row flex-wrap justify-between w-full gap-y-4 mb-8">
          {services.map((service) => (
            <View key={service._id} className="w-[30%]">
              <CardCircle
                urlImage={service.icono}
                name={service.name}
                onPress={() =>
                  router.push({
                    pathname: "/auth/detallesScreen",
                    params: {
                      service: JSON.stringify(service),
                    },
                  })
                }
              />
            </View>
          ))}
        </View>

        <TitleText>Planes de salud para Perros</TitleText>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mb-5"
        >
          <View className="ml-4">
            <CardPlanVet
              imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1731637982/jireh/plan_cachorro_x2kr3t.png"
              name="Plan Cachorro"
              title="Ver más"
              onPress={() => router.push("/auth/plancachorro")}
            />
          </View>
          <View className="mx-8">
            <CardPlanVet
              imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1731637983/jireh/plan_adulto_ndfmbu.png"
              name="Plan Adulto"
              title="Ver más"
              onPress={() => router.push("/auth/planadulto")}
            />
          </View>
          <View className="mr-4">
            <CardPlanVet
              imageUrl="https://res.cloudinary.com/dl8odylct/image/upload/v1731637983/jireh/plan_senior_lnt0qd.png"
              name="Plan Senior"
              title="Ver más"
              onPress={() => router.push("/auth/plansenior")}
            />
          </View>
        </ScrollView>
      </ScrollView>
    </Screen>
  );
}
