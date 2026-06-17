"use client";

import { motion } from "framer-motion";
import { GraduationCap, Utensils, Baby, Home, TreePine, Users } from "lucide-react";
import SectionHeader from "./SectionHeader";

const cases = [
  {
    icon: Users,
    title: "Parents with kids away at college",
    body: "She's three states away and busy. But when LYLO tells her Dad shared a new story about her this week, she calls home.",
    tag: "Most common",
  },
  {
    icon: TreePine,
    title: "Grandparents preserving traditions",
    body: "The family recipes. The holiday rituals. The stories of where we came from. Preserve them now while the person who knows them best still can.",
    tag: null,
  },
  {
    icon: Utensils,
    title: "Family recipes that live in memory",
    body: "No one wrote it down. It was always just something Grandma knew. LYLO captures it in her words — the real version, not a guess.",
    tag: null,
  },
  {
    icon: Baby,
    title: "Capturing early childhood",
    body: "The first year goes fast. The stories you think you'll remember, you won't. LYLO makes it easy to preserve them as they happen.",
    tag: null,
  },
  {
    icon: Home,
    title: "Families still living together",
    body: "You don't have to be far away for a story to get lost. Ordinary moments — Sunday mornings, inside jokes, small rituals — are worth preserving too.",
    tag: null,
  },
  {
    icon: GraduationCap,
    title: "Life transitions and milestones",
    body: "A new job. Moving away. Getting married. These are the moments that deserve more than a photo. They deserve the story behind them.",
    tag: null,
  },
];

export default function LifeUseCases() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Built for every stage of life"
          title={
            <>
              Memory preservation{" "}
              <span className="italic text-ink-700">isn&apos;t just for the end.</span>
            </>
          }
          subtitle="LYLO is for families who are still together, still making memories, and who want to make sure those memories survive."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
              className="group relative rounded-3xl border border-ink-900/5 bg-white/80 p-7 shadow-soft backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:shadow-warm"
            >
              {item.tag && (
                <span className="absolute right-5 top-5 rounded-full bg-gold-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold-500">
                  {item.tag}
                </span>
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cream-100 to-sky-50 text-sky-600">
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-14 max-w-2xl text-center"
        >
          <p className="text-lg italic leading-relaxed text-ink-600">
            The universal ache is this: people wish they had asked their parents
            more questions. LYLO is the answer to that wish — while there&apos;s
            still time to ask.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
