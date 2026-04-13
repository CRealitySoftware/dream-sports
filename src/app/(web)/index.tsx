import AlliesSection from "@/components/sections/AlliesSection";
import DisciplinesSection from "@/components/sections/DisciplinesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FooterSection from "@/components/sections/FooterSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ProgramSection from "@/components/sections/ProgramSection";
import QuienesSomosSection from "@/components/sections/QuienesSomosSection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import Hero from "@/components/website/landing/Hero";
import { ScrollView } from "react-native";

export default function LandingPage() {
  return (
    <ScrollView>
      <Hero variant="video"/>
      <AnimatedSection variant="fadeIn">
        <QuienesSomosSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeIn">
        <MissionVisionSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeIn">
        <ProgramSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <DisciplinesSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <ExperienceSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <AlliesSection />
      </AnimatedSection>
      <AnimatedSection variant="fadeUp">
        <RegistrationSection />
      </AnimatedSection>
      <FooterSection />
    </ScrollView>
  )
}
