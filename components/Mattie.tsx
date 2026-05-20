"use client";

import { motion } from "framer-motion";
import { BookOpen, HandHeart, PhoneCall, Sunrise } from "lucide-react";
import SectionHeader from "./SectionHeader";

const examples = [
  {
    icon: BookOpen,
    title: "Remembers family names",
    body: "“How is your grandson Alex doing in school?” — picking up the thread instead of starting over.",
  },
  {
    icon: PhoneCall,
    title: "Follows up on past conversations",
    body: "“Last week you mentioned the church potluck — how did it go?”",
  },
  {
    icon: HandHeart,
    title: "Encourages connection",
    body: "“It's been a few days since you spoke with your daughter. Want me to remind you to call her tonight?”",
  },
  {
    icon: Sunrise,
    title: "Gentle daily check-ins",
    body: "“How are you feeling this morning? Anything on your mind I can keep track of for you?”",
  },
];

export default function Mattie() {
  return (
    <section id="mattie" className="relative py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Meet Mattie"
          title={<>Meet Mattie.</>}
          subtitle="Mattie is a continuity-focused AI companion built to support ongoing conversation, familiarity, and emotional connection. Mattie is here to help — not to replace the people who matter most."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: stylized conversation card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-[2rem] border border-ink-900/5 bg-white/90 p-6 shadow-warm sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-500">
                Tuesday — 8:42 AM
              </p>

              <div className="mt-5 space-y-4">
                <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-cream-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  Good morning, James. Did the new heating pad help your back
                  last night?
                </div>
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-md bg-sky-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  It actually did. Slept a little better.
                </div>
                <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-cream-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  I&apos;m glad. Your daughter Sarah is flying in on Saturday,
                  right? Want me to remind you tomorrow to tidy the guest room?
                </div>
                <div className="ml-auto max-w-[60%] rounded-2xl rounded-tr-md bg-sky-100 px-5 py-4 text-[17px] leading-relaxed text-ink-800">
                  Yes, please.
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-gradient-to-r from-cream-100 to-sky-50 px-4 py-3">
                <p className="text-xs font-medium uppercase tracking-widest text-sky-700">
                  Memory continuity
                </p>
                <p className="text-xs text-ink-600">
                  Heating pad • Sarah&apos;s visit • Back pain
                </p>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 -bottom-6 hidden w-56 rounded-2xl border border-ink-900/5 bg-white/95 p-4 shadow-warm sm:block"
            >
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gold-500">
                Reminder
              </p>
              <p className="mt-1.5 text-sm leading-snug text-ink-800">
                Tomorrow 4 PM — tidy guest room before Sarah&apos;s visit.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: example cards */}
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
          Mattie is here to help your loved ones feel remembered — and to gently
          remind them, and you, that you have each other.
        </motion.p>
      </div>
    </section>
  );
}
