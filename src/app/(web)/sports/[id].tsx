import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import SportHeroSection from '@/components/website/landing/sections/sports/SportHeroSection';
import SportItalySection from '@/components/website/landing/sections/sports/SportItalySection';
import SportPresentationSection from '@/components/website/landing/sections/sports/SportPresentationSection';
import SportSelectionDatesSection from '@/components/website/landing/sections/sports/SportSelectionDatesSection';
import { Redirect, useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

const VALID_SPORTS = ['football', 'basketball', 'volleyball' /* , 'cycling' */]

export default function Page() {
    const { id } = useLocalSearchParams<{ id: string }>()

    if (!id || !VALID_SPORTS.includes(id)) {
        return <Redirect href="/(web)/not-found" />
    }

    return (
        <ScrollView>
            <SportHeroSection sportId={id} />
            <SportPresentationSection sportId={id} />
            <SportSelectionDatesSection sportId={id} />
            <SportItalySection />
            {/* <SportVideoSection /> */}
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
