import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ALLIES, type Ally } from "@/constants/allies";
import { SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type Lang = "es" | "it";

function resolveLang(locale: string): Lang {
  return locale === "it" ? "it" : "es";
}

function CountryBadges({ country, t, colors }: { country: Ally["country"]; t: (k: string) => string; colors: ThemeColors }) {
  const badge = (label: string) => (
    <View
      key={label}
      style={{
        backgroundColor: colors.goldTint,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 3,
      }}
    >
      <Text style={{ color: colors.gold, fontSize: 10, fontWeight: "700", letterSpacing: 0.8 }}>
        {label}
      </Text>
    </View>
  );

  if (country === "co-it") {
    return (
      <View style={{ flexDirection: "row", gap: 4 }}>
        {badge(t("allies.bothLabel"))}
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "row" }}>
      {badge(country === "it" ? t("allies.italy") : t("allies.colombia"))}
    </View>
  );
}

function AllyCard({ ally, colors, t, lang, onPress }: {
  ally: Ally;
  colors: ThemeColors;
  t: (k: string) => string;
  lang: Lang;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => ({
        width: 220,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: pressed ? colors.brand : colors.border,
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 16,
        alignItems: "center",
        opacity: pressed ? 0.92 : 1,
      })}
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
        <Text style={{ color: colors.brand, fontSize: 22, fontWeight: "800" }}>{ally.initials}</Text>
      </View>

      <Text
        style={{ color: colors.ink, fontSize: 14, fontWeight: "800", textAlign: "center", marginBottom: 4 }}
        numberOfLines={1}
      >
        {ally.name}
      </Text>

      <Text
        style={{ color: colors.inkMuted, fontSize: 12, textAlign: "center", marginBottom: 12, lineHeight: 17 }}
        numberOfLines={2}
      >
        {ally.role[lang]}
      </Text>

      <CountryBadges country={ally.country} t={t} colors={colors} />
    </Pressable>
  );
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
      <Text style={{ color: colors.brand, fontSize: 36, fontWeight: "900", marginBottom: 8, letterSpacing: -1 }}>
        {t("allies.moreLabel")}
      </Text>
      <Text style={{ color: colors.inkMuted, fontSize: 12, textAlign: "center", lineHeight: 18 }}>
        {t("allies.moreBody")}
      </Text>
    </View>
  );
}

function SocialButton({ label, onPress, colors }: { label: string; onPress: () => void; colors: ThemeColors }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }: { pressed: boolean }) => ({
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: pressed ? colors.brandTint : colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <Text style={{ color: colors.brand, fontSize: 12, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}

function AllyModal({ ally, visible, onClose, t, lang, colors }: {
  ally: Ally;
  visible: boolean;
  onClose: () => void;
  t: (k: string) => string;
  lang: Lang;
  colors: ThemeColors;
}) {
  const hasSocials = Object.values(ally.socials).some(Boolean);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: colors.bg,
            borderRadius: 16,
            padding: 28,
            maxWidth: 560,
            width: "100%",
            borderWidth: 1,
            borderColor: colors.border,
          }}
          onPress={(e: any) => e.stopPropagation()}
        >
          <Pressable
            onPress={onClose}
            style={{ position: "absolute", top: 16, right: 20 }}
          >
            <Text style={{ color: colors.inkMuted, fontSize: 22 }}>×</Text>
          </Pressable>

          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: colors.brandTint,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <Text style={{ color: colors.brand, fontSize: 20, fontWeight: "800" }}>{ally.initials}</Text>
            </View>

            <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", textAlign: "center", marginBottom: 4 }}>
              {ally.name}
            </Text>

            <Text style={{ color: colors.brand, fontSize: 13, textAlign: "center", marginBottom: 4 }}>
              {ally.role[lang]}
            </Text>

            <Text style={{ color: colors.inkMuted, fontSize: 12, textAlign: "center", marginBottom: 12 }}>
              {ally.title[lang]}
            </Text>

            <View style={{ flexDirection: "row", justifyContent: "center", gap: 8 }}>
              <CountryBadges country={ally.country} t={t} colors={colors} />
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 20 }} />

          <ScrollView style={{ maxHeight: 220 }}>
            <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 24 }}>
              {ally.bio[lang]}
            </Text>
          </ScrollView>
{/* 
          {hasSocials && (
            <View style={{ flexDirection: "row", justifyContent: "center", gap: 12, marginTop: 20 }}>
              {ally.socials.instagram && (
                <SocialButton
                  label="IG"
                  colors={colors}
                  onPress={() => console.log("TODO: add social links")}
                />
              )}
              {ally.socials.linkedin && (
                <SocialButton
                  label="LI"
                  colors={colors}
                  onPress={() => console.log("TODO: add social links")}
                />
              )}
              {ally.socials.whatsapp && (
                <SocialButton
                  label="WA"
                  colors={colors}
                  onPress={() => Linking.openURL(ally.socials.whatsapp!)}
                />
              )}
            </View>
          )} */}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default function AlliesSection() {
  const { t, locale } = useTranslation();
  const { colors } = useTheme();
  const lang = resolveLang(locale);
  const [selectedAlly, setSelectedAlly] = useState<Ally | null>(null);

  return (
    <View
      nativeID={SECTIONS_IDS.allies.toString()}
      style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}
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
              <Text style={{ color: colors.brand, fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
                {t("allies.sectionTag")}
              </Text>
            </View>
            <Text style={{ color: colors.ink, fontSize: 36, fontWeight: "800", letterSpacing: -0.8, textAlign: "center", marginBottom: 12 }}>
              {t("allies.sectionTitle")}
            </Text>
            <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 24, textAlign: "center", maxWidth: 520 }}>
              {t("allies.subtitle")}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, gap: 16, paddingBottom: 8 }}
        >
          {ALLIES.map((ally, i) => (
            <AnimatedSection key={ally.id} variant="fadeUp" delay={i * 60}>
              <AllyCard
                ally={ally}
                colors={colors}
                t={t}
                lang={lang}
                onPress={() => setSelectedAlly(ally)}
              />
            </AnimatedSection>
          ))}
          <MoreCard colors={colors} t={t} />
        </ScrollView>
        <View style={{ height: 80 }} />
      </AnimatedSection>

      {selectedAlly && (
        <AllyModal
          ally={selectedAlly}
          visible={!!selectedAlly}
          onClose={() => setSelectedAlly(null)}
          t={t}
          lang={lang}
          colors={colors}
        />
      )}
    </View>
  );
}
