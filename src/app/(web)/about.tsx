import AboutCtaSection from "@/components/website/landing/sections/about/AboutCtaSection";
import AboutMissionVisionSection from "@/components/website/landing/sections/about/AboutMissionVisionSection";
import ExchangeOverviewSection from "@/components/website/landing/sections/about/ExchangeOverviewSection";
import HeroAbout from "@/components/website/landing/sections/about/HeroAbout";
import StrengthsSection from "@/components/website/landing/sections/about/StrengthsSection";
import ValuePillarsSection from "@/components/website/landing/sections/about/ValuePillarsSection";
import WhoWeAreSection from "@/components/website/landing/sections/about/WhoWeAreSection";
import FooterSection from "@/components/website/landing/sections/FooterSection";
import { ScrollView } from "react-native";

export default function AboutPage() {
    return (
        <ScrollView>
            <HeroAbout />
            <WhoWeAreSection />
            <ValuePillarsSection />
            <AboutMissionVisionSection />
            <ExchangeOverviewSection />
            <StrengthsSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
