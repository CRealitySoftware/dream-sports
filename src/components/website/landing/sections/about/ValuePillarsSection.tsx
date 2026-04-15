import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

const PILLARS = [
  { num: "01", titleKey: "valuePillars.pillar1Title", bodyKey: "valuePillars.pillar1Body", accent: "primary" },
  { num: "02", titleKey: "valuePillars.pillar2Title", bodyKey: "valuePillars.pillar2Body", accent: "gold" },
  { num: "03", titleKey: "valuePillars.pillar3Title", bodyKey: "valuePillars.pillar3Body", accent: "primary" },
  { num: "04", titleKey: "valuePillars.pillar4Title", bodyKey: "valuePillars.pillar4Body", accent: "gold" },
] as const

export default function ValuePillarsSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.surfaceElevated }}>
      <View
        className="py-12 md:py-20 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View
            style={{
              backgroundColor: colors.goldTint,
              borderRadius: 999,
              paddingHorizontal: 14,
              paddingVertical: 6,
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: colors.gold,
                fontSize: 11,
                fontWeight: "500",
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {t("valuePillars.eyebrow")}
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
            {t("valuePillars.title")}
          </Text>
        </View>

        <View className="flex-col md:flex-row md:flex-wrap" style={{ gap: 24 }}>
          {PILLARS.map(({ num, titleKey, bodyKey, accent }) => {
            const topBorderColor = accent === "primary" ? colors.brand : colors.gold

            return (
              <View
                key={num}
                style={{
                  flex: 1,
                  minWidth: 280,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderTopWidth: 3,
                  borderTopColor: topBorderColor,
                  borderRadius: 12,
                  padding: 24,
                }}
              >
                <Text
                  style={{
                    color: colors.gold,
                    fontSize: 28,
                    fontWeight: "700",
                    marginBottom: 12,
                  }}
                >
                  {num}
                </Text>

                <Text
                  style={{
                    color: colors.ink,
                    fontSize: 17,
                    fontWeight: "700",
                    lineHeight: 24,
                    marginBottom: 8,
                  }}
                >
                  {t(titleKey)}
                </Text>

                <Text
                  style={{
                    color: colors.inkMuted,
                    fontSize: 14,
                    lineHeight: 22,
                  }}
                >
                  {t(bodyKey)}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
