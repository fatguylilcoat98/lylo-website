"use client";

import { motion } from "framer-motion";
import { Lock, Heart, Send } from "lucide-react";
import SectionHeader from "./SectionHeader";

const reasons = [
  {
    icon: Heart,
    title: "Things left unsaid",
    body: "Not every feeling fits in a conversation. A preserved letter gives you the space to say it the way you mean it.",
  },
  {
    icon: Lock,
    title: "Delivered on your terms",
    body: "Choose who receives it and when. Some letters are for right now. Others are for someday.",
  },
  {
    icon: Send,
    title: "A reason to reach out",
    body: "When a loved one learns a letter is waiting for them, they call. That phone call is the whole point.",
  },
];

export default function LegacyLetter() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-gold-50/20 to-cream-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Legacy Letters"
          title={
            <>
              Some things deserve{" "}
              <span className="italic text-ink-700">to be said properly.</span>
            </>
          }
          subtitle="A Legacy Letter is a private message preserved for someone specific — to be read when the time is right. Not a text message. Not an email. Something they will keep."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          {/* Letter mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-[2rem] border border-gold-200/60 bg-gradient-to-b from-cream-100 to-cream-50 p-7 shadow-warm sm:p-9">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
                    A letter for
                  </p>
                  <p className="mt-1 font-serif text-2xl text-ink-900">Emma</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
                  <Heart size={20} />
                </div>
              </div>

              <div className="space-y-4 border-t border-gold-200/50 pt-6 font-serif text-[17px] leading-relaxed text-ink-700">
                <p>Emma,</p>
                <p>
                  I don&apos;t say this enough, but watching you grow into who you are
                  has been the best thing I&apos;ve ever been part of.
                </p>
                <p>
                  The rain boots. The late-night calls. The way you still ask for
                  my biscuits every time you come home. I want you to know I
                  notice all of it.
                </p>
                <p>— Dad</p>
              </div>

              <div className="mt-7 flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 text-xs text-ink-500">
                <span className="flex items-center gap-1.5">
                  <Lock size={12} />
                  Private · for Emma only
                </span>
                <span className="text-gold-500">Preserved June 2024</span>
              </div>
            </div>
          </motion.div>

          {/* Feature list */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 lg:col-span-7">
            {reasons.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.09 }}
                className="flex gap-5 rounded-3xl border border-ink-900/5 bg-white/80 p-6 shadow-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-500">
                  <item.icon size={20} strokeWidth={1.9} />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-ink-900">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="rounded-3xl border border-ink-900/5 bg-ink-900 p-6 text-cream-50"
            >
              <p className="font-serif text-xl leading-snug">
                &ldquo;I want you to know how proud I am of you.&rdquo;
              </p>
              <p className="mt-3 text-sm leading-relaxed text-cream-100/70">
                LYLO heard this and asked: should we preserve this as a letter
                for your daughter? One tap, and it&apos;s kept — in their own words,
                forever.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
