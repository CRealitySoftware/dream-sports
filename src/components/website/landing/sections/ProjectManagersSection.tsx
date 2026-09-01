import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Image } from "expo-image";
import { Text, View } from "react-native";

function ManagerCard({ name, bio, uri }: { name: string; bio: string; uri: number }) {
  return (
    <View className="w-full md:flex-1" style={{ height: 460, borderRadius: 20, overflow: "hidden" }}>
      <Image
        source={uri}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        contentFit="cover"
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 24,
          backgroundColor: "rgba(8,8,20,0.55)",
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "800", marginBottom: 8 }}>
          {name}
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, lineHeight: 20 }}>
          {bio}
        </Text>
      </View>
    </View>
  );
}

function PartnerLogos({ colors }: { colors: ThemeColors }) {
  const logos = [
    require("@/assets/images/logos/12.png"),
    require("@/assets/images/logos/logo-variant.png"),
    require("@/assets/images/logos/13.png"),
  ];

  return (
    <View
      className="flex-row md:flex-col"
      style={{ alignItems: "center", justifyContent: "center", gap: 28, paddingVertical: 12 }}
    >
      {logos.map((src, i) => (
        <Image
          key={i}
          source={src}
          style={{ width: 88, height: 88, borderRadius: 12 }}
          contentFit="contain"
        />
      ))}
    </View>
  );
}

export default function ProjectManagersSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}>
      <AnimatedSection variant="fadeUp">
        <View className="py-20 md:py-24 px-6" style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
          <View style={{ alignItems: "center", marginBottom: 48 }}>
            <View
              style={{
                backgroundColor: colors.brandTint,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 16,
              }}
            >
              <Text style={{ color: colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
                {t("projectManagers.eyebrow")}
              </Text>
            </View>
            <Text style={{ color: colors.ink, fontSize: 36, fontWeight: "800", letterSpacing: -0.8, textAlign: "center" }}>
              {t("projectManagers.title")}
            </Text>
          </View>

          <View className="flex-col md:flex-row" style={{ gap: 24, alignItems: "stretch" }}>
            <ManagerCard
              name={t("projectManagers.person1Name")}
              bio={t("projectManagers.person1Bio")}
              uri={require("@/assets/images/vertical/9.png")}
            />
            <PartnerLogos colors={colors} />
            <ManagerCard
              name={t("projectManagers.person2Name")}
              bio={t("projectManagers.person2Bio")}
              uri={require("@/assets/images/uploads/soccer-celebration.jpg")}
            />
          </View>
        </View>
      </AnimatedSection>
    </View>
  );
}
