"use client";

import { motion } from "framer-motion";
import { Baby, HeartPulse, Home, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";

const audiences = [
  {
    icon: Home,
    title: "Families with aging loved ones",
    body: "Preserve memories, recipes, stories, and life lessons before they disappear.",
    accent: "from-gold-100 to-cream-100",
  },
  {
    icon: HeartPulse,
    title: "Hospice and serious illness",
    body: "Give someone a gentle way to record messages, stories, and words their loved ones may need later.",
    accent: "from-sky-100 to-cream-100",
  },
  {
    icon: Baby,
    title: "Children who may not remember",
    body: "Save first-hand memories from a parent or grandparent for children who are too young to hold them yet.",
    accent: "from-cream-100 to-gold-100",
  },
  {
    icon: Users,
    title: "Family legacy keepers",
    body: "Build a governed family archive with permissions, transcripts, recordings, and protected private memories.",
    accent: "from-sky-100 to-gold-100",
  },
];

export default function WhoFor() {
  return (
    <section id="who" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Who it's for"
          title="Built for families before, during, and after goodbye."
          subtitle="Lylo is for people who know that a voice, a recipe, a story, or one honest message can become priceless later."
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
