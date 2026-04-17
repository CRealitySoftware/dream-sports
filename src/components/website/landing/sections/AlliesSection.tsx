import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

type Social = { instagram?: string; linkedin?: string; whatsapp?: string }
type Ally = { id: string; name: string; role: string; country: "it" | "es"; socials: Social }

const PLACEHOLDER_ALLIES: Ally[] = [
  { id: "1", name: "Claudio Capuano", role: "Socio Fondatore", country: "it", socials: { instagram: "#", linkedin: "#" } },
  { id: "2", name: "Andrés Díaz", role: "Socio Fundador", country: "es", socials: { instagram: "#", linkedin: "#", whatsapp: "#" } },
  { id: "3", name: "Collaboratore IT", role: "Allenatore certificato", country: "it", socials: { instagram: "#" } },
  { id: "4", name: "Colaborador CO", role: "Entrenador regional", country: "es", socials: { instagram: "#", linkedin: "#" } },
  { id: "5", name: "Collaboratore IT", role: "Club sportivo Roma", country: "it", socials: { linkedin: "#" } },
]

const SOCIAL_LABELS: Record<keyof Social, string> = {
  instagram: "instagram",
  linkedin: "linkedin-in",
  whatsapp: "whatsapp",
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function SocialButton({ label, colors }: { label: string; colors: ThemeColors }) {
  return (
    <Pressable
      style={({ pressed }: any) => ({
        width: 32,
        height: 32,
        borderRadius: 6,
        backgroundColor: pressed ? colors.brandTint : colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <FontAwesome5 name={label} color={colors.brand} size={20} />
    </Pressable>
  )
}

function AllyCard({ ally, colors, t }: { ally: Ally; colors: ThemeColors; t: (k: string) => string }) {
  const initials = getInitials(ally.name)
  const countryLabel = ally.country === "it" ? t("allies.italy") : t("allies.colombia")
  const socialKeys = (Object.keys(ally.socials) as (keyof Social)[]).filter(
    (k) => ally.socials[k] !== undefined
  )

  return (
    <View
      style={{
        width: 220,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: colors.brandTint,
          borderWidth: 2,
          borderColor: colors.brand,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          opacity: 0.85,
        }}
      >
        <Text style={{ color: colors.brand, fontSize: 22, fontWeight: "800" }}>{initials}</Text>
      </View>

      <Text
        style={{
          color: colors.ink,
          fontSize: 14,
          fontWeight: "800",
          textAlign: "center",
          marginBottom: 4,
        }}
        numberOfLines={1}
      >
        {ally.name}
      </Text>

      <Text
        style={{
          color: colors.inkMuted,
          fontSize: 12,
          textAlign: "center",
          marginBottom: 12,
          lineHeight: 17,
        }}
        numberOfLines={2}
      >
        {ally.role}
      </Text>

      <View
        style={{
          backgroundColor: colors.goldTint,
          borderRadius: 20,
          paddingHorizontal: 10,
          paddingVertical: 3,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: colors.gold, fontSize: 10, fontWeight: "700", letterSpacing: 0.8 }}>
          {countryLabel}
        </Text>
      </View>

      {socialKeys.length > 0 && (
        <View style={{ flexDirection: "row", gap: 6 }}>
          {socialKeys.map((key) => (
            <SocialButton key={key} label={SOCIAL_LABELS[key]} colors={colors} />
          ))}
        </View>
      )}
    </View>
  )
}

function MoreCard({ colors, t }: { colors: ThemeColors; t: (k: string) => string }) {
  return (
    <View
      style={{
        width: 220,
        backgroundColor: colors.brandTint,
        borderWidth: 1.5,
        borderColor: colors.brand,
        borderStyle: "dashed",
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
      }}
    >
      <Text
        style={{
          color: colors.brand,
          fontSize: 36,
          fontWeight: "900",
          marginBottom: 8,
          letterSpacing: -1,
        }}
      >
        {t("allies.moreLabel")}
      </Text>
      <Text
        style={{
          color: colors.inkMuted,
          fontSize: 12,
          textAlign: "center",
          lineHeight: 18,
        }}
      >
        {t("allies.moreBody")}
      </Text>
    </View>
  )
}

export default function AlliesSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View
      nativeID={SECTIONS_IDS.allies.toString()}
      style={{
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <AnimatedSection variant="fadeUp">
        <View
          className="py-20 md:py-24"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%", paddingHorizontal: 24 }}
        >
          <View style={{ alignItems: "center", marginBottom: 40 }}>
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
                {t("allies.sectionTag")}
              </Text>
            </View>
            <Text
              style={{
                color: colors.ink,
                fontSize: 36,
                fontWeight: "800",
                letterSpacing: -0.8,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              {t("allies.sectionTitle")}
            </Text>
            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 15,
                lineHeight: 24,
                textAlign: "center",
                maxWidth: 520,
              }}
            >
              {t("allies.subtitle")}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 16, paddingBottom: 8 }}
        >
          {PLACEHOLDER_ALLIES.map((ally) => (
            <AllyCard key={ally.id} ally={ally} colors={colors} t={t} />
          ))}
          <MoreCard colors={colors} t={t} />
        </ScrollView>
        <View style={{ height: 80 }} />
      </AnimatedSection>
    </View>
  )
}
