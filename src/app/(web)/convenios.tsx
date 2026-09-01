import SeoHead from '@/components/seo/SeoHead';
import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import InstitutionalAllianceSection from '@/components/website/landing/sections/InstitutionalAllianceSection';
import PermanenceFullSection from '@/components/website/landing/sections/PermanenceFullSection';
import { useTranslation } from '@/i18n/I18nProvider';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    const { t } = useTranslation()
    return (
        <ScrollView>
            <SeoHead
                title="Convenios y Respaldo Institucional"
                description="Los convenios y respaldos institucionales que garantizan el programa Dream Sports International: CONI, Gobernación de Roma, Iberia y la red de clubes italianos."
                path="/convenios"
            />
            <PageHero
                variant="plain"
                badge={t("convenios.heroBadge")}
                title={t("convenios.heroTitle")}
                subtitle={t("convenios.heroSubtitle")}
                minHeightScale={0.55}
            />
            <InstitutionalAllianceSection />
            <PermanenceFullSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
