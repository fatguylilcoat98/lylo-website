"use client";

import { motion } from "framer-motion";
import { Users, Utensils, MapPin, Sparkles, BookOpen } from "lucide-react";
import SectionHeader from "./SectionHeader";

const connections = [
  { icon: Users,    label: "Emma",             color: "bg-sky-100 text-sky-700" },
  { icon: Utensils, label: "Sunday biscuits",  color: "bg-gold-100 text-gold-500" },
  { icon: MapPin,   label: "Grandma's kitchen", color: "bg-cream-200 text-ink-600" },
  { icon: BookOpen, label: "Family traditions", color: "bg-sky-50 text-sky-600" },
  { icon: Sparkles, label: "1970s",             color: "bg-gold-50 text-gold-500" },
];

const profiles = [
  { name: "Emma",   rel: "daughter",    count: 14, recipes: 2 },
  { name: "Steve",  rel: "husband",     count: 9,  recipes: 0 },
  { name: "Grandma Rose", rel: "mother", count: 31, recipes: 7 },
];

export default function MemoryGraph() {
  return (
    <section id="graph" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-sky-50/40 via-cream-50 to-cream-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Legacy Map"
          title={
            <>
              One story.{" "}
              <span className="italic text-ink-700">Connected many ways.</span>
            </>
          }
          subtitle="LYLO doesn't just store memories — it understands them. Every story is automatically linked to the people, places, recipes, and themes inside it."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Memory card + connections */}
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-[2rem] border border-ink-900/5 bg-white p-6 shadow-warm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                Preserved memory
              </p>
              <p className="mt-4 text-[17px] leading-relaxed text-ink-800">
                &ldquo;I make biscuits and gravy every Sunday morning. My mom taught
                me — the trick is the pepper. Emma always asked for seconds.&rdquo;
              </p>
              <p className="mt-2 text-xs text-ink-400">Saved · Family shared · June 2024</p>

              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  Automatically connected to
                </p>
                <div className="flex flex-wrap gap-2">
                  {connections.map((c, idx) => (
                    <motion.span
                      key={c.label}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.4 + idx * 0.07 }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${c.color}`}
                    >
                      <c.icon size={13} strokeWidth={2} />
                      {c.label}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-5 text-center text-sm italic text-ink-500"
            >
              No folders. No tagging. Just talk — LYLO handles the rest.
            </motion.p>
          </motion.div>

          {/* Person profiles */}
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
              Your people
            </p>
            {profiles.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.08 }}
                className="flex items-center gap-5 rounded-3xl border border-ink-900/5 bg-white/80 px-6 py-5 shadow-soft"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-100 to-gold-50 text-gold-500">
                  <Users size={20} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-xl text-ink-900">{person.name}</p>
                  <p className="text-sm capitalize text-ink-500">{person.rel}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xl font-semibold text-ink-900">{person.count}</p>
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-400">
                    {person.count === 1 ? "memory" : "memories"}
                  </p>
                  {person.recipes > 0 && (
                    <p className="mt-0.5 text-xs text-gold-500">
                      {person.recipes} recipes
                    </p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="rounded-3xl border border-gold-200/60 bg-gold-50/70 px-6 py-5"
            >
              <p className="font-serif text-lg text-ink-900">
                &ldquo;Tell me my story through Dad&apos;s eyes.&rdquo;
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                When you&apos;re ready, LYLO assembles everything preserved about
                you into a narrative — written only from what was actually saved.
                It never invents.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
