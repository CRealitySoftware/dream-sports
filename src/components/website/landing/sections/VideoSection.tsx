import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

export default function VideoSection() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const videoRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (Platform.OS !== "web") return null;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      video.pause();
      setPlaying(false);
    } else {
      video.play();
      setPlaying(true);
    }
  };

  const showOverlay = !playing || hovered;

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: colors.border,
      }}
    >
      <AnimatedSection variant="fadeUp">
        <View
          className="py-20 md:py-24 px-6"
          style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}
        >
          <View
            className="flex flex-col md:flex-row"
            style={{ gap: 56, alignItems: "center" }}
          >
            <View style={{ flex: 1, gap: 20 }}>
              <View
                style={{
                  backgroundColor: colors.brandTint,
                  borderRadius: 20,
                  paddingHorizontal: 14,
                  paddingVertical: 6,
                  alignSelf: "flex-start",
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
                  {t("videoSection.tag")}
                </Text>
              </View>

              <Text
                style={{
                  color: colors.ink,
                  fontSize: 32,
                  fontWeight: "800",
                  letterSpacing: -0.6,
                  lineHeight: 40,
                }}
              >
                {t("videoSection.title")}
              </Text>

              <Text
                style={{
                  color: colors.inkMuted,
                  fontSize: 15,
                  lineHeight: 26,
                }}
              >
                {t("videoSection.body")}
              </Text>
            </View>

            <View
              style={{ alignItems: "center" }}
              // @ts-ignore
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <Pressable
                onPress={togglePlay}
                style={{
                  width: 320,
                  borderRadius: 20,
                  overflow: "hidden",
                  borderWidth: 1,
                  borderColor: colors.border,
                  position: "relative",
                }}
              >
                {/* @ts-ignore */}
                <video
                  ref={videoRef}
                  src="/videos/video.mp4"
                  playsInline
                  onEnded={() => setPlaying(false)}
                  style={{
                    width: "100%",
                    display: "block",
                    backgroundColor: "#000",
                  }}
                />

                {showOverlay && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: playing
                        ? "rgba(0,0,0,0.25)"
                        : "rgba(0,0,0,0.35)",
                    }}
                  >
                    <View
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 32,
                        backgroundColor: "rgba(255,255,255,0.15)",
                        borderWidth: 2,
                        borderColor: "rgba(255,255,255,0.8)",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Ionicons
                        name={playing ? "pause" : "play"}
                        size={26}
                        color="white"
                        style={{ marginLeft: playing ? 0 : 3 }}
                      />
                    </View>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </AnimatedSection>
    </View>
  );
}
