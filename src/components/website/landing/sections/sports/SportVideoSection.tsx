import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

export default function SportVideoSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <View
        className="py-14 md:py-20 px-6"
        style={{ maxWidth: 720, alignSelf: "center", width: "100%" }}
      >
        <AnimatedSection variant="fadeUp">
          <Text
            style={{
              color: colors.ink,
              fontSize: 28,
              fontWeight: "800",
              letterSpacing: -0.5,
              textAlign: "center",
              marginBottom: 10,
            }}
          >
            {t("sportPage.videoTitle")}
          </Text>

          <Text
            style={{
              color: colors.inkMuted,
              fontSize: 15,
              lineHeight: 25,
              textAlign: "center",
              marginBottom: 36,
            }}
          >
            {t("sportPage.videoSubtitle")}
          </Text>

          <View
            style={{
              width: "100%",
              aspectRatio: 16 / 9,
              borderRadius: 16,
              backgroundColor: colors.surfaceElevated,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.brandTint,
                borderWidth: 2,
                borderColor: colors.brand,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 0,
                  height: 0,
                  borderTopWidth: 10,
                  borderBottomWidth: 10,
                  borderLeftWidth: 18,
                  borderTopColor: "transparent",
                  borderBottomColor: "transparent",
                  borderLeftColor: colors.brand,
                  marginLeft: 4,
                }}
              />
            </View>
            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              {t("sportPage.videoPending")}
            </Text>
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}
