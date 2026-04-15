import Logo from "@/assets/images/logos/logo-variant.png";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function WhoWeAreSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <AnimatedSection variant="fadeIn">
        <View
          className="py-12 md:py-20 px-6"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
        >
          <View className="flex-col md:flex-row" style={{ gap: 48 }}>
            <View style={{ flex: 55 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <View
                  style={{
                    width: 3,
                    height: 36,
                    borderRadius: 2,
                    backgroundColor: colors.brand,
                    marginRight: 12,
                  }}
                />
                <Text
                  style={{
                    color: colors.brand,
                    fontSize: 11,
                    fontWeight: "700",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {t("quienesSomos.tag")}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.ink,
                  fontSize: 36,
                  fontWeight: "800",
                  lineHeight: 42,
                  letterSpacing: -0.8,
                  marginBottom: 28,
                }}
              >
                {t("whoWeAre.title")}
              </Text>
              {(["p1", "p2", "p3"] as const).map((key, i) => (
                <Text
                  key={key}
                  style={{
                    color: colors.inkMuted,
                    fontSize: 16,
                    lineHeight: 27,
                    marginBottom: i < 2 ? 16 : 0,
                  }}
                >
                  {t(`whoWeAre.${key}`)}
                </Text>
              ))}
            </View>

            <View style={{ flex: 45 }}>
              <View
                style={{
                  width: "100%",
                  aspectRatio: 4 / 3,
                  borderRadius: 16,
                  backgroundColor: colors.surface,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  source={Logo}
                  contentFit="contain"
                />
              </View>
            </View>
          </View>
        </View>
      </AnimatedSection>
    </View>
  )
}
