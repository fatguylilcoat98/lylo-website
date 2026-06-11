import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Mattie from "@/components/Mattie";
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
      <Mattie />
      <Vision />
      <Safety />
      <WhoFor />
      <EarlyAccess />
      <Founder />
      <Footer />
    </main>
  );
}
