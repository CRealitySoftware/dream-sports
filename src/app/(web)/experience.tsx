import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import ExperienceSection from '@/components/website/landing/sections/ExperienceSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import { useTranslation } from '@/i18n/I18nProvider';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    const { t } = useTranslation()
    return (
        <ScrollView>
            <PageHero
                variant="plain"
                badge={t("experienceHero.eyebrow")}
                title={t("experienceHero.headline")}
                subtitle={t("experienceHero.subheadline")}
                minHeightScale={0.8}
            />
            <ExperienceSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}