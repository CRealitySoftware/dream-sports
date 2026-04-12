import Footer from "@/components/website/landing/Footer";
import Navbar from "@/components/website/landing/Navbar";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function WebLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <Stack screenOptions={{ headerShown: false }} />
      <Footer />
    </View>
  );
}
