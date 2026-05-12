import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Text, View } from "react-native";

function LogoPlaceholder({ label, colors }: { label: string; colors: ThemeColors }) {
  return (
    <View
      style={{
        width: 96,
        height: 96,
        borderRadius: 16,
        backgroundColor: colors.brandTint,
        borderWidth: 1.5,
        borderColor: colors.brand,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: colors.brand,
          fontSize: 9,
          fontWeight: "700",
          letterSpacing: 1,
          textTransform: "uppercase",
          textAlign: "center",
          paddingHorizontal: 6,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function SponsorCard({
  logoLabel,
  name,
  role,
  bio,
  delay,
  colors,
  t,
}: {
  logoLabel: string;
  name: string;
  role: string;
  bio: string;
  delay: number;
  colors: ThemeColors;
  t: (k: string) => string;
}) {
  return (
    <AnimatedSection variant="fadeUp" delay={delay}>
      <View
        style={{
          flex: 1,
          minWidth: 280,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 20,
          padding: 32,
          alignItems: "flex-start",
        }}
      >
        <LogoPlaceholder label={`${t("sponsors.logoPlaceholder")} ${logoLabel}`} colors={colors} />

        <Text style={{ color: colors.ink, fontSize: 20, fontWeight: "800", marginBottom: 8, lineHeight: 26 }}>
          {name}
        </Text>

        <View
          style={{
            backgroundColor: colors.goldTint,
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", letterSpacing: 0.5 }}>
            {role}
          </Text>
        </View>

        <View style={{ height: 1, backgroundColor: colors.border, width: "100%", marginBottom: 20 }} />

        <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 24 }}>
          {bio}
        </Text>
      </View>
    </AnimatedSection>
  );
}

export default function SponsorAlliesSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const sponsors = [
    {
      logoLabel: "MSR",
      name: t("sponsors.msrName"),
      role: t("sponsors.msrRole"),
      bio: t("sponsors.msrBody"),
    },
    {
      logoLabel: "Certosa",
      name: t("sponsors.certosaName"),
      role: t("sponsors.certosaRole"),
      bio: t("sponsors.certosaBody"),
    },
    {
      logoLabel: "Rete Sport",
      name: t("sponsors.retesportName"),
      role: t("sponsors.retesportRole"),
      bio: t("sponsors.retesportBody"),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <AnimatedSection variant="fadeUp">
          <View style={{ alignItems: "center", marginBottom: 56 }}>
            <View
              style={{
                backgroundColor: colors.brandTint,
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: 6,
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  color: colors.brand,
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {t("sponsors.sectionTag")}
              </Text>
            </View>

            <Text
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "800",
                letterSpacing: -0.8,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              {t("sponsors.sectionTitle")}
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
              {t("sponsors.subtitle")}
            </Text>
          </View>
        </AnimatedSection>

        <View className="flex-col md:flex-row" style={{ gap: 24 }}>
          {sponsors.map((s, i) => (
            <SponsorCard
              key={s.name}
              {...s}
              delay={i * 80}
              colors={colors}
              t={t}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
