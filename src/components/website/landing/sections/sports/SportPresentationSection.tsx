import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SPORTS_IMAGES, BLURHASH } from "@/constants/image";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Image } from "expo-image";
import { Text, View } from "react-native";

interface Props {
  sportId: string;
}

export default function SportPresentationSection({ sportId }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const image = SPORTS_IMAGES[sportId as keyof typeof SPORTS_IMAGES];

  return (
    <View style={{ backgroundColor: colors.bg }}>
      <View
        className="py-14 md:py-20 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View className="flex-col md:flex-row" style={{ gap: 56, alignItems: "center" }}>

          <AnimatedSection variant="fadeLeft" style={{ flex: 55 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 3,
                  height: 32,
                  borderRadius: 2,
                  backgroundColor: colors.brand,
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
                {t(`disciplines.${sportId}.name`)}
              </Text>
            </View>

            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 16,
                lineHeight: 28,
              }}
            >
              {t(`sportPage.${sportId}.presentationBody`)}
            </Text>
          </AnimatedSection>

          <AnimatedSection variant="fadeRight" style={{ flex: 45 }}>
            <View
              style={{
                width: "100%",
                aspectRatio: 4 / 3,
                borderRadius: 16,
                backgroundColor: colors.surfaceElevated,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image ? (
                <Image
                  source={image}
                  placeholder={{ blurhash: BLURHASH }}
                  contentFit="cover"
                  style={{ width: "100%", height: "100%" }}
                />
              ) : (
                <Text
                  style={{
                    color: colors.inkMuted,
                    fontSize: 13,
                    fontWeight: "500",
                  }}
                >
                  {t("sportPage.referenceLabel")}
                </Text>
              )}
            </View>
          </AnimatedSection>
        </View>
      </View>
    </View>
  );
}
