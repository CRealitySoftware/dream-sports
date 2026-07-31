import WhatsAppButton from "@/components/ui/WhatsAppButton";
import Navbar from "@/components/website/landing/Navbar";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import { View } from "react-native";

export default function WebLayout() {
  return (
    <>
      <Head>
        <title>Dream Sports International</title>
        <meta name="description" content="Programa internacional que conecta talento deportivo colombiano con el ecosistema profesional europeo. Fútbol, baloncesto y voleibol. Roma 2026." />
      </Head>
      <View style={{ flex: 1 }}>
        <Navbar />
        <View style={{ paddingTop: 64, flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        <WhatsAppButton />
      </View>
    </>
  );
}
