"use client";

import LyloMark from "./LyloMark";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2">
            <LyloMark variant="footer" />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/60">
              <span className="italic">Love Your Loved One.</span> A governed
              memory vault that preserves stories, recipes, voices, and life
              lessons for the people who come next.
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-teal-400">
              Remember · Preserve · Cherish
            </p>
            <p className="mt-4 text-sm text-white/40">
              <a
                href="https://mylylo.pro"
                className="hover:text-white"
                rel="noreferrer"
              >
                MyLylo.pro
              </a>
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              LYLO
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/60">
              <li>
                <a className="hover:text-white" href="#legacy">
                  Legacy Vault
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#vision">
                  Our Vision
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#safety">
                  Privacy
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#who">
                  Who it&apos;s for
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#access">
                  Early Access
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Trust
            </p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/60">
              <li>
                <a className="hover:text-white" href="#safety">
                  The Good Neighbor Guard
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="/privacy.html">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#access">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#access">
                  Pilot Programs
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} LYLO. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with care for families, seniors, and caregivers.
          </p>
        </div>
      </div>
    </footer>
  );
}
