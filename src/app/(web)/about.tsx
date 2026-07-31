import SeoHead from "@/components/seo/SeoHead";
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
            <SeoHead
                title="Quiénes Somos"
                description="Dream Sports International es la plataforma que conecta el talento deportivo colombiano con clubes, academias y el ecosistema profesional de Italia."
                path="/about"
            />
            {/*  */}
            <HeroAbout />
            
            {/* Constitucion legal en roma */}
            <WhoWeAreSection /> 
            
            <ValuePillarsSection />
            <AboutMissionVisionSection />
            <ExchangeOverviewSection />
            {/* Quitar objetivos de intercambio -> Organización de grupos para los ciclos en Italia | Evaluación técnica, táctica y física inicial*/}
            <StrengthsSection />
            <AboutCtaSection />
            <FooterSection />
        </ScrollView>
    )
}
