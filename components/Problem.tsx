"use client";

import { motion } from "framer-motion";
import { CloudRain, Hourglass, MessageCircleHeart, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: CloudRain,
    title: "Quiet days, longer than they should be",
    body: "Many seniors go hours — sometimes whole days — without a meaningful conversation. Loneliness becomes part of the routine.",
  },
  {
    icon: Hourglass,
    title: "Caregivers stretched thin",
    body: "Family caregivers carry love and exhaustion at the same time. There is rarely enough of them to go around.",
  },
  {
    icon: MessageCircleHeart,
    title: "Conversations that disappear",
    body: "Most chats with technology start from zero every time. Nothing is remembered. Nothing builds on what came before.",
  },
  {
    icon: Users,
    title: "Connection still matters most",
    body: "Seniors don't want to be entertained — they want to feel known, recognized, and connected to the people they love.",
  },
];

export default function Problem() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="The Problem"
          title={
            <>
              Too many seniors{" "}
              <span className="italic text-ink-700">feel forgotten.</span>
            </>
          }
          subtitle="The world keeps moving. Conversations get shorter. The people who shaped our lives can quietly slip out of view."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: "easeOut",
                delay: idx * 0.07,
              }}
              className="group relative rounded-3xl border border-ink-900/5 bg-white/80 p-7 shadow-soft backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:shadow-warm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-100 to-sky-100 text-sky-700">
                <item.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-xl leading-snug text-ink-900">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
