import { Redirect } from "expo-router";

export default function Layout() {
  // Redirige a la pantalla de autenticación o a Drawer
  return <Redirect href="/auth/Splash" />;
}
