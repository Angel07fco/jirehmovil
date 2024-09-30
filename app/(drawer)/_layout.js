import { Drawer } from "expo-router/drawer";
import { HomeIcon, InfoIcon } from "../../components/Icons";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
        },
        drawerActiveTintColor: "blue",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "About",
          drawerIcon: ({ color }) => <InfoIcon color={color} />,
        }}
      />
    </Drawer>
  );
}
