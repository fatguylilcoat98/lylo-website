"use client";

import { motion } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  Eye,
  Users2,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import SectionHeader from "./SectionHeader";

const pillars = [
  {
    icon: Lock,
    title: "Your vault, your rules",
    body: "You decide what gets recorded, what stays private, and who receives access. Every permission is yours to set, adjust, or revoke at any time.",
  },
  {
    icon: ShieldCheck,
    title: "Passcode-protected access",
    body: "Individual memories and your entire vault can be secured with passcode protection. Nothing opens without your direct authorization.",
  },
  {
    icon: CheckCircle2,
    title: "Family access by invitation only",
    body: "No family member receives access to a memory unless the creator explicitly granted it. Consent is not optional — it is built into every step.",
  },
  {
    icon: Eye,
    title: "Transparent by design",
    body: "LYLO is always clearly an AI. No pretending to be human, no hidden agenda, no manipulation. What you see is exactly what it is.",
  },
  {
    icon: HeartHandshake,
    title: "Your data is never sold",
    body: "Your family's stories are never sold, never analyzed for advertising, and never shared with third parties. Your memories belong to your family — full stop.",
  },
  {
    icon: Users2,
    title: "Human oversight built in",
    body: "Families and caregivers can stay in the loop with optional summaries and alerts — keeping people, not algorithms, at the center.",
  },
];

export default function Safety() {
  return (
    <section
      id="safety"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-sky-50/40 to-cream-50" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Privacy & Governance"
          title={
            <>
              Secure by design.{" "}
              <span className="italic text-ink-700">Governed by consent.</span>
            </>
          }
          subtitle="Privacy is not a feature we added later. It is the foundation everything else is built on. Your memories stay under your control — always."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: idx * 0.05 }}
              className="rounded-3xl border border-ink-900/5 bg-white/85 p-7 shadow-soft backdrop-blur transition-all hover:-translate-y-1 hover:bg-white hover:shadow-warm"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-50 to-cream-100 text-sky-700">
                <p.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-xl leading-snug text-ink-900">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-14 max-w-3xl rounded-3xl border border-gold-200/60 bg-gradient-to-r from-gold-50/80 via-cream-100/80 to-sky-50/80 p-7 text-center shadow-soft sm:p-9"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
            Governance partner
          </p>
          <p className="mt-3 text-balance text-lg leading-relaxed text-ink-800 sm:text-xl">
            Powered by governance and verification systems developed by{" "}
            <span className="font-serif italic text-ink-900">
              The Good Neighbor Guard
            </span>{" "}
            — independent oversight focused on truth, safety, and protecting the
            people who matter most.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
