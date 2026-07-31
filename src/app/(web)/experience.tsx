import Background from "@/assets/images/uploads/volleyball-action.jpg";
import SeoHead from '@/components/seo/SeoHead';
import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import ExperienceFullSection from '@/components/website/landing/sections/ExperienceFullSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import { useTranslation } from '@/i18n/I18nProvider';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    const { t } = useTranslation()
    return (
        <ScrollView>
            <SeoHead
                title="La Experiencia: 86 Días en Roma"
                description="Selección, preparación e inmersión en Italia. Descubre cómo es la experiencia completa del programa Dream Sports International."
                path="/experience"
            />
            <PageHero
                imageSource={Background}
                variant="image"
                badge={t("experienceHero.eyebrow")}
                title={t("experienceHero.headline")}
                subtitle={t("experienceHero.subheadline")}
                minHeightScale={0.8}
            />
            <ExperienceFullSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}