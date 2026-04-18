import { AuthProvider } from "@/providers/AuthProvider";
import { Stack } from "expo-router";

export default function BackofficeLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
