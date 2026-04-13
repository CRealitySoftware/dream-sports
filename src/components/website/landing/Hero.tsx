import { useTranslation } from "@/i18n/I18nProvider";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { CountUp } from "use-count-up";

const STATS = [
  { value: "160", labelKey: "stats.spots" },
  { value: "4", labelKey: "stats.disciplines" },
  { value: "86", labelKey: "stats.days" },
] as const;

export default function Hero() {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  return (
    <View
      nativeID="hero"
      style={{ minHeight: height, backgroundColor: "#020D38", overflow: "hidden", position: "relative" }}
    >

      <View
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          borderRadius: 250,
          backgroundColor: "rgba(8,61,145,0.35)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: "30%",
          right: "-5%",
          width: 300,
          height: 300,
          borderRadius: 150,
          backgroundColor: "rgba(31,99,238,0.2)",
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 320,
          height: 320,
          borderRadius: 160,
          backgroundColor: "rgba(201,162,39,0.12)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "20%",
          width: 1,
          backgroundColor: "rgba(255,255,255,0.04)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "40%",
          width: 1,
          backgroundColor: "rgba(255,255,255,0.03)",
        }}
      />
      <View
        style={{
          flex: 1,
          minHeight: height,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          paddingTop: 80,
          paddingBottom: 120,
          position: "relative",
          zIndex: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            borderWidth: 1,
            borderColor: "rgba(201,162,39,0.35)",
            backgroundColor: "rgba(201,162,39,0.08)",
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            marginBottom: 32,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#C9A227",
            }}
          />
          <Text
            style={{
              color: "rgba(220,178,60,0.9)",
              fontSize: 12,
              fontWeight: "600",
              letterSpacing: 1.2,
              textTransform: "uppercase",
            }}
          >
            {t("hero.badge")}
          </Text>
        </View>
        <Text
          style={{
            color: "#ffffff",
            fontSize: 52,
            fontWeight: "900",
            textAlign: "center",
            lineHeight: 60,
            letterSpacing: -1.5,
            maxWidth: 700,
            marginBottom: 24,
          }}
        >
          {t("hero.title").split("\n").map((line, i, arr) => (
            <Text key={i}>
              {i === 1 ? (
                <Text style={{ color: "#C9A227" }}>{line}</Text>
              ) : (
                line
              )}
              {i < arr.length - 1 ? "\n" : ""}
            </Text>
          ))}
        </Text>
        <Text
          style={{
            color: "rgba(165,185,230,0.85)",
            fontSize: 17,
            textAlign: "center",
            lineHeight: 28,
            maxWidth: 520,
            marginBottom: 44,
          }}
        >
          {t("hero.subtitle")}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 12,
            marginBottom: 72,
          }}
        >
          <Pressable
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? "#a88820" : "#C9A227",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 40,
            })}
          >
            <Text
              style={{
                color: "#020D38",
                fontWeight: "800",
                fontSize: 15,
                letterSpacing: 0.3,
              }}
            >
              {t("hero.cta")}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }: any) => ({
              borderWidth: 1,
              borderColor: pressed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
              paddingHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 40,
            })}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.8)",
                fontWeight: "600",
                fontSize: 15,
              }}
            >
              {t("hero.ctaSecondary")}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 0,
            paddingTop: 32,
            borderTopWidth: 1,
            borderTopColor: "rgba(255,255,255,0.08)",
            width: "100%",
            maxWidth: 500,
          }}
        >
          {STATS.map(({ value, labelKey }, i) => (
            <View key={labelKey} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              {i > 0 && (
                <View
                  style={{
                    width: 1,
                    height: 48,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginRight: 24,
                  }}
                />
              )}
              <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                  style={{
                    color: "#C9A227",
                    fontSize: 36,
                    fontWeight: "900",
                    lineHeight: 40,
                    letterSpacing: -1,
                  }}
                >
                  <CountUp isCounting end={Number(value)} duration={3.2} />
                </Text>
                <Text
                  style={{
                    color: "rgba(165,185,230,0.6)",
                    fontSize: 11,
                    fontWeight: "500",
                    textAlign: "center",
                    letterSpacing: 0.5,
                    marginTop: 4,
                  }}
                >
                  {t(labelKey)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          right: 0,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <View
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "rgba(255,255,255,0.2)",
            alignItems: "center",
            paddingTop: 6,
          }}
        >
          <View
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.4)",
            }}
          />
        </View>
      </View>
    </View>
  );
}
