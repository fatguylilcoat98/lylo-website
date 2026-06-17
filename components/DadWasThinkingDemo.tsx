"use client";

import { motion } from "framer-motion";
import { BookOpen, MessageSquareText, PhoneCall } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  {
    label: "1. A story happens",
    title: "Dad remembers something ordinary that matters.",
    body:
      "Steve is sitting in his truck after work when he remembers the time Emma insisted on wearing rain boots to Disneyland. He opens LYLO, taps the microphone, and tells the story in his own words.",
  },
  {
    label: "2. LYLO connects it",
    title: "The memory is preserved once and linked many ways.",
    body:
      "LYLO saves the original story, then connects it to Emma, childhood, family vacations, funny moments, and the places and people mentioned. No folders. No tagging. Just talking.",
  },
  {
    label: "3. Life continues",
    title: "Emma gets a reason to call home.",
    body:
      "A few days later, Emma receives a gentle update: Dad shared a new story about you. She calls him, asks about the rain boots, and they laugh together. A preserved memory becomes a new one.",
  },
];

export default function DadWasThinkingDemo() {
  return (
    <section id="demo" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-white to-sky-50/40" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="See the moment"
          title={<>Dad was thinking about you.</>}
          subtitle="LYLO is not just a place to store memories. It is a way for everyday stories to become reasons families reconnect while life is still happening."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="rounded-[2rem] border border-ink-900/5 bg-white p-6 shadow-warm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-cream-50">
                  <MessageSquareText size={23} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">While I Was Thinking of You</p>
                  <h3 className="font-serif text-2xl text-ink-900">A note from Dad</h3>
                </div>
              </div>

              <div className="mt-7 rounded-3xl bg-cream-100 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ink-500">Emma</p>
                <p className="mt-3 text-2xl font-semibold leading-snug text-ink-900">
                  Your dad shared a new story about you this week.
                </p>
                <p className="mt-4 text-[16px] leading-relaxed text-ink-650">
                  It was connected to childhood, family vacations, and funny moments.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white px-4 py-4 shadow-soft">
                  <p className="text-2xl font-semibold text-ink-900">1</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-500">new story</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-4 shadow-soft">
                  <p className="text-2xl font-semibold text-ink-900">5</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-500">connections</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-4 shadow-soft">
                  <p className="text-2xl font-semibold text-ink-900">1</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-500">reason to call</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-gold-200 bg-gold-50/80 px-5 py-4">
                <p className="text-sm font-medium text-ink-900">What happens next?</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  Emma calls home and asks, “Dad, tell me the rain boots story again.”
                </p>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 gap-5">
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.65, delay: index * 0.08 }}
                  className="rounded-[1.75rem] border border-ink-900/5 bg-white p-6 shadow-soft"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">{step.label}</p>
                  <h3 className="mt-3 font-serif text-2xl leading-tight text-ink-900 sm:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-[17px] leading-relaxed text-ink-600">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-ink-900/5 bg-ink-900 p-8 text-center shadow-warm sm:p-10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400 text-ink-900">
            <PhoneCall size={25} />
          </div>
          <h3 className="mt-6 font-serif text-3xl leading-tight text-cream-50 sm:text-5xl">
            LYLO didn&apos;t just preserve a memory. It helped create another one.
          </h3>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-cream-100/80">
            The greatest legacy is not a folder of files. It is one more phone call, one more laugh, one more story, and one more chance to say, “I was thinking about you.”
          </p>
        </motion.div>
      </div>
    </section>
  );
}
