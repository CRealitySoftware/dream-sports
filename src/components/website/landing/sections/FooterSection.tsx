import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/i18n/I18nProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { Linking, Pressable, Text, View } from "react-native";
import LogoButton from "../../../ui/LogoButton";

const FG = "#F0F0F0"
const MUTED = "#9AABBD"
const BORDER = "rgba(255,255,255,0.1)"
const DIVIDER = "rgba(255,255,255,0.08)"
const ACCENT = "#E2A820"

const NAV_LINKS = [
  { key: "navHome", section: "inicio" },
  { key: "navWhoWeAre", section: "quienesSomos" },
  { key: "navDisciplines", section: "disciplinas" },
  { key: "navExperience", section: "experiencia" },
  { key: "navAllies", section: "aliados" },
  { key: "navRegister", section: "inscripcion" },
] as const

const SOCIALS = [
  { id: "ig", label: "IG", icon: "instagram" },
  { id: "li", label: "LI", icon: "linkedin-in" },
  { id: "wa", label: "WA", icon: "whatsapp" },
  { id: "yt", label: "YT", icon: "youtube" },
] as const

function SocialButton({ icon }: { icon: string }) {
  return (
    <Pressable
      style={({ pressed }: any) => ({
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: pressed ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <FontAwesome5 name={icon} size={24} color={ACCENT} />
    </Pressable>
  )
}

function BrandColumn({ t }: { t: (k: string) => string }) {
  return (
    <View className="flex-1 items-center md:items-start" style={{ gap: 16 }}>
      <LogoButton />
      <View style={{ gap: 8 }}>
        <Text style={{ color: MUTED, fontSize: 11, fontWeight: "600", letterSpacing: 0.5 }}>
          {t("footer.socialsTitle")}
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {SOCIALS.map((s) => (
            <SocialButton key={s.id} icon={s.icon} />
          ))}
        </View>
      </View>
    </View>
  )
}

function ContactRow({
  prefix,
  value,
  onPress,
}: {
  prefix: string
  value: string
  onPress?: () => void
}) {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ hovered }: any) => ({ opacity: hovered ? 0.75 : 1 })}>
        <Text style={{ color: MUTED, fontSize: 13, lineHeight: 22 }}>
          <Text style={{ color: MUTED }}>{prefix} </Text>
          {value}
        </Text>
      </Pressable>
    )
  }
  return (
    <Text style={{ color: MUTED, fontSize: 13, lineHeight: 22 }}>
      <Text style={{ color: MUTED }}>{prefix} </Text>
      {value}
    </Text>
  )
}

function ContactColumn({ t }: { t: (k: string) => string }) {
  return (
    <View className="flex-1 items-center md:items-start" style={{ gap: 14 }}>
      <Text style={{ color: ACCENT, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>
        {t("footer.contactTitle")}
      </Text>
      <View style={{ gap: 6 }}>
        <ContactRow
          prefix="✉"
          value={t("footer.email")}
          onPress={() => Linking.openURL(`mailto:${t("footer.email")}`)}
        />
        <ContactRow
          prefix="📞 IT"
          value={t("footer.phoneItaly")}
          onPress={() => Linking.openURL(`tel:${t("footer.phoneItaly").replace(/\s/g, "")}`)}
        />
        <ContactRow
          prefix="📞 CO"
          value={t("footer.phoneColombia")}
          onPress={() => Linking.openURL(`tel:${t("footer.phoneColombia").replace(/\s/g, "")}`)}
        />
        <ContactRow prefix="📍" value={t("footer.addressLabel")} />
      </View>
    </View>
  )
}

function NavColumn({
  t,
}: {
  t: (k: string) => string
}) {
  return (
    <View className="flex-1 items-center md:items-start" style={{ gap: 14 }}>
      <Text style={{ color: ACCENT, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }}>
        {t("footer.navTitle")}
      </Text>
      <View style={{ gap: 8 }}>
        {NAV_LINKS.map((link) => (
          <Pressable
            key={link.key}
            onPress={() => { }}
            style={({ hovered }: any) => ({ opacity: hovered ? 1 : 0.85 })}
          >
            {({ hovered }: any) => (
              <Text style={{ color: hovered ? FG : MUTED, fontSize: 13, lineHeight: 22 }}>
                {t(`footer.${link.key}`)}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  )
}

function VerticalDivider() {
  return (
    <View
      className="hidden md:flex"
      style={{ width: 1, alignSelf: "stretch", backgroundColor: DIVIDER }}
    />
  )
}

export default function FooterSection() {
  const { t } = useTranslation()
  const { colors } = useTheme()

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: BORDER,
      }}
    >
      <View style={{ maxWidth: 1120, alignSelf: "center", width: "100%" }}>
        <View
          className="py-16 flex-col md:flex-row items-center md:items-start px-6"
          style={{ gap: 32 }}
        >
          <BrandColumn t={t} />
          <VerticalDivider />
          <ContactColumn t={t} />
          <VerticalDivider />
          <NavColumn t={t} />
        </View>

        <View style={{ height: 1, backgroundColor: BORDER, marginHorizontal: 24 }} />

        <View
          className="py-6 px-6 flex-col md:flex-row items-center md:justify-between"
          style={{ gap: 4 }}
        >
          <Text style={{ color: MUTED, fontSize: 11 }}>{t("footer.copyright")}</Text>
          <Text style={{ color: MUTED, fontSize: 11 }}>{t("footer.legalId")}</Text>
          <Text style={{ color: MUTED, fontSize: 11 }}>{t("footer.rights")}</Text>
        </View>
      </View>
    </View>
  )
}
