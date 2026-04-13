import React, { useEffect } from "react";
import { Platform, ViewStyle } from "react-native";
import Animated, {
    Easing,
    useAnimatedRef,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

export type AnimVariant = "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "fadeDown"

interface AnimatedSectionProps {
  children: React.ReactNode
  variant?: AnimVariant
  delay?: number
  duration?: number
  threshold?: number
  style?: ViewStyle | ViewStyle[]
  className?: string
}

const OFFSET = 28
const easing = Easing.out(Easing.cubic)

export function AnimatedSection({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 1500,
  threshold = 0.12,
  style,
  className,
}: AnimatedSectionProps) {
  const opacity = useSharedValue(0)
  const tx = useSharedValue(
    variant === "fadeLeft" ? -OFFSET : variant === "fadeRight" ? OFFSET : 0
  )
  const ty = useSharedValue(
    variant === "fadeUp" ? OFFSET : variant === "fadeDown" ? -OFFSET : 0
  )

  const aRef = useAnimatedRef<Animated.View>()

  function trigger() {
    const cfg = { duration, easing }
    opacity.value = withDelay(delay, withTiming(1, cfg))
    tx.value = withDelay(delay, withTiming(0, cfg))
    ty.value = withDelay(delay, withTiming(0, cfg))
  }

  useEffect(() => {
    if (Platform.OS !== "web") {
      trigger()
      return
    }

    // aRef.current on web is the underlying DOM element via Reanimated's ref forwarding
    const el = aRef.current as unknown as Element
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          trigger()
          io.disconnect()
        }
      },
      { threshold }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: tx.value }, { translateY: ty.value }],
  }))

  return (
    <Animated.View ref={aRef} style={[animStyle, style]} className={className}>
      {children}
    </Animated.View>
  )
}
