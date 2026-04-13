import AlliesSection from "@/components/sections/AlliesSection";
import DisciplinesSection from "@/components/sections/DisciplinesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import FooterSection from "@/components/sections/FooterSection";
import MissionVisionSection from "@/components/sections/MissionVisionSection";
import ProgramSection from "@/components/sections/ProgramSection";
import QuienesSomosSection from "@/components/sections/QuienesSomosSection";
import RegistrationSection from "@/components/sections/RegistrationSection";
import Hero from "@/components/website/landing/Hero";
import { ScrollView } from "react-native";

export default function LandingPage() {
  return (
    <ScrollView>
      <Hero />
      <QuienesSomosSection />
      <MissionVisionSection />
      <ProgramSection />
      <DisciplinesSection />
      <ExperienceSection />
      <AlliesSection />
      <RegistrationSection />
      <FooterSection />
    </ScrollView>
  );
}
