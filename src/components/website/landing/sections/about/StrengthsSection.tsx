import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

const CARDS = [
  {
    num: "01",
    titleKey: "strengths.strength1Title",
    bodyKey: "strengths.strength1Body",
    tagKey: "strengths.strength1Tag",
    topBorder: "primary",
  },
  {
    num: "02",
    titleKey: "strengths.strength2Title",
    bodyKey: "strengths.strength2Body",
    tagKey: "strengths.strength2Tag",
    topBorder: "primary",
  },
  {
    num: "03",
    titleKey: "strengths.strength3Title",
    bodyKey: "strengths.strength3Body",
    tagKey: "strengths.strength3Tag",
    topBorder: "gold",
  },
] as const

export default function StrengthsSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <View
        className="py-12 md:py-20 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
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
              {t("strengths.eyebrow")}
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
            {t("strengths.title")}
          </Text>
        </View>

        <View className="flex-col md:flex-row" style={{ gap: 24 }}>
          {CARDS.map(({ num, titleKey, bodyKey, tagKey, topBorder }) => {
            const borderColor = topBorder === "primary" ? colors.brand : colors.gold

            return (
              <View
                key={num}
                style={{
                  flex: 1,
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderTopWidth: 3,
                  borderTopColor: borderColor,
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    backgroundColor: colors.brandTint,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      color: colors.brand,
                      fontSize: 18,
                      fontWeight: "700",
                    }}
                  >
                    {num}
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: colors.goldTint,
                    borderRadius: 999,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    marginBottom: 14,
                  }}
                >
                  <Text
                    style={{
                      color: colors.gold,
                      fontSize: 10,
                      fontWeight: "600",
                      letterSpacing: 1.2,
                      textTransform: "uppercase",
                    }}
                  >
                    {t(tagKey)}
                  </Text>
                </View>

                <Text
                  style={{
                    color: colors.ink,
                    fontSize: 17,
                    fontWeight: "700",
                    lineHeight: 24,
                    marginBottom: 12,
                  }}
                >
                  {t(titleKey)}
                </Text>

                <Text
                  style={{
                    color: colors.inkMuted,
                    fontSize: 14,
                    lineHeight: 24,
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
