import AboutCtaSection from '@/components/website/landing/sections/about/AboutCtaSection';
import FooterSection from '@/components/website/landing/sections/FooterSection';
import SportHeroSection from '@/components/website/landing/sections/sports/SportHeroSection';
import SportItalySection from '@/components/website/landing/sections/sports/SportItalySection';
import SportPresentationSection from '@/components/website/landing/sections/sports/SportPresentationSection';
import SportSelectionDatesSection from '@/components/website/landing/sections/sports/SportSelectionDatesSection';
import SportVideoSection from '@/components/website/landing/sections/sports/SportVideoSection';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';

export default function Page() {
    const { id } = useLocalSearchParams<{ id: string }>()

    return (
        <ScrollView>
            <SportHeroSection sportId={id} />
            <SportPresentationSection sportId={id} />
            <SportSelectionDatesSection sportId={id} />
            <SportItalySection />
            <SportVideoSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
