"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, HandHeart } from "lucide-react";
import Image from "next/image";

export default function Founder() {
  return (
    <section id="founder" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 -z-10 rounded-[2.25rem] bg-gradient-to-br from-gold-100 via-cream-100 to-sky-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-ink-900/5 bg-white shadow-warm">
                <div className="relative aspect-[3/4] bg-cream-100">
                  <Image
                    src="/founder-chris.jpg"
                    alt="Christopher Hughes, Founder of LYLO"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 400px"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/85 px-4 py-3 backdrop-blur">
                    <p className="font-serif text-lg text-ink-900">
                      Christopher Hughes
                    </p>
                    <p className="text-xs uppercase tracking-widest text-gold-500">
                      Founder · LYLO
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
              From the founder
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-[1.1] tracking-tight text-ink-900 text-balance sm:text-4xl md:text-[2.75rem]">
              &ldquo;I never had a memory of my mother. She knew she was dying — and she could have left me something.&rdquo;
            </h2>
            <div className="mt-6 space-y-4 text-[16.5px] leading-relaxed text-ink-700 sm:text-lg">
              <p>
                My mother passed away from leukemia when I was four years old. She knew she was going to die. She had time. And now that I&rsquo;m much older, I keep thinking — how different would my life have been if she could have spoken directly to me? A story. Her voice. A recipe she loved. Something real, from her, not just stories other people told me about her.
              </p>
              <p>
                That&rsquo;s why I&rsquo;m building LYLO. For every family where someone knows their time is short. For every person who has something worth leaving behind but no easy way to do it. So that no child ever has to wonder what their parent actually sounded like.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { icon: Sparkles, label: "Truth" },
                { icon: ShieldCheck, label: "Safety" },
                { icon: HandHeart, label: "We Got Your Back" },
              ].map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-white px-4 py-3 shadow-soft"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-500">
                    <v.icon size={18} strokeWidth={2} />
                  </div>
                  <p className="font-medium text-ink-800">{v.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
