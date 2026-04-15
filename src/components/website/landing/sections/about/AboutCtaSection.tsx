import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AboutCtaSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const { push } = useRouter()

  return (
    <View style={{ backgroundColor: colors.brand }}>
      <View
        className="py-16 md:py-20 px-6"
        style={{ maxWidth: 640, alignSelf: "center", width: "100%", alignItems: "center" }}
      >

        <Text
          className="text-[26px] md:text-[32px]"
          style={{
            color: "#FFFFFF",
            fontWeight: "800",
            lineHeight: 36,
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          {t("aboutCta.title")}
        </Text>

        <Text
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 16,
            lineHeight: 26,
            textAlign: "center",
            maxWidth: 500,
            marginBottom: 40,
          }}
        >
          {t("aboutCta.subtitle")}
        </Text>

        <View
          className="flex-col md:flex-row"
          style={{ gap: 12, alignItems: "center", justifyContent: "center" }}
        >
          <Pressable
            onPress={() => push("/(web)/register")}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? colors.cta : colors.gold,
              borderRadius: 28,
              paddingVertical: 14,
              paddingHorizontal: 32,
            })}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
              {t("aboutCta.primaryCta")}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => push("/(web)/sports")}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.2)",
              borderWidth: 1,
              borderColor: "rgba(255,255,255,0.4)",
              borderRadius: 28,
              paddingVertical: 14,
              paddingHorizontal: 32,
            })}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
              {t("aboutCta.secondaryCta")}
            </Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            textAlign: "center",
            letterSpacing: 0.4,
            marginTop: 24,
          }}
        >
          {t("aboutCta.note")}
        </Text>

        <View
          style={{
            width: 60,
            height: 2,
            borderRadius: 1,
            backgroundColor: colors.gold,
            marginTop: 32,
          }}
        />
      </View>
    </View>
  )
}
