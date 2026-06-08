"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mic, ShieldCheck } from "lucide-react";
import AmbientBackground from "./AmbientBackground";
import ChatMockup from "./ChatMockup";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 bg-warm-gradient" aria-hidden="true" />
      <AmbientBackground />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:pb-32 lg:pt-16">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-ink-900/8 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-700 backdrop-blur"
          >
            <span className="inline-flex h-2 w-2 rounded-full bg-gold-400" />
            Love Your Loved One
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
            className="mt-6 font-serif text-[2.6rem] leading-[1.04] tracking-tight text-ink-900 text-balance sm:text-6xl md:text-[4.25rem]"
          >
            Preserve the stories{" "}
            <span className="relative inline-block">
              <span className="relative z-10">your family should never lose.</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-full bg-gold-100 sm:h-4"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 text-pretty sm:text-xl"
          >
            Lylo helps families record memories, recipes, voice stories, life
            lessons, and messages for future generations in a governed legacy
            vault built on truth, consent, and care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#access"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-4 text-base font-medium text-cream-50 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-warm"
            >
              Request Early Access
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#legacy"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 bg-white/70 px-7 py-4 text-base font-medium text-ink-800 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              <Mic size={18} />
              See Memory Vault
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-500"
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} />
              Truth-governed memory
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              Family permission controls
            </span>
          </motion.div>
        </div>

        <div className="relative lg:col-span-5 lg:pl-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
