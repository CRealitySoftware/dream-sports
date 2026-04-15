import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { BLURHASH } from "@/constants/image";
import { Image } from "expo-image";
import { createElement, useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { CountUp } from "use-count-up";

export type HeroVariant = "plain" | "image" | "video"

export interface HeroStat {
  value: number
  label: string
}

export interface HeroCta {
  label: string
  onPress?: () => void
}

export interface PageHeroProps {
  variant?: HeroVariant
  badge?: string
  title: string
  /** 0-indexed line number (after splitting by \n) that gets the gold accent color. Default: 1 */
  accentLineIndex?: number
  subtitle?: string
  primaryCta?: HeroCta
  secondaryCta?: HeroCta
  stats?: HeroStat[]
  /** Required when variant is "image" or "video" */
  imageSource?: any
  /** Required when variant is "video" */
  videoSource?: any
  showScrollIndicator?: boolean
  overlayOpacity?: number
  minHeightScale?: number
}

function PlainBackground() {
  return (
    <>
      <View style={{ position: "absolute", top: -100, right: -100, width: 500, height: 500, borderRadius: 250, backgroundColor: "rgba(8,61,145,0.35)" }} />
      <View style={{ position: "absolute", top: "30%", right: "-5%", width: 300, height: 300, borderRadius: 150, backgroundColor: "rgba(31,99,238,0.2)" }} />
      <View style={{ position: "absolute", bottom: -80, left: -80, width: 320, height: 320, borderRadius: 160, backgroundColor: "rgba(201,162,39,0.12)" }} />
      <View style={{ position: "absolute", top: 0, bottom: 0, right: "20%", width: 1, backgroundColor: "rgba(255,255,255,0.04)" }} />
      <View style={{ position: "absolute", top: 0, bottom: 0, right: "40%", width: 1, backgroundColor: "rgba(255,255,255,0.03)" }} />
    </>
  )
}

function BgImage({ source }: { source: any }) {
  return (
    <Image
      source={source}
      placeholder={{ blurhash: BLURHASH }}
      contentFit="cover"
      style={StyleSheet.absoluteFill}
    />
  )
}

function VideoBackground({ imageSource, videoSource }: { imageSource: any; videoSource: any }) {
  const videoOpacity = useSharedValue(0)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const videoStyle = useAnimatedStyle(() => ({ opacity: videoOpacity.value }))

  function showVideo() {
    videoOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) })
  }

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    if (el.readyState >= 3) {
      showVideo()
      return
    }

    el.addEventListener("canplay", showVideo, { once: true })
    const fallback = setTimeout(showVideo, 3000)

    return () => {
      el.removeEventListener("canplay", showVideo)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <>
      <BgImage source={imageSource} />
      <Animated.View style={[StyleSheet.absoluteFill, videoStyle]}>
        {createElement("video", {
          ref: videoRef,
          src: videoSource as unknown as string,
          autoPlay: true,
          muted: true,
          loop: true,
          playsInline: true,
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
          },
        })}
      </Animated.View>
    </>
  )
}

export default function PageHero({
  variant = "plain",
  badge,
  title,
  accentLineIndex = 1,
  subtitle,
  primaryCta,
  secondaryCta,
  stats,
  imageSource,
  videoSource,
  showScrollIndicator = true,
  overlayOpacity = 0.67,
  minHeightScale = 1
}: PageHeroProps) {
  const { height } = useWindowDimensions()
  const lines = title.split("\n")

  return (
    <View
      nativeID="hero"
      style={{ minHeight: height * minHeightScale, backgroundColor: "#020D38", overflow: "hidden", position: "relative" }}
    >
      {variant === "plain" && <PlainBackground />}
      {variant === "image" && imageSource && <BgImage source={imageSource} />}
      {variant === "video" && imageSource && videoSource && (
        <VideoBackground imageSource={imageSource} videoSource={videoSource} />
      )}

      {variant !== "plain" && (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: `rgba(2,13,56,${overlayOpacity})` }]} />
      )}

      <AnimatedSection>
        <View
          style={{
            flex: 1,
            minHeight: height * minHeightScale,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingTop: 80,
            paddingBottom: 120,
            position: "relative",
            zIndex: 10,
          }}
        >
          {badge && (
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
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#C9A227" }} />
              <Text
                style={{
                  color: "rgba(220,178,60,1)",
                  fontSize: 12,
                  fontWeight: "600",
                  letterSpacing: 1.2,
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </Text>
            </View>
          )}

          <Text
            style={{
              color: "#ffffff",
              fontSize: 52,
              fontWeight: "900",
              textAlign: "center",
              lineHeight: 60,
              letterSpacing: -1.5,
              maxWidth: 700,
              marginBottom: subtitle ? 24 : 44,
            }}
          >
            {lines.map((line, i, arr) => (
              <Text key={i}>
                {i === accentLineIndex ? (
                  <Text style={{ color: "#C9A227" }}>{line}</Text>
                ) : (
                  line
                )}
                {i < arr.length - 1 ? "\n" : ""}
              </Text>
            ))}
          </Text>

          {subtitle && (
            <Text
              style={{
                color: "rgba(255,255,230,1)",
                fontSize: 17,
                textAlign: "center",
                lineHeight: 28,
                maxWidth: 520,
                marginBottom: 44,
              }}
            >
              {subtitle}
            </Text>
          )}

          {(primaryCta || secondaryCta) && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 12,
                marginBottom: stats ? 72 : 0,
              }}
            >
              {primaryCta && (
                <Pressable
                  onPress={primaryCta.onPress}
                  style={({ pressed }: any) => ({
                    backgroundColor: pressed ? "#a88820" : "#C9A227",
                    paddingHorizontal: 32,
                    paddingVertical: 16,
                    borderRadius: 40,
                  })}
                >
                  <Text style={{ color: "white", fontWeight: "800", fontSize: 15, letterSpacing: 0.3 }}>
                    {primaryCta.label}
                  </Text>
                </Pressable>
              )}
              {secondaryCta && (
                <Pressable
                  onPress={secondaryCta.onPress}
                  style={({ pressed }: any) => ({
                    borderWidth: 1,
                    borderColor: pressed ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
                    paddingHorizontal: 32,
                    paddingVertical: 16,
                    borderRadius: 40,
                  })}
                >
                  <Text style={{ color: "rgba(255,255,255,0.8)", fontWeight: "600", fontSize: 15 }}>
                    {secondaryCta.label}
                  </Text>
                </Pressable>
              )}
            </View>
          )}

          {stats && stats.length > 0 && (
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
              {stats.map(({ value, label }, i) => (
                <View key={label} style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
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
                      <CountUp isCounting end={value} duration={3.2} />
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 11,
                        fontWeight: "500",
                        textAlign: "center",
                        letterSpacing: 0.5,
                        marginTop: 4,
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </AnimatedSection>

      {showScrollIndicator && (
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
      )}
    </View>
  )
}
