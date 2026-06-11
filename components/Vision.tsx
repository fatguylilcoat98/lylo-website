"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mic, Volume2, Heart, Leaf, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const items = [
  {
    icon: MessageCircle,
    title: "Conversations, not forms",
    body: "Recording a memory should feel like talking to someone you trust — not filling out a questionnaire. LYLO guides gently and never pushes.",
    future: false,
  },
  {
    icon: Mic,
    title: "Stories in their own voice",
    body: "The inflection. The pause. The laugh mid-sentence. LYLO captures stories as they were actually told — in the words of the person who lived them.",
    future: false,
  },
  {
    icon: Volume2,
    title: "Hear them again someday",
    body: "We are working toward a future where loved ones can hear the real voice of someone they never got to meet. Not a summary — the real thing.",
    future: true,
  },
  {
    icon: Heart,
    title: "A companion, never a replacement",
    body: "LYLO exists to preserve what someone chose to leave behind. It will never recreate or speak on behalf of a person without explicit permission.",
    future: false,
  },
  {
    icon: Leaf,
    title: "A living gift for those not yet born",
    body: "Grandchildren. Children too young to remember. LYLO builds a bridge from the stories of today into the lives of people who have not arrived yet.",
    future: false,
  },
  {
    icon: ShieldCheck,
    title: "Every story stays protected",
    body: "Memories only reach the people the creator intended. Nothing surfaces without explicit permission. The vault belongs to the person, always.",
    future: false,
  },
];

export default function Vision() {
  return (
    <section id="vision" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-gold-50/30 to-cream-50" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-20 -z-10 h-[600px] w-[600px] rounded-full bg-gold-100/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-20 -z-10 h-[500px] w-[500px] rounded-full bg-sky-100/40 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="The Vision"
          title={
            <>
              Not just a record.{" "}
              <span className="italic text-ink-700">A bridge across time.</span>
            </>
          }
          subtitle="LYLO is being built for a future where no story is lost because no one thought to write it down — and where the people we love are never truly gone."
        />

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-gold-200/60 bg-gradient-to-r from-gold-50/90 via-cream-100/80 to-gold-50/90 px-8 py-9 text-center shadow-soft sm:px-12"
        >
          <p className="font-serif text-xl italic leading-relaxed text-ink-800 sm:text-2xl text-balance">
            &ldquo;The people we love aren&apos;t just in the present. They&apos;re in every
            recipe that gets made, every story that gets told, every lesson that
            gets passed down.&rdquo;
          </p>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.18em] text-gold-500">
            LYLO — Remember · Preserve · Cherish
          </p>
        </motion.blockquote>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut", delay: idx * 0.06 }}
              className="group relative rounded-3xl border border-ink-900/5 bg-white/85 p-7 shadow-soft backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:shadow-warm"
            >
              {item.future && (
                <span className="absolute right-5 top-5 rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-sky-600">
                  Coming soon
                </span>
              )}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-50 to-cream-100 text-gold-500">
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
