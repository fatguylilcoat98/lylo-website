"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function EarlyAccess() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Static export: this is a placeholder. Wire to your form provider later.
    setSubmitted(true);
  };

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
          title="Help shape the future of compassionate AI."
          subtitle="Lylo and Mattie are currently in early testing with seniors, families, and a small group of partner organizations. Join us as we shape what comes next."
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
                  "Early access to Mattie as it grows",
                  "A direct line to the founding team",
                  "Pilot opportunities for organizations & communities",
                  "Quiet, monthly updates — no marketing noise",
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
                  <Sparkles size={16} /> A note from our team
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                  We move slowly on purpose. Every pilot family helps us build
                  something kinder and safer for the next one. Thank you for
                  being part of that.
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
              onSubmit={handleSubmit}
              className="rounded-3xl border border-ink-900/5 bg-white p-7 shadow-warm sm:p-9"
            >
              {!submitted ? (
                <>
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
                      placeholder="Tell us a little about who you're hoping to support, or what kind of pilot you're imagining."
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
                      We&apos;ll only use your information to follow up about
                      Lylo. Never sold, never spammed.
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
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-serif text-2xl text-ink-900">
                    Thank you — we&apos;ll be in touch.
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
                    Someone from our small founding team will personally read
                    your note and follow up soon. We&apos;re grateful you&apos;re
                    here.
                  </p>
                </motion.div>
              )}
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
      <label
        htmlFor={name}
        className="block text-sm font-medium text-ink-700"
      >
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
