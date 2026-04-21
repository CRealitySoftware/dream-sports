import { LAUNCH_DATE } from "@/constants/landing"
import { useTheme } from "@/hooks/useTheme"
import { useTranslation } from "@/i18n/I18nProvider"
import { useEffect, useState } from "react"
import { Pressable, Text, View, type ViewStyle } from "react-native"

export type CountdownSize = "sm" | "md" | "lg"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft | null {
  const diff = LAUNCH_DATE.getTime() - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  }
}

const pad = (n: number) => String(n).padStart(2, "0")

export function LaunchBanner() {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  return (
    <View
      style={{
        backgroundColor: colors.cta,
        paddingVertical: 7,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          color: colors.ctaText,
          fontSize: 12,
          fontWeight: "600",
          opacity: 0.85,
          letterSpacing: 0.3,
        }}
      >
        {t("countdown.label")}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "baseline", gap: 6 }}>
        {timeLeft.days > 0 && (
          <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
            {pad(timeLeft.days)}
            <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.75 }}>d</Text>
          </Text>
        )}
        <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
          {pad(timeLeft.hours)}
          <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.75 }}>h</Text>
        </Text>
        <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
          {pad(timeLeft.minutes)}
          <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.75 }}>m</Text>
        </Text>
        <Text style={{ color: colors.gold, fontSize: 13, fontWeight: "800" }}>
          {pad(timeLeft.seconds)}
          <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.75 }}>s</Text>
        </Text>
      </View>
    </View>
  )
}

interface LaunchCountdownProps {
  size?: CountdownSize
  onPress?: () => void
  style?: ViewStyle
}

export function LaunchCountdown({ size = "md", onPress, style }: LaunchCountdownProps) {
  const { colors } = useTheme()
  const { t } = useTranslation()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!timeLeft) return null

  if (size === "sm") {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }: any) => [
          {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: pressed ? colors.gold : colors.cta,
            borderRadius: 999,
            paddingVertical: 8,
            paddingHorizontal: 14,
            shadowColor: colors.cta,
            shadowOpacity: 0.18,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 6 },
          },
          style,
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "baseline", gap: 4 }}>
          {timeLeft.days > 0 && (
            <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
              {pad(timeLeft.days)}
              <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.8 }}>d </Text>
            </Text>
          )}
          <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
            {pad(timeLeft.hours)}
            <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.8 }}>h </Text>
          </Text>
          <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
            {pad(timeLeft.minutes)}
            <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.8 }}>m </Text>
          </Text>
          <Text style={{ color: colors.ctaText, fontSize: 13, fontWeight: "800" }}>
            {pad(timeLeft.seconds)}
            <Text style={{ fontSize: 10, fontWeight: "600", opacity: 0.8 }}>s</Text>
          </Text>
        </View>
      </Pressable>
    )
  }

  const unitFontSize = size === "lg" ? 48 : 34
  const labelFontSize = size === "lg" ? 11 : 10
  const blockMinWidth = size === "lg" ? 80 : 64

  const units = [
    { value: timeLeft.days, label: t("countdown.days") },
    { value: timeLeft.hours, label: t("countdown.hours") },
    { value: timeLeft.minutes, label: t("countdown.min") },
    { value: timeLeft.seconds, label: t("countdown.sec") },
  ]

  return (
    <View style={[{ alignItems: "center", gap: 12 }, style]}>
      <Text
        style={{
          color: colors.inkMuted,
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        {t("countdown.label")}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        {units.map(({ value, label }, i) => (
          <View key={label} style={{ flexDirection: "row", alignItems: "flex-start" }}>
            <View
              style={{
                minWidth: blockMinWidth,
                alignItems: "center",
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  color: colors.gold,
                  fontSize: unitFontSize,
                  fontWeight: "800",
                  fontVariant: ["tabular-nums"],
                  letterSpacing: -1,
                  lineHeight: unitFontSize * 1.1,
                }}
              >
                {pad(value)}
              </Text>
              <Text
                style={{
                  color: colors.inkMuted,
                  fontSize: labelFontSize,
                  fontWeight: "600",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  marginTop: 4,
                }}
              >
                {label}
              </Text>
            </View>
            {i < 3 && (
              <Text
                style={{
                  color: colors.gold,
                  fontSize: unitFontSize * 0.6,
                  fontWeight: "800",
                  marginTop: 10,
                  marginHorizontal: 2,
                  opacity: 0.6,
                }}
              >
                :
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}
