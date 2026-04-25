# Michael Lombardi — Portfolio Site

Personal portfolio / resume site for Michael Lombardi, positioning him as a "Growth Systems Architect" / operator with range across founder, growth, and sales roles. Not a traditional resume — built as a cinematic, editorial experience inspired by [stabondar.com](https://stabondar.com).

## Stack

- **Vite + React 18 + TypeScript**
- **Motion** (`motion/react`, v12.23.x) — all animations, scroll reveals, AnimatePresence. No GSAP.
- **General Sans** — only typeface. Already loaded in `src/styles/fonts.css`.
- **No Three.js / Spline** in the current build (older code exists but isn't rendered).
- Path alias: `@/` → `src/`

## Design language

- Background: pure black `#000000`
- Accent: `#FF3A2D` (tomato red). CSS var `--accent-red` exists but most components use the hex directly.
- Typography philosophy: **filled solid red, not outlined**. (Earlier iterations used `-webkit-text-stroke` outline type — user explicitly moved away from that; filled is the current direction.)
- Layout: **role is the dominant element, company is the small context label above it.** User was explicit about this — someone looking at "ServiceTitan, Sales Development Representative" should see SDR big and ServiceTitan small. The role is the value; the company is provenance.
- Content runs **full bleed** (no `maxWidth` containers capping the H1). Only `6vw` side padding.
- Motion: outbound ease `[0.16, 1, 0.3, 1]`, staggered scroll-reveals with `useInView`.

## File structure

```
src/
  app/App.tsx                        ← mounts <HeroSection/> + <ExperienceSection/>
  components/
    scramble.tsx                     ← shared: useTextScramble, InfoLine, ScrambleBlock
    hero/HeroSection.tsx             ← complete; scrambling intro, parade of descriptors, outline name
    experience/
      types.ts                       ← Experience, Act, Moment, Stat, PageVariant
      ExperienceSection.tsx          ← list of all 7 roles; manages detail-page state
      RoleDetailPage.tsx             ← full-screen takeover per role
  styles/
    theme.css                        ← --accent-red, Tailwind base
    fonts.css                        ← General Sans
```

## Experience section architecture

Seven roles across three "Acts" (reverse chronological):

- **Act III — The Operator** (2024–Present): ServiceTitan, Enertia Studios, PHMG
- **Act II — The Founder** (2020–2024): Fansub
- **Act I — The Foundation** (2015–2020): 720 Digital, Scripted, Dreams Aren't Cliché

Each role is defined by an `Experience` object in `ExperienceSection.tsx`. Clicking a row opens a full-screen `RoleDetailPage` that slides up from the bottom (spring). `← BACK` button top-left + ESC both close it.

### RoleDetailPage structure (top to bottom)

1. `FANSUB · 2020–2024` — small uppercase label (no act label; user removed it)
2. **Role H1** — massive, filled red, `clamp(56px, 11.5vw, 220px)`, line-height 1.05
3. **Skills tags** — centered row of pill-shaped tags directly under H1 (user moved them here from the bottom)
4. **Hook quote** — italic, white @ 52% opacity, `clamp(18px, 1.8vw, 26px)`
5. Divider
6. **Stats grid** (for `kinetic` variant, appears before story; all others appear after)
7. **Story paragraphs** — `clamp(17px, 1.55vw, 22px)`, `maxWidth: 68vw`, centered block, left-aligned text
8. **Key Moments** — expandable accordion (click `+` → rotates to `×`, spring-expands body paragraph)

### PageVariant

Each experience has a `pageVariant: 'kinetic' | 'narrative' | 'system' | 'creative'` that tunes animation timing, spacing, story column count, and stats-before-story ordering. See `VARIANT` const in `RoleDetailPage.tsx`.

## Build state

**Complete:**
- Hero section (scrambling intro, outline name bleeding off bottom)
- Experience list (all 7 roles with act groupings, hover states, scramble descriptors)
- RoleDetailPage architecture (back button, ESC, variant system, expandable moments, stats grid, centered layout)

**Fully-written content (real copy, production-ready):**
- **Fansub** (04) — Co-Founder / Chief of Growth. Full 5-paragraph story provided by user; 5 moments; stats: $2M / 10K+ creators / 40K+ fans / 250+ events / $300K+ revenue; tags: GTM, Fundraising, Product Management, Partnership Development, Growth, Customer Discovery, Process Optimization.
- **Enertia Studios** (02) — Freelance AI Systems Architect, 2025. Stats: 43% open rate, 39% conversion rate, 30%+ efficiency lift. Tags: Context Engineering, Systems Design, API Integrations, Full Sales Cycle, Outbound Cadence Design. Story copy is still placeholder-ish — waiting on real narrative from user.

**Draft/placeholder content (needs user rewrite when ready):**
- ServiceTitan, PHMG, 720 Digital, Scripted, Dreams Aren't Cliché — all have working story + moments + stats, but the copy was written by Codex to fill the framework. User will replace role-by-role as we did with Fansub/Enertia.

## Working pattern with this user

- User drives role-by-role. Pattern: "Now let's pivot into X" → they give role name / year / tags / key stats → they'll provide the full story copy when ready.
- User is direct. Pushes back explicitly when something's wrong (e.g. "No I disagree, role should be bigger than company"). Take the correction at face value and move on.
- User likes editorial, cinematic design moves over conventional UI patterns. Don't default to "resume card" thinking.
- Ask about content (story copy, stats, tags) — but make the visual/architecture calls.

## Known unused / legacy files

- `src/components/ui/detail-modal.tsx`, `box-loader.tsx`, `card-stack.tsx`, `dotted-surface.tsx` — leftover from an earlier template. Not imported anywhere. Safe to delete when cleaning up.
- `@splinetool/react-spline`, `three` in package.json — not used by current code.

## Pre-existing TypeScript errors (safe to ignore)

- `src/components/ui/dotted-surface.tsx` — missing `@types/three`. Unused file.
- `vite.config.ts` — `node:path` / `__dirname` types. Pre-existing.

These aren't caused by anything we've built and shouldn't be "fixed" without the user asking.
