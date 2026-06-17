"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LyloMark from "./LyloMark";

const links = [
  { href: "#legacy", label: "Legacy Vault" },
  { href: "#vision", label: "Our Vision" },
  { href: "#safety", label: "Privacy" },
  { href: "#who", label: "Who it's for" },
  { href: "#access", label: "Early Access" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-ink-900/95 border-b border-white/10"
          : "bg-ink-900"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a
          href="#top"
          aria-label="LYLO home"
          className="rounded-lg focus:outline-none"
        >
          <LyloMark variant="nav" />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#access"
            className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-teal-400"
          >
            Request Early Access
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="mx-4 mb-3 rounded-3xl border border-white/10 bg-ink-900/98 p-4 shadow-soft backdrop-blur">
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
                <li className="mt-2">
                  <a
                    href="#access"
                    onClick={() => setOpen(false)}
                    className="block rounded-full bg-teal-500 px-4 py-3 text-center text-base font-medium text-white"
                  >
                    Request Early Access
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
