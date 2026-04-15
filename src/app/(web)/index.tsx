import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Hero from "@/components/website/landing/Hero";
import AboutMissionVisionSection from "@/components/website/landing/sections/about/AboutMissionVisionSection";
import AlliesSection from "@/components/website/landing/sections/AlliesSection";
import DisciplinesSection from "@/components/website/landing/sections/DisciplinesSection";
import ExperienceSection from "@/components/website/landing/sections/ExperienceSection";
import FooterSection from "@/components/website/landing/sections/FooterSection";
import ProgramSection from "@/components/website/landing/sections/ProgramSection";
import QuienesSomosSection from "@/components/website/landing/sections/QuienesSomosSection";
import RegistrationSection from "@/components/website/landing/sections/RegistrationSection";
import { ScrollView } from "react-native";

export default function LandingPage() {
  return (
    <ScrollView>
      <Hero variant="video" />
      <AnimatedSection variant="fadeIn">
        <QuienesSomosSection />
      </AnimatedSection>
      <AboutMissionVisionSection variant="surfaceMuted" />
      <AnimatedSection variant="fadeIn">
        <ProgramSection />
      </AnimatedSection>
      <DisciplinesSection />
      <AnimatedSection variant="fadeUp">
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <AlliesSection />
      </AnimatedSection>
      <RegistrationSection />
      <FooterSection />
    </ScrollView>
  )
}
