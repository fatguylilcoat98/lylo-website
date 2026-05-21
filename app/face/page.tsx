import type { Metadata } from "next";
import ParticleFace from "@/components/ParticleFace";

export const metadata: Metadata = {
  title: "Particle Face",
  description: "AI companion particle face avatar",
};

export default function FacePage() {
  return (
    <div className="fixed inset-0 bg-[#03080e]">
      <ParticleFace />
    </div>
  );
}
