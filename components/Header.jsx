import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { BarsIcon } from "./ui/Icons";
import { Link, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { obtenerInfoUser } from "../lib/auth";

const DEFAULT_IMAGE = "https://cdn-icons-png.flaticon.com/512/219/219986.png";

const Header = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        const token = await AsyncStorage.getItem("userEmail");

        if (token) {
          const userInfo = await obtenerInfoUser(token);
          setUser(userInfo);
        }

        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser((prev) => ({ ...prev, ...parsedUser }));
        }
      } catch (error) {
        console.error("Error al obtener el usuario de AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="bg-lightBlue rounded-lg flex-row items-center justify-between mt-5 mb-10">
      <View className="flex-row items-center">
        <Image
          source={{
            uri: user?.imagen || DEFAULT_IMAGE,
          }}
          className="w-12 h-12 rounded-full mr-4"
        />
        <View>
          {user ? (
            <>
              <Text className="font-bold text-lg text-darkBlue">
                Hola, buenos días!
              </Text>
              <Text className="font-bold text-lg text-darkBlue">
                {user.user}
              </Text>
            </>
          ) : (
            <Link href="/auth/loginScreen">
              <Text className="font-bold text-lg text-darkBlue underline">
                Accede a JIREH
              </Text>
            </Link>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <BarsIcon size={28} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
