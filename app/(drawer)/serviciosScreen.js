import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { Screen } from "../../components/Screen";
import Header from "../../components/Header";
import { TitleText } from "../../components/ui/Text";
import CardServicios from "../../components/ui/card/CardServicios";
import { useRouter } from "expo-router";
import { getServices } from "../../lib/services";

export default function Index() {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServices();
      if (!data.error) {
        setServices(data);
      } else {
        console.error("Error fetching services:", data.error);
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
          <TitleText>Servicios</TitleText>
          {services.map((service) => (
            <CardServicios
              key={service._id}
              imageUrl={service.img}
              title={service.name}
              description={service.description}
              onPress={() =>
                router.push({
                  pathname: "/auth/detallesScreen",
                  params: {
                    service: JSON.stringify(service),
                  },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
