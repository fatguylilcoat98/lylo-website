"use client";

import { motion } from "framer-motion";
import { Home, HeartHandshake, Stethoscope, Building2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const audiences = [
  {
    icon: Home,
    title: "Seniors aging in place",
    body: "A familiar, patient companion that grows alongside their days — helping the world feel a little less quiet.",
    accent: "from-gold-100 to-cream-100",
  },
  {
    icon: HeartHandshake,
    title: "Families supporting loved ones remotely",
    body: "Stay close to mom or dad between visits and calls, with optional gentle updates that keep you in the loop.",
    accent: "from-sky-100 to-cream-100",
  },
  {
    icon: Stethoscope,
    title: "Caregivers",
    body: "A supportive companion that takes some of the everyday emotional weight off — so you can be present where it matters most.",
    accent: "from-cream-100 to-gold-100",
  },
  {
    icon: Building2,
    title: "Assisted living communities",
    body: "Augment the wonderful staff you already have with a calm, continuity-focused presence available around the clock.",
    accent: "from-sky-100 to-gold-100",
  },
];

export default function WhoFor() {
  return (
    <section id="who" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Who it's for"
          title="Built for the people doing the loving."
          subtitle="Lylo is designed for the everyday moments — the ones too small to schedule, but too important to lose."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, idx) => (
            <motion.article
              key={a.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="group relative overflow-hidden rounded-3xl border border-ink-900/5 bg-white p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-warm"
            >
              <div
                aria-hidden="true"
                className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${a.accent} opacity-70 blur-2xl transition-transform group-hover:scale-110`}
              />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-100 text-ink-800">
                  <a.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="font-serif text-xl leading-snug text-ink-900">
                  {a.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                  {a.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
