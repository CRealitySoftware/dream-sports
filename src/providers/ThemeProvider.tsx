import React, { createContext, useEffect, useMemo, useState } from "react";
import { Platform, useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system"

export type ThemeColors = {
  bg: string
  surface: string
  surfaceMuted: string
  surfaceElevated: string
  border: string
  ink: string
  inkMuted: string
  brand: string
  brandTint: string
  gold: string
  goldTint: string
  cta: string
  ctaText: string
}

export type ThemeContextType = {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  isDark: boolean
  toggle: () => void
  colors: ThemeColors
}

const light: ThemeColors = {
  bg: "rgba(255,255,255,1)",
  surface: "rgba(255,255,255,1)",
  surfaceMuted: "rgba(247,249,252,1)",
  surfaceElevated: "rgba(240,244,250,1)",
  border: "rgba(215,222,232,1)",
  ink: "rgba(8,8,8,1)",
  inkMuted: "rgba(80,80,80,1)",
  brand: "rgba(8,61,145,1)",
  brandTint: "rgba(8,61,145,0.08)",
  gold: "rgba(201,162,39,1)",
  goldTint: "rgba(201,162,39,0.10)",
  cta: "rgba(201,162,39,1)",
  ctaText: "rgba(255,255,255,1)",
}

const dark: ThemeColors = {
  bg: "rgba(10,10,20,1)",
  surface: "rgba(10,10,20,1)",
  surfaceMuted: "rgba(14,14,28,1)",
  surfaceElevated: "rgba(18,18,35,1)",
  border: "rgba(30,30,50,1)",
  ink: "rgba(245,245,245,1)",
  inkMuted: "rgba(160,160,180,1)",
  brand: "rgba(90,140,240,1)",
  brandTint: "rgba(90,140,240,0.08)",
  gold: "rgba(220,178,60,1)",
  goldTint: "rgba(220,178,60,0.10)",
  cta: "rgba(220,178,60,1)",
  ctaText: "rgba(10,10,20,1)",
}

export const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme()
  const [mode, setMode] = useState<ThemeMode>("system")

  // const isDark = mode === "system" ? systemScheme === "dark" : mode === "dark";
  const isDark = false
  const colors = useMemo(() => (isDark ? dark : light), [isDark])

  useEffect(() => {
    if (Platform.OS !== "web") return
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  function toggle() {
    setMode((prev) => {
      if (prev === "system") return isDark ? "light" : "dark"
      return prev === "dark" ? "light" : "dark"
    })
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, toggle, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}
