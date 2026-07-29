import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { ThemeColors } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function PriceCard({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.brand,
        borderRadius: 14,
        padding: 32,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
      }}
    >
      <Ionicons name="mail-outline" size={48} color={colors.gold} />
      <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", textAlign: "center" }}>
        {t("investment.priceLabel")}
      </Text>
      <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, textAlign: "center", lineHeight: 20 }}>
        {t("investment.priceNote")}
      </Text>
    </View>
  )
}

function ValueBlock({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View style={{ flex: 1.4, justifyContent: "center", gap: 14 }}>
      <Text style={{ color: colors.ink, fontSize: 20, fontWeight: "800" }}>
        {t("investment.valueTitle")}
      </Text>
      <Text style={{ color: colors.inkMuted, fontSize: 14, lineHeight: 22 }}>
        {t("investment.valueBody")}
      </Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          backgroundColor: colors.surfaceMuted,
          borderLeftWidth: 3,
          borderLeftColor: colors.gold,
          borderRadius: 8,
          padding: 14,
        }}
      >
        <Ionicons name="checkmark-circle" size={18} color={colors.gold} />
        <Text style={{ color: colors.ink, fontSize: 13, lineHeight: 20, flex: 1, fontWeight: "600" }}>
          {t("investment.includesBadge")}
        </Text>
      </View>
    </View>
  )
}

const ROWS = [
  { labelKey: "rowDurationLabel", traditionalKey: "rowDurationTraditional", dreamSportsKey: "rowDurationDreamSports" },
  { labelKey: "rowBackingLabel", traditionalKey: "rowBackingTraditional", dreamSportsKey: "rowBackingDreamSports" },
  { labelKey: "rowStayLabel", traditionalKey: "rowStayTraditional", dreamSportsKey: "rowStayDreamSports" },
  { labelKey: "rowInvestmentLabel", traditionalKey: "rowInvestmentTraditional", dreamSportsKey: "rowInvestmentDreamSports" },
] as const

function ComparisonTable({ t, colors }: { t: (k: string) => string; colors: ThemeColors }) {
  return (
    <View style={{ borderRadius: 12, overflow: "hidden", borderWidth: 1, borderColor: colors.border }}>
      <View className="flex-col md:flex-row" style={{ backgroundColor: colors.brand }}>
        <Text className="w-full md:w-4/12" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "700", padding: 14 }}>
          {t("investment.tableConceptHeader")}
        </Text>
        <Text className="w-full md:w-4/12" style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "700", padding: 14 }}>
          {t("investment.tableTraditionalHeader")}
        </Text>
        <Text className="w-full md:w-4/12" style={{ color: colors.gold, fontSize: 12, fontWeight: "700", padding: 14 }}>
          {t("investment.tableDreamSportsHeader")}
        </Text>
      </View>
      {ROWS.map((row, i) => (
        <View
          key={row.labelKey}
          className="flex-col md:flex-row"
          style={{
            backgroundColor: i % 2 === 0 ? colors.surface : colors.surfaceMuted,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          }}
        >
          <Text className="w-full md:w-4/12" style={{ color: colors.ink, fontSize: 13, fontWeight: "700", padding: 14 }}>
            {t(`investment.${row.labelKey}`)}
          </Text>
          <Text className="w-full md:w-4/12" style={{ color: colors.inkMuted, fontSize: 13, padding: 14 }}>
            {t(`investment.${row.traditionalKey}`)}
          </Text>
          <Text className="w-full md:w-4/12" style={{ color: colors.brand, fontSize: 13, fontWeight: "700", padding: 14 }}>
            {t(`investment.${row.dreamSportsKey}`)}
          </Text>
        </View>
      ))}
    </View>
  )
}

export default function InvestmentSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}>
      <AnimatedSection variant="fadeUp">
        <View
          className="py-20 md:py-24 px-6"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
        >
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
                {t("investment.sectionTag")}
              </Text>
            </View>
            <Text style={{ color: colors.ink, fontSize: 36, fontWeight: "800", letterSpacing: -0.8, textAlign: "center" }}>
              {t("investment.sectionTitle")}
            </Text>
          </View>

          <View className="flex-col md:flex-row" style={{ gap: 32, marginBottom: 48, alignItems: "stretch" }}>
            <PriceCard t={t} colors={colors} />
            <ValueBlock t={t} colors={colors} />
          </View>

          <Text style={{ color: colors.ink, fontSize: 18, fontWeight: "800", marginBottom: 16 }}>
            {t("investment.tableTitle")}
          </Text>
          <ComparisonTable t={t} colors={colors} />
        </View>
      </AnimatedSection>
    </View>
  )
}
