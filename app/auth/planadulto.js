import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeftIcon } from "../../components/ui/Icons";
import { useRouter } from "expo-router";
import { StripeProvider } from "@stripe/stripe-react-native";
import Payment from "../../components/payment/Payment";
import { useState } from "react";

export default function planadulto() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const STRIPE_KEY =
    "pk_test_51QLMTZA0z2Im1xct4xPZTUnRjSgRlJN3QBYRHTXrO1fROLPSDi3Fj8HHMIk5DP6ONOjfEGB7IVQJdWWQL7I2ebUj00UMVT5P27";

  return (
    <View className="w-full flex-1">
      <View className="bg-secondaryBlue flex-row items-center w-full h-20">
        <TouchableOpacity onPress={() => router.push("/")} className="ml-4">
          <ArrowLeftIcon color="white" />
        </TouchableOpacity>
        <Text className="text-primaryBlue font-bold text-2xl ml-5">
          Plan de salud para adultos
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full mt-6 px-6">
          <Text className="text-base">
            Si tu perro ya es adulto ¡este es tu plan! Tu perro ha dejado de ser
            un cachorro, pero necesitará los mejores cuidados para alcanzar la
            madurez con el mejor estado de salud.
          </Text>
        </View>

        <View className="w-full flex-row my-4">
          <View className="w-[30%]">
            <View className="h-[45px] justify-center items-center"></View>
            <View className="h-[277px] border-y border-gray-400 justify-center items-center">
              <Text className="text-lg font-bold">
                Planes de vacunas y test preventivos
              </Text>
            </View>

            <View className="h-[150px] bg-primaryBlue border-b border-gray-400 justify-center items-center">
              <Text className="text-lg font-bold">
                Consultas y cuidados periódicos
              </Text>
            </View>

            <View className="h-[90px] border-b border-gray-400 justify-center items-center">
              <Text className="text-lg font-bold">Ventajas adicionales</Text>
            </View>
          </View>

          <View className="w-[45%] border-2 border-secondaryBlue">
            <View className="h-[45px]  bg-secondaryBlue justify-center items-center">
              <Text className="text-white text-lg">Servicios</Text>
            </View>

            <View className="h-[40px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Vacuna polivalente
              </Text>
            </View>

            <View className="h-[40px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">Vacuna rabia</Text>
            </View>

            <View className="h-[55px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Test leishmania (solo península) o filaria
              </Text>
            </View>

            <View className="h-[140px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Vacuna de Leishmania o Tos de las perreras (Preventivo Filaria o
                Tos de las perreras en clínicas de Canarias)
              </Text>
            </View>

            <View className="h-[50px] justify-center bg-primaryBlue items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Consultas con cita previa
              </Text>
            </View>

            <View className="h-[60px] justify-center bg-primaryBlue items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Consultas adicionales con cita previa
              </Text>
            </View>

            <View className="h-[40px] justify-center bg-primaryBlue items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Desparasitación interna
              </Text>
            </View>

            <View className="h-[40px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Descuento en cirugías
              </Text>
            </View>

            <View className="h-[50px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">
                Descuento en todos los servicios de la clínica
              </Text>
            </View>
          </View>

          <View className="w-[25%]">
            <View className="h-[45px] justify-center items-center border-2 border-blue-400">
              <Text className="text-blue-400 text-lg font-bold">Plan</Text>
            </View>
            <View className="h-[42px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">1</Text>
            </View>

            <View className="h-[40px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">1</Text>
            </View>

            <View className="h-[55px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">1</Text>
            </View>

            <View className="h-[140px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">1</Text>
            </View>

            <View className="h-[110px] justify-center bg-primaryBlue items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">Ilimitadas</Text>
            </View>

            <View className="h-[40px] justify-center bg-primaryBlue items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">4</Text>
            </View>

            <View className="h-[40px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">5%</Text>
            </View>

            <View className="h-[50px] justify-center items-center border-b border-gray-400">
              <Text className="text-secondaryBlue text-base">10%</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => setSuccess(true)}
        className="w-full bg-secondaryBlue h-14 justify-center items-center"
      >
        <Text className="text-lg font-bold text-white">
          Adquirir plan mensual por $450
        </Text>
      </TouchableOpacity>

      <StripeProvider publishableKey={STRIPE_KEY}>
        {success && (
          <Payment
            success={success}
            setSuccess={() => setSuccess(false)}
            pago={45000}
          />
        )}
      </StripeProvider>
    </View>
  );
}
