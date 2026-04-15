import Logo from "@/assets/images/logos/logo-variant.png";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function QuienesSomosSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View
      nativeID="quienes-somos"
      style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View className="flex-col md:flex-row" style={{ gap: 64 }}>
          <View style={{ flex: 1, minWidth: 0 }}>
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
                fontSize: 40,
                fontWeight: "800",
                lineHeight: 46,
                letterSpacing: -1,
                marginBottom: 32,
              }}
            >
              {t("quienesSomos.title")}
            </Text>
            {(["body1", "body2", "body3"] as const).map((key, i) => (
              <Text
                key={key}
                style={{
                  color: colors.inkMuted,
                  fontSize: 16,
                  lineHeight: 28,
                  marginBottom: i < 2 ? 20 : 32,
                }}
              >
                {t(`quienesSomos.${key}`)}
              </Text>
            ))}
            <Link
              href={"/(web)/about"}
            >
              <Pressable
                style={({ pressed, hovered }: any) => ({
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  borderWidth: 1.5,
                  borderColor: pressed || hovered ? colors.brand : colors.border,
                  backgroundColor: "transparent",
                })}
              >
                <Text
                  style={{ color: colors.brand, fontSize: 14, fontWeight: "700", letterSpacing: 0.3 }}
                >
                  {t("quienesSomos.cta")}
                </Text>
                <Text style={{ color: colors.brand, fontSize: 16, lineHeight: 18 }}>→</Text>
              </Pressable>
            </Link>
          </View>
          <View className="w-full md:w-5/12" style={{ alignSelf: "flex-start" }}>
            <View
              style={{
                width: "100%",
                aspectRatio: 4 / 3,
                borderRadius: 16,
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
    </View>
  )
}
