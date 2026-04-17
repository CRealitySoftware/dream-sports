import PageHero, { HeroVariant } from "@/components/ui/PageHero";
import { SECTIONS_IDS } from "@/constants/landing";
import { useTranslation } from "@/i18n/I18nProvider";
import { scrollToSection } from "@/utils/scrollToSection";
import { useRouter } from "expo-router";

const BG_IMAGE = require("../../../../assets/images/sports/football-bg.jpg")
const BG_VIDEO = require("../../../../assets/images/sports/footbal-bg-video.mp4")

interface HeroProps {
  variant?: HeroVariant
}

export default function Hero({ variant = "plain" }: HeroProps) {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <PageHero
      variant={variant}
      imageSource={BG_IMAGE}
      videoSource={BG_VIDEO}
      badge={t("hero.badge")}
      title={t("hero.title")}
      accentLineIndex={1}
      subtitle={t("hero.subtitle")}
      primaryCta={{ label: t("hero.cta"), onPress: () => scrollToSection(SECTIONS_IDS.registration.toString()) }}
      secondaryCta={{ label: t("hero.ctaSecondary"), onPress: () => scrollToSection(SECTIONS_IDS.about.toString()) }}
      stats={[
        { value: 160, label: t("stats.spots") },
        { value: 4, label: t("stats.disciplines") },
        { value: 86, label: t("stats.days") },
      ]}
    />
  )
}
