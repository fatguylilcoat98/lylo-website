"use client";

import { motion } from "framer-motion";
import { Archive, Mic, ShieldCheck, Sparkles } from "lucide-react";

type Bubble = {
  from: "lylo" | "user";
  text: string;
  note?: string;
};

const bubbles: Bubble[] = [
  {
    from: "lylo",
    text: "What would you like to share with your family today?",
    note: "Starts as a recorder",
  },
  {
    from: "user",
    text: "I want to record my biscuits and gravy recipe for my kids.",
  },
  {
    from: "lylo",
    text: "Go ahead. Tell me the recipe in your own words.",
    note: "Does not invent details",
  },
  {
    from: "user",
    text: "The secret is extra black pepper and cooking the gravy real slow.",
  },
  {
    from: "lylo",
    text: "Saved. Should this be shared with your family, kept private, or locked in your vault?",
    note: "Asks permission first",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative rounded-[2.25rem] border border-ink-900/5 bg-white/90 p-5 shadow-warm backdrop-blur sm:p-6"
      >
        <div className="flex items-center gap-3 border-b border-ink-900/5 pb-4">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-sky-200 text-ink-900">
              <Archive size={20} strokeWidth={2.2} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="font-serif text-lg leading-none text-ink-900">
              Lylo
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Recording • Preserving memories
            </p>
          </div>
          <ShieldCheck size={18} className="text-gold-400" />
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-5 space-y-3.5"
        >
          {bubbles.map((b, i) => (
            <motion.li
              key={i}
              variants={item}
              className={`flex ${b.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:text-[16px] ${
                  b.from === "lylo"
                    ? "bg-cream-100 text-ink-800 rounded-tl-md"
                    : "bg-sky-100 text-ink-800 rounded-tr-md"
                }`}
              >
                {b.text}
                {b.note && (
                  <span className="mt-2 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-gold-500">
                    <Sparkles size={12} />
                    {b.note}
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-ink-900/5 bg-cream-50 px-4 py-3">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-400" />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-400"
              style={{ animationDelay: "0.15s" }}
            />
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-400"
              style={{ animationDelay: "0.3s" }}
            />
          </div>
          <p className="text-sm text-ink-500">
            Lylo is saving this with permission…
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20, y: 20, rotate: 4 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-6 -right-3 hidden w-56 rounded-2xl border border-ink-900/5 bg-white/95 p-4 shadow-warm sm:block"
      >
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-sky-600">
          <Mic size={12} />
          Memory Vault
        </p>
        <p className="mt-1.5 text-sm leading-snug text-ink-800">
          "My biscuits and gravy recipe. Family shared. In my own words."
        </p>
      </motion.div>
    </div>
  );
}
