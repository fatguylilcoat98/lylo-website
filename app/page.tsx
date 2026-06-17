import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import LegacyVault from "@/components/LegacyVault";
import MemoryGraph from "@/components/MemoryGraph";
import LegacyLetter from "@/components/LegacyLetter";
import LifeUseCases from "@/components/LifeUseCases";
import ContinuingLife from "@/components/ContinuingLife";
import DadWasThinkingDemo from "@/components/DadWasThinkingDemo";
import Vision from "@/components/Vision";
import Safety from "@/components/Safety";
import WhoFor from "@/components/WhoFor";
import EarlyAccess from "@/components/EarlyAccess";
import Founder from "@/components/Founder";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Problem />
      <ContinuingLife />
      <DadWasThinkingDemo />
      <LegacyVault />
      <MemoryGraph />
      <LegacyLetter />
      <LifeUseCases />
      <Vision />
      <Safety />
      <WhoFor />
      <EarlyAccess />
      <Founder />
      <Footer />
    </main>
  );
}
