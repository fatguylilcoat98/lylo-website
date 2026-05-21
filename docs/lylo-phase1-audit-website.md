# Lylo Phase 1 — Website Repo Audit

**Status:** Phase 1 audit only. **Documentation-only.** No code or content
in this repo has been changed by this commit.

**Scope:** `fatguylilcoat98/lylo-website` (main). This is the public
marketing / landing page, not the companion backend.

The full architecture audit for the working companion system lives in the
companion repository on the same branch:
`fatguylilcoat98/mattie-the-protective-ai` →
`claude/lylo-audit-cleanup-plan-CvHq8` → `docs/lylo-phase1-audit.md`.

That document is the substantive deliverable. Read it first.

---

## What this repo is

- Static Next.js 14 + Tailwind landing page.
- `package.json` name: `mylylo-website`.
- No backend, no database, no auth, no API routes.
- App router (`app/`) with `layout.tsx`, `page.tsx`, and an `app/face/`
  subroute. Components in `components/`. Public assets in `public/`.
- Branding is already "Lylo," so no language-audit findings here.

## Findings

### 1. Stale build output committed
- `out/` is in the repo. This is the static export of a previous build. It
  should be added to `.gitignore` and removed from the working tree in a
  separate housekeeping PR.
- Risk: builds drift from source. Reviewers can't tell which file is
  authoritative.
- Recommended action: include `out/` in `.gitignore`, remove from tracking
  in its own PR.

### 2. `legacy/` directory committed
- An older version of the landing page lives in `legacy/`.
- Owner should decide: archive in a `legacy-2026-XX` git tag and delete,
  or move to a separate repo, or leave in place.
- Recommended action: tag + delete in its own PR after owner sign-off.
  **Do not delete in this audit.**

### 3. Package name inconsistency
- `package.json` is `mylylo-website`; the repo is `lylo-website`; the
  product is `Lylo`.
- Recommended action: rename `name` to `lylo-website` whenever the main
  refactor reaches Step 11 (hard rename) in the companion repo, so the
  two repos line up.

### 4. No backend wiring
- This repo does not call any companion-side API. If a setup-mode entry
  point or a pilot-signup flow is planned, decide whether it lives here
  (in the landing site) or in the companion app under `admin/`.
- Recommended action: defer until the companion-side Setup Mode
  (§13 Step 6 of the main audit) is approved.

## What is NOT changed by this PR

- `app/`, `components/`, `public/`, `tailwind.config.ts`, `next.config.js`,
  `tsconfig.json`, `package.json`, `package-lock.json`, `legacy/`, `out/`.
- No content, no copy, no styling, no routes.

This file is purely the place where the website-side findings are
recorded, so the owner can review both repos in one branch.

— End of website Phase 1 audit.
