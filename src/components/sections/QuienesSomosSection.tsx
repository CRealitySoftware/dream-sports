import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Pressable, Text, View } from "react-native";

export default function QuienesSomosSection() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <View
      nativeID="quienes-somos"
      style={{ backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border }}
    >
      <View
        className="py-20 md:py-24 px-6"
        style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
      >
        <View className="flex-col md:flex-row" style={{ gap: 64 }}>
          {/* ── Left: text ── */}
          <View style={{ flex: 1, minWidth: 0 }}>
            {/* Tag with left-border accent */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  width: 3,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: colors.brand,
                  marginRight: 12,
                }}
              />
              <Text
                style={{
                  color: colors.brand,
                  fontSize: 11,
                  fontWeight: "700",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {t("quienesSomos.tag")}
              </Text>
            </View>

            {/* Title */}
            <Text
              style={{
                color: colors.ink,
                fontSize: 40,
                fontWeight: "800",
                lineHeight: 46,
                letterSpacing: -1,
                marginBottom: 32,
              }}
            >
              {t("quienesSomos.title")}
            </Text>

            {/* Body paragraphs */}
            {(["body1", "body2", "body3"] as const).map((key, i) => (
              <Text
                key={key}
                style={{
                  color: colors.inkMuted,
                  fontSize: 16,
                  lineHeight: 28,
                  marginBottom: i < 2 ? 20 : 32,
                }}
              >
                {t(`quienesSomos.${key}`)}
              </Text>
            ))}

            {/* CTA ghost button */}
            <Pressable
              style={({ pressed, hovered }: any) => ({
                alignSelf: "flex-start",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
                borderWidth: 1.5,
                borderColor: pressed || hovered ? colors.brand : colors.border,
                backgroundColor:
                  pressed || hovered ? colors.brand + "0d" : "transparent",
              })}
            >
              <Text
                style={{ color: colors.brand, fontSize: 14, fontWeight: "700", letterSpacing: 0.3 }}
              >
                {t("quienesSomos.cta")}
              </Text>
              <Text style={{ color: colors.brand, fontSize: 16, lineHeight: 18 }}>→</Text>
            </Pressable>
          </View>

          {/* ── Right: photo placeholder ── */}
          <View className="w-full md:w-5/12" style={{ alignSelf: "flex-start" }}>
            <View
              style={{
                width: "100%",
                aspectRatio: 4 / 3,
                borderRadius: 16,
                backgroundColor: colors.surfaceMuted,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {/* Corner accents */}
              <View
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: 24,
                  height: 24,
                  borderTopWidth: 2,
                  borderLeftWidth: 2,
                  borderColor: colors.brand,
                  opacity: 0.4,
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  width: 24,
                  height: 24,
                  borderBottomWidth: 2,
                  borderRightWidth: 2,
                  borderColor: colors.brand,
                  opacity: 0.4,
                }}
              />
              {/* Label */}
              <View style={{ alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    borderWidth: 1.5,
                    borderColor: colors.brand,
                    opacity: 0.3,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <Text
                  style={{
                    color: colors.inkMuted,
                    fontSize: 12,
                    fontWeight: "500",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    opacity: 0.5,
                  }}
                >
                  foto institucional
                </Text>
              </View>
            </View>

            {/* Caption */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                marginTop: 16,
                paddingHorizontal: 4,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: colors.brand,
                }}
              />
              <Text style={{ color: colors.inkMuted, fontSize: 12, fontWeight: "500", opacity: 0.7 }}>
                DreamSports International SRL — Sede Italia
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
