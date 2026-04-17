import { SECTIONS_IDS } from "@/constants/landing";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Text, View } from "react-native";

function BulletItem({
  text,
  dotColor,
  textColor,
}: {
  text: string
  dotColor: string
  textColor: string
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
      <View
        style={{
          width: 7,
          height: 7,
          borderRadius: 4,
          backgroundColor: dotColor,
          marginTop: 8,
          flexShrink: 0,
        }}
      />
      <Text style={{ color: textColor, fontSize: 14, lineHeight: 22, flex: 1 }}>{text}</Text>
    </View>
  )
}

const P1_ITEMS = [
  "phase1Item1",
  "phase1Item2",
  "phase1Item3",
  "phase1Item4",
] as const

function Phase1Card({ t, gold }: { t: (k: string) => string; gold: string }) {
  // Colors are fixed: always light-on-dark regardless of theme
  const white = "rgba(255,255,255,1)"
  const whiteMuted = "rgba(255,255,255,0.65)"
  const whiteFaint = "rgba(255,255,255,0.45)"
  const whiteBorder = "rgba(255,255,255,0.12)"
  const tagBg = "rgba(255,255,255,0.14)"

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(8,61,145,1)",
        borderRadius: 14,
        padding: 28,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: tagBg,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: white,
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {t("program.phase1Tag")}
        </Text>
      </View>
      <Text style={{ color: white, fontSize: 22, fontWeight: "800", lineHeight: 28, marginBottom: 6 }}>
        {t("program.phase1Title")}
      </Text>
      <Text style={{ color: whiteMuted, fontSize: 13, fontWeight: "600", marginBottom: 24, letterSpacing: 0.3 }}>
        {t("program.phase1Sub")}
      </Text>
      <View style={{ flex: 1 }}>
        {P1_ITEMS.map((key) => (
          <BulletItem
            key={key}
            text={t(`program.${key}`)}
            dotColor={gold}
            textColor={whiteMuted}
          />
        ))}
      </View>
      <View
        style={{
          marginTop: "auto" as any,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: whiteBorder,
        }}
      >
        <Text style={{ color: whiteFaint, fontSize: 12, lineHeight: 18, letterSpacing: 0.3 }}>
          {t("program.phase1Note")}
        </Text>
      </View>
    </View>
  )
}

const P2_ITEMS = [
  "phase2Item1",
  "phase2Item2",
  "phase2Item3",
  "phase2Item4",
] as const

function Phase2Card({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  const tagBg = colors.brand

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.border,
        borderLeftWidth: 4,
        borderLeftColor: colors.brand,
        padding: 28,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          backgroundColor: tagBg,
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 5,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: colors.bg,
            fontSize: 11,
            fontWeight: "700",
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          {t("program.phase2Tag")}
        </Text>
      </View>
      <Text style={{ color: colors.brand, fontSize: 22, fontWeight: "800", lineHeight: 28, marginBottom: 6 }}>
        {t("program.phase2Title")}
      </Text>
      <Text style={{ color: colors.inkMuted, fontSize: 13, fontWeight: "600", marginBottom: 24, letterSpacing: 0.3 }}>
        {t("program.phase2Sub")}
      </Text>
      <View style={{ flex: 1 }}>
        {P2_ITEMS.map((key) => (
          <BulletItem
            key={key}
            text={t(`program.${key}`)}
            dotColor={colors.gold}
            textColor={colors.ink}
          />
        ))}
      </View>
      <View
        style={{
          marginTop: "auto" as any,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}
      >
        <Text style={{ color: colors.inkMuted, fontSize: 12, lineHeight: 18, letterSpacing: 0.3 }}>
          {t("program.phase2Note")}
        </Text>
      </View>
    </View>
  )
}
export default function ProgramSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View
      nativeID={SECTIONS_IDS.program.toString()}
      style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View style={{ alignItems: "center", marginBottom: 48 }}>
          <View
            style={{
              backgroundColor: colors.brand,
              borderRadius: 20,
              paddingHorizontal: 14,
              paddingVertical: 6,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: colors.bg,
                fontSize: 11,
                fontWeight: "700",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {t("program.sectionTag")}
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
            {t("program.sectionTitle")}
          </Text>
        </View>
        <View className="flex-col md:flex-row" style={{ alignItems: "stretch", gap: 0 }}>
          <Phase1Card t={t} gold={colors.gold} />
          <View
            className="hidden md:flex"
            style={{ alignItems: "center", justifyContent: "center", paddingHorizontal: 12 }}
          >
            <Text style={{ color: colors.gold, fontSize: 32, fontWeight: "900", lineHeight: 36 }}>→</Text>
          </View>
          <View
            className="flex md:hidden"
            style={{ alignItems: "center", justifyContent: "center", paddingVertical: 12 }}
          >
            <Text style={{ color: colors.gold, fontSize: 32, fontWeight: "900", lineHeight: 36 }}>↓</Text>
          </View>

          <Phase2Card t={t} colors={colors} />
        </View>
      </View>
    </View>
  )
}
