import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { TeamSection } from "@/components/TeamSection";
import { MatchesSection } from "@/components/MatchesSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <TeamSection />
        <MatchesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
