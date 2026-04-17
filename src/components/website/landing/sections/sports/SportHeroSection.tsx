import PageHero from "@/components/ui/PageHero";
import { SPORTS_IMAGES } from "@/constants/image";
import { useTranslation } from "@/i18n/I18nProvider";
import { useWindowDimensions } from "react-native";

interface Props {
  sportId: string;
}

export default function SportHeroSection({ sportId }: Props) {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const image = SPORTS_IMAGES[sportId as keyof typeof SPORTS_IMAGES];

  return <PageHero
    variant="image"
    imageSource={image}
    badge={t(`sportPage.${sportId}.selectionDate`)}
    title={t(`disciplines.${sportId}.name`)}
    subtitle={t(`sportPage.${sportId}.headline`)}
    minHeightScale={isDesktop ? 0.65 : 0.55}
  />
}
