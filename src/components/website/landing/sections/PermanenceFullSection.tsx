import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function PermanenceFullSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}>
      <AnimatedSection variant="fadeUp">
        <View className="py-20 md:py-24 px-6" style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
          <Text style={{ color: colors.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.6, marginBottom: 12 }}>
            {t("experience.permanenceTitle")}
          </Text>
          <View style={{ width: 48, height: 3, borderRadius: 2, backgroundColor: colors.gold, marginBottom: 40 }} />

          <View className="flex-col md:flex-row" style={{ gap: 32, alignItems: "stretch" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: colors.surfaceMuted,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 16,
                padding: 28,
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <Ionicons name="ribbon-outline" size={20} color={colors.gold} />
                <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800" }}>
                  {t("experience.permanenceCardTitle")}
                </Text>
              </View>
              <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22, marginBottom: 20 }}>
                {t("experience.permanenceBody")}
              </Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Ionicons name="checkmark-circle" size={16} color={colors.brand} style={{ marginTop: 2 }} />
                <Text style={{ color: colors.ink, fontSize: 13, lineHeight: 20, fontWeight: "700", flex: 1 }}>
                  {t("experience.permanenceNote")}
                </Text>
              </View>
            </View>

            <View className="w-full md:flex-1" style={{ minHeight: 280, borderRadius: 16, overflow: "hidden" }}>
              <Image
                source={require("@/assets/images/horizontal/convenios.jpg")}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>
          </View>
        </View>
      </AnimatedSection>
    </View>
  );
}
