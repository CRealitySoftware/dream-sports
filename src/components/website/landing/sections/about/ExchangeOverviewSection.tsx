import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

const STATS = [
  { valueKey: "exchangeOverview.stat1Value", labelKey: "exchangeOverview.stat1Label" },
  { valueKey: "exchangeOverview.stat2Value", labelKey: "exchangeOverview.stat2Label" },
  { valueKey: "exchangeOverview.stat3Value", labelKey: "exchangeOverview.stat3Label" },
  { valueKey: "exchangeOverview.stat4Value", labelKey: "exchangeOverview.stat4Label" },
] as const

const OBJECTIVES = [
  "exchangeOverview.obj1",
  "exchangeOverview.obj2",
  "exchangeOverview.obj3",
  "exchangeOverview.obj4",
  "exchangeOverview.obj5",
] as const

const OPPORTUNITIES = [
  "exchangeOverview.opp1",
  "exchangeOverview.opp2",
  "exchangeOverview.opp3",
  "exchangeOverview.opp4",
  "exchangeOverview.opp5",
] as const

export default function ExchangeOverviewSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.surfaceElevated }}>
      <View
        className="py-12 md:py-20 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View style={{ alignItems: "center", marginBottom: 16 }}>
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
              {t("exchangeOverview.eyebrow")}
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
            {t("exchangeOverview.title")}
          </Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <Text
            style={{
              color: colors.inkMuted,
              fontSize: 16,
              lineHeight: 27,
              textAlign: "center",
              maxWidth: 680,
            }}
          >
            {t("exchangeOverview.intro")}
          </Text>
        </View>

        <View
          className="flex-row flex-wrap"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 12,
            backgroundColor: colors.surface,
            marginBottom: 48,
            overflow: "hidden",
          }}
        >
          {STATS.map(({ valueKey, labelKey }, i) => (
            <View
              key={valueKey}
              className="w-1/2 md:flex-1"
              style={{
                alignItems: "center",
                paddingVertical: 24,
                paddingHorizontal: 16,
                borderRightWidth: i < 3 ? 1 : 0,
                borderRightColor: colors.border,
                borderBottomWidth: i < 2 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: colors.brand,
                  fontSize: 32,
                  fontWeight: "800",
                  letterSpacing: -1,
                  lineHeight: 36,
                }}
              >
                {t(valueKey)}
              </Text>
              <Text
                style={{
                  color: colors.inkMuted,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: 4,
                  letterSpacing: 0.3,
                }}
              >
                {t(labelKey)}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-col md:flex-row" style={{ gap: 40 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderTopWidth: 3,
                borderTopColor: colors.brand,
                borderRadius: 12,
                padding: 24,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: colors.ink,
                  fontSize: 17,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                {t("exchangeOverview.objectivesTitle")}
              </Text>
              {OBJECTIVES.map((key) => (
                <View key={key} style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: colors.brand,
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 24, flex: 1 }}>
                    {t(key)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderTopWidth: 3,
                borderTopColor: colors.gold,
                borderRadius: 12,
                padding: 24,
                flex: 1,
              }}
            >
              <Text
                style={{
                  color: colors.ink,
                  fontSize: 17,
                  fontWeight: "700",
                  marginBottom: 16,
                }}
              >
                {t("exchangeOverview.opportunitiesTitle")}
              </Text>
              {OPPORTUNITIES.map((key) => (
                <View key={key} style={{ flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: colors.gold,
                      transform: [{ rotate: "45deg" }],
                      marginTop: 7,
                      flexShrink: 0,
                    }}
                  />
                  <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 24, flex: 1 }}>
                    {t(key)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
