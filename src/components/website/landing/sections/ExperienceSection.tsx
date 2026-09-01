import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

const STEPS = [
  { n: "1", numKey: "step1Number", titleKey: "step1Title", dateKey: "step1Date", bodyKey: "step1Body" },
  { n: "2", numKey: "step2Number", titleKey: "step2Title", dateKey: "step2Date", bodyKey: "step2Body" },
  { n: "3", numKey: "step3Number", titleKey: "step3Title", dateKey: "step3Date", bodyKey: "step3Body" },
  { n: "4", numKey: "step4Number", titleKey: "step4Title", dateKey: "step4Date", bodyKey: "step4Body" },
] as const

function StepCircle({
  label,
  isFirst,
  size,
  colors,
}: {
  label: string
  isFirst: boolean
  size: number
  colors: ThemeColors
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
  )
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
  )
}

function PermanenceCard({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 4,
        borderLeftColor: colors.brand,
        borderRadius: 12,
        padding: 28,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: colors.brandTint,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>
          {t("experience.permanenceTag")}
        </Text>
      </View>
      <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 10 }}>
        {t("experience.permanenceTitle")}
      </Text>
      <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22, marginBottom: 14 }}>
        {t("experience.permanenceBody")}
      </Text>
      <Text style={{ color: colors.ink, fontSize: 13, lineHeight: 20, fontWeight: "700" }}>
        {t("experience.permanenceNote")}
      </Text>
    </View>
  )
}

function LegalCard({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const items = ["legalItem1", "legalItem2", "legalItem3"] as const

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 4,
        borderLeftColor: colors.gold,
        borderRadius: 12,
        padding: 28,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: colors.goldTint,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>
          {t("experience.legalTag")}
        </Text>
      </View>
      <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 14 }}>
        {t("experience.legalTitle")}
      </Text>
      <View style={{ gap: 12 }}>
        {items.map((key) => (
          <View key={key} style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
            <Ionicons name="checkmark-circle" size={16} color={colors.gold} style={{ marginTop: 2 }} />
            <Text style={{ color: colors.inkMuted, fontSize: 13, lineHeight: 20, flex: 1 }}>
              {t(`experience.${key}`)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const VILLA_FACILITIES_PREVIEW = [
  { labelKey: "experienceFull.villaFacilityGreenLabel", uri: require("@/assets/images/rooms/5.jpeg") },
  { labelKey: "experienceFull.villaFacilityPoolLabel", uri: require("@/assets/images/rooms/3.jpeg") },
  { labelKey: "experienceFull.villaFacilityHouseLabel", uri: require("@/assets/images/rooms/4.jpeg") },
  { labelKey: "experienceFull.villaFacilityCommonLabel", uri: require("@/assets/images/rooms/6.jpeg") },
] as const

function VillaPreviewCard({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const { push } = useRouter()

  return (
    <View style={{ marginTop: 56 }}>
      <View
        className="flex-col md:flex-row"
        style={{ justifyContent: "space-between", alignItems: "center", gap: 16, marginBottom: 24 }}
      >
        <View>
          <View
            style={{
              backgroundColor: colors.goldTint,
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 5,
              alignSelf: "flex-start",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: colors.gold, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>
              {t("experience.villaPreviewTag")}
            </Text>
          </View>
          <Text style={{ color: colors.ink, fontSize: 22, fontWeight: "800" }}>
            {t("experience.villaPreviewTitle")}
          </Text>
        </View>
        <Pressable
          onPress={() => push("/(web)/experience")}
          style={({ pressed }: any) => ({
            backgroundColor: pressed ? colors.gold : colors.cta,
            borderRadius: 24,
            paddingVertical: 12,
            paddingHorizontal: 24,
          })}
        >
          <Text style={{ color: colors.ctaText, fontSize: 14, fontWeight: "800" }}>
            {t("experience.villaPreviewCta")}
          </Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }}>
        {VILLA_FACILITIES_PREVIEW.map((f) => (
          <View
            key={f.labelKey}
            style={{
              width: "48%",
              borderRadius: 14,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Image source={f.uri} style={{ width: "100%", height: 150 }} contentFit="cover" />
            <View style={{ paddingVertical: 10, backgroundColor: colors.surface }}>
              <Text style={{ color: colors.ink, fontSize: 13, fontWeight: "700", textAlign: "center" }}>
                {t(f.labelKey)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

export default function ExperienceSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View
      nativeID={SECTIONS_IDS.experience.toString()}
      style={{
        backgroundColor: colors.surfaceMuted,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <AnimatedSection variant="fadeUp">
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
          <View className="flex-col md:flex-row" style={{ gap: 20, marginTop: 56 }}>
            <PermanenceCard t={t} colors={colors} />
            <LegalCard t={t} colors={colors} />
          </View>

          <VillaPreviewCard t={t} colors={colors} />
        </View>
      </AnimatedSection>
    </View>
  )
}
