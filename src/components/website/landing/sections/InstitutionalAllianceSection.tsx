import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function AllianceCard({
  icon,
  accentColor,
  title,
  body,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap
  accentColor: string
  title: string
  body: string
  colors: ThemeColors
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 4,
        borderLeftColor: accentColor,
        borderRadius: 12,
        padding: 28,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: colors.brandTint,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons name={icon} size={22} color={accentColor} />
      </View>
      <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
        {title}
      </Text>
      <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22 }}>{body}</Text>
    </View>
  )
}

export default function InstitutionalAllianceSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.surfaceMuted, borderTopWidth: 1, borderTopColor: colors.border }}>
      <AnimatedSection variant="fadeUp">
        <View
          className="py-16 md:py-20 px-6"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
        >
          <View style={{ alignItems: "center", marginBottom: 40 }}>
            <View
              style={{
                backgroundColor: colors.brandTint,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
                {t("institutionalAlliance.eyebrow")}
              </Text>
            </View>
            <Text style={{ color: colors.ink, fontSize: 32, fontWeight: "800", letterSpacing: -0.6, textAlign: "center" }}>
              {t("institutionalAlliance.title")}
            </Text>
          </View>

          <View className="flex-col md:flex-row" style={{ gap: 20 }}>
            <AllianceCard
              icon="shield-checkmark-outline"
              accentColor={colors.brand}
              title={t("institutionalAlliance.coniTitle")}
              body={t("institutionalAlliance.coniBody")}
              colors={colors}
            />
            <AllianceCard
              icon="airplane-outline"
              accentColor={colors.gold}
              title={t("institutionalAlliance.routeTitle")}
              body={t("institutionalAlliance.routeBody")}
              colors={colors}
            />
          </View>
        </View>
      </AnimatedSection>
    </View>
  )
}
