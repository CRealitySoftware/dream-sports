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
  { labelKey: "nav.experiencia", route: "/(web)/experience" },
  { labelKey: "nav.aliados", route: "/(web)/allies" },
] as const

export default function Navbar() {
  const { t, locale, setLocale } = useTranslation()
  const { colors, isDark } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const router = useRouter()

  const navBg = isDark ? "rgba(10,10,20,0.5)" : "rgba(255,255,255,0.9)"
  const activeLang = SUPPORT_LANGS.find((lang) => lang.id === locale) ?? SUPPORT_LANGS[0]

  const handleNavigate = (route: string) => {
    // @ts-ignore
    router.push(route)
    setMenuOpen(false)
  }

  const handleRegistration = () => {
    // @ts-ignore
    router.push("/(web)/register")
    setMenuOpen(false)
  }

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
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pressable
            onPress={handleRegistration}
            className="hidden md:flex"
            style={({ pressed }: any) => ({
              backgroundColor: pressed ? colors.gold : colors.cta,
              borderRadius: 999,
              paddingVertical: 10,
              paddingHorizontal: 18,
              shadowColor: colors.cta,
              shadowOpacity: 0.18,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 6 },
            })}
          >
            <Text
              style={{
                color: colors.ctaText,
                fontSize: 13,
                fontWeight: "800",
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {t("footer.navRegister")}
            </Text>
          </Pressable>

          <View style={{ position: "relative", flexDirection: "row", alignItems: "center", alignContent: "center", gap: 10 }}>
            <Pressable
              onPress={() => setLangMenuOpen((value) => !value)}
              style={({ pressed }: any) => ({
                minWidth: 92,
                height: 42,
                borderRadius: 21,
                borderWidth: 1,
                borderColor: langMenuOpen ? colors.brand : colors.border,
                backgroundColor: pressed || langMenuOpen ? colors.surfaceElevated : navBg,
                paddingHorizontal: 14,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              })}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Text style={{ fontSize: 18 }}>{activeLang.icon}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "800",
                    letterSpacing: 0.8,
                    color: colors.ink,
                    textTransform: "uppercase",
                  }}
                >
                  {activeLang.id}
                </Text>
              </View>
              <Ionicons
                name={langMenuOpen ? "chevron-up" : "chevron-down"}
                size={14}
                color={colors.inkMuted}
              />
            </Pressable>

            {langMenuOpen && (
              <View
                style={{
                  position: "absolute",
                  top: 50,
                  right: 0,
                  minWidth: 160,
                  borderRadius: 18,
                  backgroundColor: colors.bg,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 8,
                  shadowColor: "#000",
                  shadowOpacity: 0.12,
                  shadowRadius: 18,
                  shadowOffset: { width: 0, height: 10 },
                }}
              >
                {SUPPORT_LANGS.map((lang) => {
                  const isActive = locale === lang.id

                  return (
                    <Pressable
                      key={lang.id}
                      onPress={() => {
                        setLocale(lang.id as Locale)
                        setLangMenuOpen(false)
                      }}
                      style={({ pressed }: any) => ({
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderRadius: 12,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        backgroundColor: isActive
                          ? "rgba(8,61,145,0.1)"
                          : pressed
                            ? colors.surfaceElevated
                            : "transparent",
                      })}
                    >
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Text style={{ fontSize: 18 }}>{lang.icon}</Text>
                        <Text
                          style={{
                            color: isActive ? colors.brand : colors.ink,
                            fontSize: 13,
                            fontWeight: "700",
                            textTransform: "uppercase",
                          }}
                        >
                          {lang.id}
                        </Text>
                      </View>
                      {isActive && <Ionicons name="checkmark" size={16} color={colors.brand} />}
                    </Pressable>
                  )
                })}
              </View>
            )}
            <Pressable
              onPress={handleRegistration}
              style={({ pressed }: any) => ({
                backgroundColor: pressed ? colors.gold : colors.cta,
                borderRadius: 16,
                paddingVertical: 10,
                paddingHorizontal: 10,
                alignItems: "center",
              })}
            >
              <Text
                style={{
                  color: colors.ctaText,
                  fontSize: 14,
                  fontWeight: "800",
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                {t("footer.navRegister")}
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              setMenuOpen((v) => !v)
              setLangMenuOpen(false)
            }}
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
              onPress={() => handleNavigate(route)}
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
          <Pressable
            onPress={handleRegistration}
            style={({ pressed }: any) => ({
              marginTop: 14,
              backgroundColor: pressed ? colors.gold : colors.cta,
              borderRadius: 18,
              paddingVertical: 14,
              paddingHorizontal: 18,
              alignItems: "center",
            })}
          >
            <Text
              style={{
                color: colors.ctaText,
                fontSize: 14,
                fontWeight: "800",
                letterSpacing: 0.4,
                textTransform: "uppercase",
              }}
            >
              {t("footer.navRegister")}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}
