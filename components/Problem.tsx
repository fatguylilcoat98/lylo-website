"use client";

import { motion } from "framer-motion";
import { BookOpen, Mic, Utensils, HeartCrack } from "lucide-react";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: HeartCrack,
    title: "Some goodbyes come too early",
    body: "A child grows up without a real memory of a parent’s voice. A family loses the person before the stories were ever recorded.",
  },
  {
    icon: Utensils,
    title: "Recipes disappear",
    body: "Biscuits and gravy. Cornbread. Holiday meals. The little details usually live in someone’s hands, not in a cookbook.",
  },
  {
    icon: BookOpen,
    title: "Family stories change over time",
    body: "People mean well, but memories shift. Lylo preserves the story as close as possible to the person who actually lived it.",
  },
  {
    icon: Mic,
    title: "Voices matter",
    body: "Sometimes the most valuable thing is not a summary. It is hearing the person say it in their own words.",
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
              Too many memories{" "}
              <span className="italic text-ink-700">disappear too soon.</span>
            </>
          }
          subtitle="Families often do not realize what they wish they had saved until the person who could tell the story is gone."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.07 }}
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
