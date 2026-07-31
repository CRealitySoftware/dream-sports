import Background from '@/assets/images/sports/bg6.jpg';
import SeoHead from '@/components/seo/SeoHead';
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
            <SeoHead
                title="Disciplinas: Fútbol, Baloncesto y Voleibol"
                description="Formación y competencia en fútbol, baloncesto y voleibol. Conoce las tres disciplinas del programa Dream Sports International en Italia."
                path="/sports"
            />
            <PageHero
                minHeightScale={0.8}
                variant="image"
                imageSource={Background}
                title={t("sports.title")}
                subtitle={t("sports.subtitle")}
            />
            <DisciplinesSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}