"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

type Bubble = {
  from: "mattie" | "user";
  text: string;
  note?: string;
};

const bubbles: Bubble[] = [
  {
    from: "mattie",
    text: "Good morning, Margaret. How did you sleep after the storm last night?",
    note: "Remembers last night's weather",
  },
  {
    from: "user",
    text: "A little restless, but I'm okay. The rain was loud.",
  },
  {
    from: "mattie",
    text: "I'm glad you're alright. Did Emily make it home safely from her trip on Sunday?",
    note: "Remembers your granddaughter",
  },
  {
    from: "user",
    text: "Yes! She called me yesterday. She sounded happy.",
  },
  {
    from: "mattie",
    text: "That's wonderful. Would you like me to remind you to call her back this Friday — like you usually do?",
    note: "Encourages family connection",
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
              <Heart size={20} strokeWidth={2.2} />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
          </div>
          <div className="flex-1">
            <p className="font-serif text-lg leading-none text-ink-900">
              Mattie
            </p>
            <p className="mt-1 text-xs text-ink-500">
              Listening • Remembering you
            </p>
          </div>
          <Sparkles size={18} className="text-gold-400" />
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
                  b.from === "mattie"
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
          <p className="text-sm text-ink-500">Mattie is thinking with you…</p>
        </div>
      </motion.div>

      {/* Decorative continuity card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 20, rotate: 4 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-6 -right-3 hidden w-56 rounded-2xl border border-ink-900/5 bg-white/95 p-4 shadow-warm sm:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-sky-600">
          Memory
        </p>
        <p className="mt-1.5 text-sm leading-snug text-ink-800">
          “Margaret&apos;s granddaughter is Emily. They call Fridays.”
        </p>
      </motion.div>
    </div>
  );
}
