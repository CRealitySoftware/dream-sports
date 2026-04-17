import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import AlliesSection from '@/components/website/landing/sections/AlliesSection';
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
                badge={t("alliesHero.eyebrow")}
                title={t("alliesHero.headline")}
                subtitle={t("alliesHero.subheadline")}
                minHeightScale={0.8}
            />
            <AlliesSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}