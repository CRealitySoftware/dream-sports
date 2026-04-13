import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import type { ThemeColors } from "@/providers/ThemeProvider";

type CardProps = {
  title: string;
  body: string;
  accentColor: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  colors: ThemeColors;
};

function Card({ title, body, accentColor, iconName, colors }: CardProps) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: accentColor,
        padding: 32,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          borderWidth: 1.5,
          borderColor: accentColor,
          opacity: 0.6,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons name={iconName} size={20} color={accentColor} />
      </View>

      <Text
        style={{
          color: accentColor,
          fontSize: 13,
          fontWeight: "800",
          letterSpacing: 2.5,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
      >
        {title}
      </Text>

      <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 26 }}>
        {body}
      </Text>
    </View>
  );
}

export default function MissionVisionSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View
      nativeID="mision-vision"
      style={{
        backgroundColor: colors.surfaceMuted,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View className="flex-col md:flex-row" style={{ gap: 24 }}>
          <Card
            title={t("missionVision.missionTitle")}
            body={t("missionVision.missionBody")}
            accentColor={colors.brand}
            iconName="rocket-outline"
            colors={colors}
          />
          <Card
            title={t("missionVision.visionTitle")}
            body={t("missionVision.visionBody")}
            accentColor={colors.gold}
            iconName="earth-outline"
            colors={colors}
          />
        </View>
      </View>
    </View>
  );
}
