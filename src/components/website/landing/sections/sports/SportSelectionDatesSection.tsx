import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Text, View } from "react-native";

interface Props {
  sportId: string;
}

const OBJECTIVES = ["selectionObj1", "selectionObj2", "selectionObj3", "selectionObj4"] as const;

export default function SportSelectionDatesSection({ sportId }: Props) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.surfaceMuted }}>
      <View
        className="py-14 md:py-20 px-6"
        style={{ maxWidth: 800, alignSelf: "center", width: "100%" }}
      >
        <AnimatedSection variant="fadeUp">
          <Text
            style={{
              color: colors.brand,
              fontSize: 11,
              fontWeight: "700",
              letterSpacing: 2,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            {t("sportPage.selectionDatesTitle")}
          </Text>

          <View
            style={{
              borderWidth: 1.5,
              borderColor: colors.brand,
              borderRadius: 20,
              backgroundColor: colors.brandTint,
              padding: 32,
            }}
          >
            <Text
              style={{
                color: colors.brand,
                fontSize: 28,
                fontWeight: "900",
                letterSpacing: -0.5,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {t(`sportPage.${sportId}.selectionDate`)}
            </Text>

            <Text
              style={{
                color: colors.inkMuted,
                fontSize: 14,
                textAlign: "center",
                marginBottom: 32,
              }}
            >
              {t(`disciplines.${sportId}.name`)}
            </Text>

            <View
              style={{
                height: 1,
                backgroundColor: colors.border,
                marginBottom: 28,
              }}
            />

            <Text
              style={{
                color: colors.ink,
                fontSize: 13,
                fontWeight: "700",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              {t("sportPage.selectionObjectivesTitle")}
            </Text>

            {OBJECTIVES.map((key) => (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: colors.brand,
                    flexShrink: 0,
                  }}
                />
                <Text style={{ color: colors.inkMuted, fontSize: 15, lineHeight: 22, flex: 1 }}>
                  {t(`sportPage.${key}`)}
                </Text>
              </View>
            ))}
          </View>
        </AnimatedSection>
      </View>
    </View>
  );
}
