"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function EarlyAccess() {
  return (
    <section id="access" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50" />
      <div
        className="absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-gold-100/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -right-32 bottom-10 -z-10 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow="Early Access · Pilot Program"
          title="Help shape LYLO the right way."
          subtitle="LYLO is currently looking for families, caregivers, hospice workers, elder-care organizations, and partners who care about preserving real memories with truth, consent, and care."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl border border-ink-900/5 bg-white/80 p-7 shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
                What you&apos;ll get
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  "Early access updates as LYLO grows",
                  "A direct line to the founding team",
                  "Pilot opportunities for families and organizations",
                  "Quiet updates — no spam, no junk",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 flex-none text-sky-600"
                    />
                    <span className="text-[15px] leading-relaxed text-ink-700">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl bg-cream-100 p-5">
                <p className="flex items-center gap-2 text-sm font-medium text-gold-500">
                  <Sparkles size={16} /> A note from Chris
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                  LYLO is being built slowly on purpose. Memories are someone&apos;s
                  life. The system has to preserve what was really said, not invent
                  what sounds good.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              action="https://formsubmit.co/stangman9898@gmail.com"
              method="POST"
              className="rounded-3xl border border-ink-900/5 bg-white p-7 shadow-warm sm:p-9"
            >
              <input
                type="hidden"
                name="_subject"
                value="New LYLO Early Access Request"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                />
              </div>

              <div className="mt-5">
                <Field
                  label="Organization (optional)"
                  name="organization"
                  type="text"
                  placeholder="Family, caregiver, senior living community, nonprofit…"
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-ink-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us who you want to preserve memories for, or what kind of pilot you are interested in."
                  className="mt-2 w-full rounded-2xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200"
                />
              </div>

              <fieldset className="mt-5">
                <legend className="block text-sm font-medium text-ink-700">
                  I&apos;m interested in
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Join Early Access",
                    "Request a Pilot Demo",
                    "Family Memory Vault",
                    "Hospice / Care Partner",
                    "Partnership / Nonprofit",
                  ].map((opt, i) => (
                    <label
                      key={opt}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink-900/10 bg-cream-50 px-4 py-2 text-sm text-ink-800 transition-colors hover:bg-cream-100"
                    >
                      <input
                        type="checkbox"
                        name="interest"
                        value={opt}
                        defaultChecked={i === 0}
                        className="h-4 w-4 rounded border-ink-900/20 accent-gold-400"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink-500">
                  We&apos;ll only use your information to follow up about LYLO.
                  Never sold, never spammed.
                </p>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 text-base font-medium text-cream-50 shadow-soft transition-all hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-warm"
                >
                  Send request
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700">
        {label}
        {required && <span className="ml-1 text-gold-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-ink-900/10 bg-cream-50 px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 focus:border-gold-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gold-200"
      />
    </div>
  );
}
