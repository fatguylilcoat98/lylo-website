"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, HandHeart } from "lucide-react";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-gold-100 via-cream-100 to-sky-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-ink-900/5 bg-white shadow-warm">
                {/* Stylized portrait placeholder — no stock robot imagery */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-cream-100 via-sky-50 to-gold-50">
                  <svg
                    viewBox="0 0 200 240"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <defs>
                      <radialGradient id="warm" cx="50%" cy="38%" r="55%">
                        <stop offset="0%" stopColor="#F6E8C2" />
                        <stop offset="100%" stopColor="#E4EEF6" />
                      </radialGradient>
                    </defs>
                    <rect width="200" height="240" fill="url(#warm)" />
                    <circle cx="100" cy="92" r="38" fill="#FBF8F1" />
                    <path
                      d="M40 230c10-44 40-66 60-66s50 22 60 66z"
                      fill="#FBF8F1"
                    />
                    <circle cx="100" cy="92" r="38" stroke="#E5C476" strokeWidth="1.5" fill="none" opacity="0.5"/>
                  </svg>
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-3 backdrop-blur">
                    <p className="font-serif text-lg text-ink-900">
                      Christopher Hughes
                    </p>
                    <p className="text-xs uppercase tracking-widest text-gold-500">
                      Founder · Lylo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              From the founder
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-ink-900 text-balance sm:text-4xl md:text-[2.75rem]">
              “I wanted to build AI that remembers people — not just data.”
            </h2>
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-700 sm:text-lg">
              <p>
                Christopher started building continuity-focused AI systems after
                seeing how disconnected and forgetful most AI interactions felt
                — especially for the people who need warmth and recognition the
                most.
              </p>
              <p>
                The mission behind Lylo is simple: build AI that helps people
                feel remembered, supported, and protected. AI that quietly
                strengthens human relationships, instead of competing with them.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "Truth" },
                { icon: ShieldCheck, label: "Safety" },
                { icon: HandHeart, label: "We Got Your Back" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-white px-4 py-3 shadow-soft"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-500">
                    <v.icon size={18} strokeWidth={2} />
                  </div>
                  <p className="font-medium text-ink-800">{v.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
