import AboutSection from "@/components/landing/AboutSection";
import CTASection from "@/components/landing/Cta/CTASection";
import FAQSection from "@/components/landing/Faq/FAQSection";
import FeatureSection from "@/components/landing/Features/FeatureSection";
import Footer from "@/components/landing/Footer";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/how-it-works/HowItWorks";
import Navbar from "@/components/landing/Navbar";
import { GridBackground } from "@/components/shared/GridBackground";

export default function Home() {
  return (
    <GridBackground>
      <Navbar />
      <main className="pt-24">
        <HeroSection />
        <AboutSection />
        <FeatureSection />
        <HowItWorks />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </GridBackground>
  );
}
