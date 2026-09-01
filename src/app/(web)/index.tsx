import { AnimatedSection } from "@/components/ui/AnimatedSection";
import OrganizationJsonLd from "@/components/seo/OrganizationJsonLd";
import SeoHead from "@/components/seo/SeoHead";
import Hero from "@/components/website/landing/Hero";
import AboutMissionVisionSection from "@/components/website/landing/sections/about/AboutMissionVisionSection";
import AlliesSection from "@/components/website/landing/sections/AlliesSection";
import DisciplinesSection from "@/components/website/landing/sections/DisciplinesSection";
import ExperienceSection from "@/components/website/landing/sections/ExperienceSection";
import FooterSection from "@/components/website/landing/sections/FooterSection";
import InstitutionalAllianceSection from "@/components/website/landing/sections/InstitutionalAllianceSection";
import InvestmentSection from "@/components/website/landing/sections/InvestmentSection";
import ProjectManagersSection from "@/components/website/landing/sections/ProjectManagersSection";
import QuienesSomosSection from "@/components/website/landing/sections/QuienesSomosSection";
import RegistrationSection from "@/components/website/landing/sections/RegistrationSection";
import VideoSection from "@/components/website/landing/sections/VideoSection";
import { ScrollView } from "react-native";

export default function LandingPage() {
  return (
    <ScrollView>
      <SeoHead
        title="Programa Internacional Roma 2026"
        description="Inmersión deportiva y reclutamiento en Europa. Conectamos talento colombiano en fútbol, baloncesto y voleibol con el ecosistema profesional italiano."
        path="/"
      />
      <OrganizationJsonLd />
      <Hero variant="video" />
      <AnimatedSection variant="fadeIn">
        <QuienesSomosSection />
      </AnimatedSection>
      <InstitutionalAllianceSection />
      <ProjectManagersSection />
      <AboutMissionVisionSection variant="surface" />
      <VideoSection />
      <DisciplinesSection />
      <ExperienceSection />
      <AlliesSection />
      <InvestmentSection />
      <RegistrationSection />
      <FooterSection />
    </ScrollView>
  );
}
