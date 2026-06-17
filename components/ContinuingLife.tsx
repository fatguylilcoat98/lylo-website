"use client";

import { motion } from "framer-motion";

const pillars = [
  {
    headline: "While you're here",
    body: "Preserve stories now — not someday — while the people who lived them still can.",
  },
  {
    headline: "With the people you love",
    body: "Every saved story becomes an invitation for a conversation that might not have happened otherwise.",
  },
  {
    headline: "For those still coming",
    body: "Grandchildren yet to be born. Family you haven't met yet. They will know you.",
  },
];

export default function ContinuingLife() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold-400/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-sky-300/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.18em] text-gold-400"
        >
          The real purpose
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
          className="mt-6 font-serif text-4xl leading-[1.06] tracking-tight text-balance text-cream-50 sm:text-5xl md:text-[3.75rem]"
        >
          LYLO isn&apos;t about death.
          <br />
          <span className="text-gold-400">It&apos;s about continuing life.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-cream-100/75 sm:text-xl"
        >
          Preserve your stories. Strengthen your relationships. Be remembered —
          not someday, but right now, while the people you love are still here.
        </motion.p>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.headline}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.3 + idx * 0.08 }}
              className="rounded-2xl border border-cream-50/10 bg-cream-50/5 p-5 text-left backdrop-blur"
            >
              <p className="font-serif text-lg text-cream-50">{item.headline}</p>
              <p className="mt-2 text-sm leading-relaxed text-cream-100/65">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
