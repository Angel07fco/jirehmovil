import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { BarsIcon } from "./ui/Icons";
import { Link, useNavigation } from "expo-router";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-lightBlue rounded-lg flex-row items-center justify-between mt-10 mb-10">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png",
          }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          {/* <Text className="font-bold text-lg text-darkBlue">
            Hola, buenos días!
          </Text>
          <Text className="text-gray-600">AngelMH</Text> */}
          <Link href="/auth/loginScreen">
            <Text className="font-bold text-lg text-darkBlue underline">
              Accede a JIREH
            </Text>
          </Link>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <BarsIcon size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
