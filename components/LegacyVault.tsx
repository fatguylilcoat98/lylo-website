"use client";

import { motion } from "framer-motion";
import { Archive, Lock, Mic, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";

const examples = [
  {
    icon: Mic,
    title: "Record the real story",
    body: "Life stories, recipes, advice, prayers, memories, and messages saved in the person's own words.",
  },
  {
    icon: Users,
    title: "Choose who can hear it",
    body: "Mark memories as family-shared, private, locked, or saved for later access.",
  },
  {
    icon: Lock,
    title: "Protect private memories",
    body: "Not every memory is meant for everyone. Lylo keeps boundaries clear.",
  },
  {
    icon: Archive,
    title: "Build a family archive",
    body: "Create a searchable vault of approved memories that loved ones can return to later.",
  },
];

export default function LegacyVault() {
  return (
    <section id="legacy" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Legacy Vault"
          title={<>A governed memory vault for the people you love.</>}
          subtitle="Lylo starts simple: record what matters, choose who can access it, and preserve it without letting AI invent someone's life."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-[2rem] border border-ink-900/5 bg-white/90 p-6 shadow-warm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                Memory Recording
              </p>

              <div className="mt-5 space-y-4">
                <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-cream-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  Tell me a recipe you want your family to have forever.
                </div>
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-md bg-sky-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  I make biscuits and gravy every Sunday. The trick is the pepper.
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-cream-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  Should this be shared with your family, kept private, or locked in your vault?
                </div>
                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-md bg-sky-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  Share this one with family.
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-cream-100 to-sky-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-widest text-sky-700">
                  Saved memory
                </p>
                <p className="mt-1 text-xs text-ink-600">
                  Biscuits and gravy &bull; Family shared &bull; In your own words
                </p>
              </div>
            </div>
          </motion.div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {examples.map((ex, idx) => (
              <motion.li
                key={ex.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-3xl border border-ink-900/5 bg-white/80 p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-500">
                  <ex.icon size={20} strokeWidth={1.9} />
                </div>
                <h3 className="font-serif text-lg leading-snug text-ink-900">
                  {ex.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                  {ex.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-2xl text-center text-base italic text-ink-600 sm:text-lg"
        >
          Lylo is not here to replace the person. It is here to preserve what
          they chose to leave behind.
        </motion.p>
      </div>
    </section>
  );
}
