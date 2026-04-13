import Navbar from "@/components/website/landing/Navbar";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function WebLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      {/* pt-16 offsets the fixed navbar (h-16 = 64px) */}
      <View style={{ paddingTop: 64, flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}
