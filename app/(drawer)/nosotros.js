import { Text, View, ScrollView, Image } from "react-native";
import { Screen } from "../../components/Screen";
import Header from "../../components/Header";
import { TitleText } from "../../components/ui/Text";
import CardValores from "../../components/ui/card/CardValores";

export default function nosotros() {
  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="w-full mb-5">
          <Header />

          <View className="flex-row items-center mb-5">
            <View className="w-1/2">
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dl8odylct/image/upload/v1710516024/jireh/quienesomos1_xz4ogi.png",
                }}
                className="w-full h-40 mr-5"
              />
            </View>
            <View className="w-1/2">
              <Text className="text-secondaryBlue font-bold text-6xl">
                100%
              </Text>
              <Text className="text-secondaryBlue font-bold text-5xl">
                Am💙r
              </Text>
              <Text className="text-secondaryBlue font-bold text-xl">
                Por los animalitos
              </Text>
            </View>
          </View>

          <Text className="text-secondaryBlue text-lg mb-8">
            En Clínica Veterinaria Jireh, somos un equipo de amantes de los
            animales que comparten una pasión por brindar el mejor cuidado
            posible.
          </Text>

          <TitleText>Conoce nuestra</TitleText>
          <View className="bg-secondaryBlue rounded-lg p-4">
            <Text className="text-primaryBlue font-bold text-lg text-center">
              Misión
            </Text>
            <View className="w-full p-2 rounded-lg bg-primaryBlue mt-2">
              <Text className="font-bold text-secondaryBlue">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dicta tempore consequatur
              </Text>
            </View>
          </View>
          <View className="bg-primaryBlue rounded-lg p-4 mt-4 mb-8">
            <Text className="text-secondaryBlue font-bold text-lg text-center">
              Visión
            </Text>
            <View className="w-full p-2 rounded-lg bg-secondaryBlue mt-2">
              <Text className="font-bold text-primaryBlue">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                dicta tempore consequatur
              </Text>
            </View>
          </View>

          <TitleText>Valores de JIREH</TitleText>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            <View>
              <CardValores
                imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1710531456/jireh/etica_ygg1sx.webp"
                textValor="Ética profesional"
              />
            </View>
            <View className="mx-6">
              <CardValores
                imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1710531454/jireh/respeto_prwdot.webp"
                textValor="Respeto"
              />
            </View>
            <View className="mx-6">
              <CardValores
                imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1710531458/jireh/transparencia_nqmujj.jpg"
                textValor="Transparencia"
              />
            </View>
            <View className="mx-6">
              <CardValores
                imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1710531456/jireh/honestidad_nfegfl.jpg"
                textValor="Honestidad"
              />
            </View>
            <View className="mx-6">
              <CardValores
                imagenUri="https://res.cloudinary.com/dl8odylct/image/upload/v1710531455/jireh/empatia_vexmeq.jpg"
                textValor="Empatía"
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </Screen>
  );
}
