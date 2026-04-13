import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Pressable, Text, View } from "react-native";

const STEPS = [
  { n: "1", numKey: "step1Number", titleKey: "step1Title", dateKey: "step1Date", bodyKey: "step1Body" },
  { n: "2", numKey: "step2Number", titleKey: "step2Title", dateKey: "step2Date", bodyKey: "step2Body" },
  { n: "3", numKey: "step3Number", titleKey: "step3Title", dateKey: "step3Date", bodyKey: "step3Body" },
  { n: "4", numKey: "step4Number", titleKey: "step4Title", dateKey: "step4Date", bodyKey: "step4Body" },
] as const;

function StepCircle({
  label,
  isFirst,
  size,
  colors,
}: {
  label: string;
  isFirst: boolean;
  size: number;
  colors: ThemeColors;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: isFirst ? colors.gold : colors.brand,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Text
        style={{
          color: isFirst ? colors.ctaText : "rgba(255,255,255,1)",
          fontSize: size === 48 ? 15 : 13,
          fontWeight: "800",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function DesktopTimeline({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View className="hidden md:flex" style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          top: 24,
          left: "12.5%",
          right: "12.5%",
          height: 1,
          backgroundColor: colors.border,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {STEPS.map((step, i) => (
          <View key={step.n} style={{ flex: 1, alignItems: "center", paddingHorizontal: 8 }}>
            <StepCircle
              label={t(`experience.${step.numKey}`)}
              isFirst={i === 0}
              size={48}
              colors={colors}
            />
            <Text
              style={{
                color: colors.ink,
                fontSize: 15,
                fontWeight: "800",
                marginTop: 16,
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              {t(`experience.${step.titleKey}`)}
            </Text>
            <Text
              style={{
                color: colors.gold,
                fontSize: 11,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginBottom: 10,
                textAlign: "center",
              }}
            >
              {t(`experience.${step.dateKey}`)}
            </Text>
            <Text
              numberOfLines={3}
              style={{
                color: colors.inkMuted,
                fontSize: 13,
                lineHeight: 20,
                textAlign: "center",
              }}
            >
              {t(`experience.${step.bodyKey}`)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function MobileTimeline({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View className="flex md:hidden" style={{ gap: 0 }}>
      {STEPS.map((step, i) => (
        <View key={step.n} style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ alignItems: "center", width: 40 }}>
            <StepCircle
              label={t(`experience.${step.numKey}`)}
              isFirst={i === 0}
              size={40}
              colors={colors}
            />
            {i < STEPS.length - 1 && (
              <View
                style={{
                  width: 1,
                  flex: 1,
                  minHeight: 24,
                  backgroundColor: colors.border,
                  marginTop: 4,
                  marginBottom: 4,
                }}
              />
            )}
          </View>
          <View style={{ flex: 1, paddingBottom: i < STEPS.length - 1 ? 28 : 0, paddingTop: 8 }}>
            <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "800", marginBottom: 3 }}>
              {t(`experience.${step.titleKey}`)}
            </Text>
            <Text
              style={{
                color: colors.gold,
                fontSize: 11,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginBottom: 6,
              }}
            >
              {t(`experience.${step.dateKey}`)}
            </Text>
            <Text
              numberOfLines={3}
              style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 20 }}
            >
              {t(`experience.${step.bodyKey}`)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default function ExperienceSection({
  onScrollToRegister,
}: {
  onScrollToRegister?: () => void;
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View
      nativeID="experiencia"
      style={{
        backgroundColor: colors.surfaceElevated,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
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
              {t("experience.sectionTag")}
            </Text>
          </View>
          <Text
            style={{
              color: colors.ink,
              fontSize: 36,
              fontWeight: "800",
              letterSpacing: -0.8,
              textAlign: "center",
            }}
          >
            {t("experience.sectionTitle")}
          </Text>
        </View>

        <DesktopTimeline t={t} colors={colors} />
        <MobileTimeline t={t} colors={colors} />

        <View style={{ alignItems: "center", marginTop: 64 }}>
          <Text
            style={{
              color: colors.inkMuted,
              fontSize: 15,
              lineHeight: 26,
              textAlign: "center",
              maxWidth: 600,
              marginBottom: 32,
            }}
          >
            {t("experience.closingText")}
          </Text>
          <Pressable
            onPress={onScrollToRegister}
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? colors.gold : colors.cta,
              paddingHorizontal: 36,
              paddingVertical: 16,
              borderRadius: 40,
              opacity: pressed ? 0.9 : 1,
            })}
          >
            <Text
              style={{
                color: colors.ctaText,
                fontSize: 15,
                fontWeight: "800",
                letterSpacing: 0.3,
              }}
            >
              {t("experience.cta")}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
