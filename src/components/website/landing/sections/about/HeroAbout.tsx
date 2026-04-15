import PageHero from "@/components/ui/PageHero";
import { useTranslation } from "@/i18n/I18nProvider";

export default function HeroAbout() {
  const { t } = useTranslation()
  return (
    <PageHero
      variant={"plain"}
      badge={t("aboutHero.eyebrow")}
      title={t("aboutHero.headline")}
      accentLineIndex={1}
      subtitle={t("aboutHero.subheadline")}
      minHeightScale={0.8}
    />
  )
}
