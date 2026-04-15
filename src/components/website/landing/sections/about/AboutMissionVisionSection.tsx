import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

function Card({
  label,
  body,
  accentColor,
  watermark,
}: {
  label: string
  body: string
  accentColor: string
  watermark: string
}) {
  const { colors } = useTheme()

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
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: 40,
          height: 3,
          borderRadius: 2,
          backgroundColor: accentColor,
          marginBottom: 24,
        }}
      />
      <Text
        style={{
          color: accentColor,
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 1.8,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: colors.ink,
          fontSize: 16,
          lineHeight: 29,
        }}
      >
        {body}
      </Text>
      <Text
        style={{
          position: "absolute",
          bottom: 12,
          right: 16,
          fontSize: 120,
          fontWeight: "900",
          color: accentColor,
          opacity: 0.04,
          pointerEvents: "none",
          userSelect: "none",
        } as any}
      >
        {watermark}
      </Text>
    </View>
  )
}

export default function AboutMissionVisionSection(
  { variant = "surface" }: { variant?: "surfaceMuted" | "surface" }
) {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors[variant] }}>
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
              label={t("aboutMissionVision.missionLabel")}
              body={t("aboutMissionVision.missionBody")}
              accentColor={colors.brand}
              watermark="M"
            />
            <Card
              label={t("aboutMissionVision.visionLabel")}
              body={t("aboutMissionVision.visionBody")}
              accentColor={colors.gold}
              watermark="V"
            />
          </View>
        </View>
      </AnimatedSection>
    </View>
  )
}
