import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

const BENEFITS = [
  "italyBenefit1",
  "italyBenefit2",
  "italyBenefit3",
  "italyBenefit4",
  "italyBenefit5",
] as const;

export default function SportItalySection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.surfaceElevated }}>
      <View
        className="py-14 md:py-20 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <AnimatedSection variant="fadeUp">
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                backgroundColor: colors.gold,
                borderRadius: 24,
                paddingHorizontal: 18,
                paddingVertical: 8,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                {t("sportPage.italyBadge")}
              </Text>
            </View>

            <Text
              style={{
                color: colors.ink,
                fontSize: 32,
                fontWeight: "800",
                letterSpacing: -0.6,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {t("sportPage.italyTitle")}
            </Text>

            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 16,
                lineHeight: 26,
                textAlign: "center",
                maxWidth: 560,
              }}
            >
              {t("sportPage.italySubtitle")}
            </Text>
          </View>
        </AnimatedSection>

        <View className="flex-col md:flex-row" style={{ gap: 16 }}>
          {BENEFITS.map((key, i) => (
            <AnimatedSection key={key} variant="fadeUp" delay={i * 80} style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 14,
                  backgroundColor: colors.surface,
                  borderRadius: 14,
                  padding: 20,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: colors.goldTint,
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: colors.gold,
                    }}
                  />
                </View>
                <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 23, flex: 1 }}>
                  {t(`sportPage.${key}`)}
                </Text>
              </View>
            </AnimatedSection>
          ))}
        </View>
      </View>
    </View>
  );
}
