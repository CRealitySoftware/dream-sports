import LogoButton from "@/components/ui/LogoButton";
import { SUPPORT_LANGS } from "@/constants/language";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/index";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";

const NAV_LINKS = [
  { labelKey: "nav.home", route: "/" },
  { labelKey: "nav.quienesSomos", route: "/(web)/about" },
  { labelKey: "nav.disciplinas", route: "/(web)/sports" },
  { labelKey: "nav.experiencia", route: "/a" },
  { labelKey: "nav.aliados", route: "/b" },
] as const

// function scrollToSection(id: string) {
//   if (Platform.OS === "web") {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
//   }
// }

export default function Navbar() {
  const { t, locale, setLocale } = useTranslation()
  const { colors, isDark, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navBg = isDark ? "rgba(10,10,20,0.5)" : "rgba(255,255,255,0.9)"

  return (
    <View
      style={Platform.select({
        web: { position: "fixed" as any, top: 0, left: 0, right: 0, zIndex: 50 },
        default: { position: "relative" },
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          paddingHorizontal: 24,
          backgroundColor: navBg,
        }}
      >
        <LogoButton />
        <View className="hidden md:flex" style={{ flexDirection: "row", alignItems: "center", gap: 32 }}>
          {NAV_LINKS.map(({ labelKey, route }) => (
            // @ts-ignore
            <Pressable key={route} onPress={() => router.push(route)}>
              {({ hovered }: any) => (
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: hovered ? colors.brand : colors.inkMuted,
                      letterSpacing: 0.3,
                    }}
                  >
                    {t(labelKey)}
                  </Text>
                  {hovered && (
                    <View style={{ height: 2, backgroundColor: colors.gold, borderRadius: 1, marginTop: 2 }} />
                  )}
                </View>
              )}
            </Pressable>
          ))}
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              flexDirection: "row",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
              overflow: "hidden",
            }}
          >
            {SUPPORT_LANGS.map((lang) => (
              <Pressable
                key={lang.id}
                onPress={() => setLocale(lang.id as Locale)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  backgroundColor: locale === lang.id ? "rgba(8,61,145,0.75)" : "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    letterSpacing: 1,
                    color: locale === lang.id ? "#fff" : colors.inkMuted,
                    textTransform: "uppercase",
                  }}
                >
                  {lang.icon}
                </Text>
              </Pressable>
            ))}
          </View>
          {/* <Pressable
            onPress={toggle}
            style={({ pressed }: any) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons name={isDark ? "sunny" : "moon"} size={16} color={isDark ? colors.gold : colors.brand} />
          </Pressable> */}
          <Pressable
            onPress={() => setMenuOpen((v) => !v)}
            className="flex md:hidden"
            style={({ pressed }: any) => ({
              width: 36,
              height: 36,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              justifyContent: "center",
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Ionicons name={menuOpen ? "close" : "menu"} size={18} color={colors.ink} />
          </Pressable>
        </View>
      </View>
      {menuOpen && (
        <View
          style={{
            backgroundColor: colors.bg,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            paddingHorizontal: 24,
            paddingBottom: 12,
          }}
        >
          {NAV_LINKS.map(({ labelKey, route }, i) => (
            <Pressable
              key={route}
              // @ts-ignore
              onPress={() => { router.push(route); setMenuOpen(false) }}
              style={{
                paddingVertical: 14,
                borderBottomWidth: i < NAV_LINKS.length - 1 ? 1 : 0,
                borderBottomColor: colors.border,
              }}
            >
              <Text style={{ color: colors.ink, fontSize: 15, fontWeight: "600" }}>
                {t(labelKey)}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  )
}
