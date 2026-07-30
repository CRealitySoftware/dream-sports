import Background from "@/assets/images/uploads/soccer-match-italy.jpg";
import PageHero from '@/components/ui/PageHero';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import SponsorAlliesSection from '@/components/website/landing/sections/SponsorAlliesSection';
import { useTranslation } from '@/i18n/I18nProvider';
import React from 'react';
import { ScrollView } from 'react-native';

export default function Page() {
    const { t } = useTranslation()
    return (
        <ScrollView>
            <PageHero
                imageSource={Background}
                variant="image"
                badge={t("sponsors.sectionTag")}
                title={t("sponsors.sectionTitle")}
                subtitle={t("sponsors.subtitle")}
                minHeightScale={0.8}
            />
            <SponsorAlliesSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}