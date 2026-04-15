import { BLURHASH, SPORTS_IMAGES } from "@/constants/image";
import { useTranslation } from "@/i18n/I18nProvider";
import { Image } from "expo-image";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

interface Props {
  sportId: string;
}

export default function SportHeroSection({ sportId }: Props) {
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const minHeight = height * (isDesktop ? 0.65 : 0.55);
  const image = SPORTS_IMAGES[sportId as keyof typeof SPORTS_IMAGES];

  return (
    <View style={{ minHeight, backgroundColor: "#020D38", overflow: "hidden", position: "relative" }}>
      {image && (
        <Image
          source={image}
          placeholder={{ blurhash: BLURHASH }}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: "rgba(2,13,56,0.67)" }]} />

      <View
        style={{
          flex: 1,
          minHeight,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingTop: 80,
          paddingBottom: 80,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Text
          style={{
            color: "rgba(255,255,255,0.55)",
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 2.5,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          {t(`disciplines.${sportId}.name`)}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderWidth: 1,
            borderColor: "rgba(201,162,39,0.4)",
            backgroundColor: "rgba(201,162,39,0.1)",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginBottom: 36,
          }}
        >
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: "#C9A227" }} />
          <Text
            style={{
              color: "rgba(220,178,60,1)",
              fontSize: 12,
              fontWeight: "600",
              letterSpacing: 1.1,
              textTransform: "uppercase",
            }}
          >
            {t(`sportPage.${sportId}.selectionDate`)}
          </Text>
        </View>

        <Text
          style={{
            color: "#ffffff",
            fontSize: isDesktop ? 52 : 34,
            fontWeight: "900",
            textAlign: "center",
            lineHeight: isDesktop ? 60 : 42,
            letterSpacing: -1.2,
            maxWidth: 700,
          }}
        >
          {t(`sportPage.${sportId}.headline`)}
        </Text>
      </View>
    </View>
  );
}
