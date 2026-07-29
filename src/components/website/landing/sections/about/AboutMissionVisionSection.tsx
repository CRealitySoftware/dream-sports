import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function Card({
  icon,
  title,
  items,
  accentColor,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap
  title: string
  items: string[]
  accentColor: string
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
        padding: 32,
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
      <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 16 }}>
        {title}
      </Text>
      <View style={{ gap: 12 }}>
        {items.map((item, i) => (
          <View key={i} style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
            <Ionicons name="checkmark-circle" size={16} color={accentColor} style={{ marginTop: 2 }} />
            <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22, flex: 1 }}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default function AboutMissionVisionSection(
  { variant = "surface" }: { variant?: "surfaceMuted" | "surface" }
) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  const logisticsItems = [
    t("aboutMissionVision.logisticsItem1"),
    t("aboutMissionVision.logisticsItem2"),
    t("aboutMissionVision.logisticsItem3"),
  ]
  const developmentItems = [
    t("aboutMissionVision.developmentItem1"),
    t("aboutMissionVision.developmentItem2"),
    t("aboutMissionVision.developmentItem3"),
  ]

  return (
    <View style={{ backgroundColor: colors[variant], borderTopWidth: 1, borderTopColor: colors.border }}>
      <AnimatedSection variant="fadeIn">
        <View
          className="py-12 md:py-20 px-6"
          style={{ maxWidth: 860, alignSelf: "center", width: "100%" }}
        >
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                backgroundColor: colors.brandTint,
                borderRadius: 999,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: colors.brand,
                  fontSize: 11,
                  fontWeight: "500",
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                {t("aboutMissionVision.eyebrow")}
              </Text>
            </View>
            <Text
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "800",
                lineHeight: 42,
                letterSpacing: -0.8,
                textAlign: "center",
              }}
            >
              {t("aboutMissionVision.title")}
            </Text>
          </View>

          <View className="flex-col md:flex-row" style={{ gap: 24 }}>
            <Card
              icon="home-outline"
              title={t("aboutMissionVision.logisticsLabel")}
              items={logisticsItems}
              accentColor={colors.brand}
              colors={colors}
            />
            <Card
              icon="barbell-outline"
              title={t("aboutMissionVision.developmentLabel")}
              items={developmentItems}
              accentColor={colors.gold}
              colors={colors}
            />
          </View>
        </View>
      </AnimatedSection>
    </View>
  )
}
