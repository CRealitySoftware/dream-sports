import SeoHead from '@/components/seo/SeoHead';
import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import SportHeroSection from '@/components/website/landing/sections/sports/SportHeroSection';
import SportItalySection from '@/components/website/landing/sections/sports/SportItalySection';
import SportPresentationSection from '@/components/website/landing/sections/sports/SportPresentationSection';
import { useTranslation } from '@/i18n/I18nProvider';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

const VALID_SPORTS = ['football', 'basketball', 'volleyball' /* , 'cycling' */]

export default function Page() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { t } = useTranslation()

    if (!id || !VALID_SPORTS.includes(id)) {
        return <Redirect href="/(web)/not-found" />
    }

    return (
        <ScrollView>
            <SeoHead
                title={t(`disciplines.${id}.name`)}
                description={t(`disciplines.${id}.summary`)}
                path={`/sports/${id}`}
            />
            <SportHeroSection sportId={id} />
            <SportPresentationSection sportId={id} />
            {/* <SportSelectionDatesSection sportId={id} /> */}
            <SportItalySection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
