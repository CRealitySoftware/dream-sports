import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import DisciplinesSection from '@/components/website/landing/sections/DisciplinesSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import { useTranslation } from '@/i18n/I18nProvider';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {

    const { t } = useTranslation()

    return (
        <ScrollView>
            <PageHero
                minHeightScale={0.5}
                title={t("sports.title")}
                subtitle={t("sports.subtitle")}
            />
            <DisciplinesSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}