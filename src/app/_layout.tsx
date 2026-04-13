import { Stack } from "expo-router";
import "../../global.css";
import { I18nProvider } from "@/i18n/I18nProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

export default function RootLayout() {
  useFonts({
    ...Ionicons.font,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });

  return (
    <ThemeProvider>
      <I18nProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </I18nProvider>
    </ThemeProvider>
  );
}
