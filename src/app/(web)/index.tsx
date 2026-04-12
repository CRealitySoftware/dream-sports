import CTA from "@/components/website/landing/CTA";
import Features from "@/components/website/landing/Features";
import Hero from "@/components/website/landing/Hero";
import HowItWorks from "@/components/website/landing/HowItWorks";
import { ScrollView } from "react-native";

export default function LandingPage() {
  return (
    <ScrollView>
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </ScrollView>
  )
}
