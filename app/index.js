import { Redirect } from "expo-router";

export default function Index() {
  // Redirige a la pantalla de autenticación o a Drawer
  return <Redirect href="/auth/Splash" />;
}
