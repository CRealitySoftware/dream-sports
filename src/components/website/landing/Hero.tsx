import PageHero, { HeroVariant } from "@/components/ui/PageHero";
import { useTranslation } from "@/i18n/I18nProvider";
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
      primaryCta={{ label: t("hero.cta"), onPress: () => router.push("/(web)/register") }}
      secondaryCta={{ label: t("hero.ctaSecondary"), onPress: () => router.push("/(web)/about") }}
      stats={[
        { value: 160, label: t("stats.spots") },
        { value: 4, label: t("stats.disciplines") },
        { value: 86, label: t("stats.days") },
      ]}
    />
  )
}
