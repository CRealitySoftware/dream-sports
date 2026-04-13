# CLAUDE.md — DreamSports International

Sports talent platform connecting Colombian athletes with Italian professional sports. Single-page landing focused on program presentation, registration, and payment.
 
**Current phase: web only.** Mobile app (iOS/Android) is a future phase using the same repo.
 
---
 
## Stack
 
| Layer | Technology |
|-------|-----------|
| Framework | Expo Router SDK 55+ — static export for web |
| Styling | NativeWind v4 (Tailwind for RN) |
| Theme | Custom ThemeProvider — light/dark/system |
| i18n | expo-localization + i18n-js — ES (default) + IT |
| Payments | Wompi — JS SDK on web (Colombia only) |
| Email | Resend — registration confirmation |
| Hosting | Vercel (static export) |
 
---
 
## Project structure
 
```
dreamsports/
├── app/
│   ├── _layout.tsx          # Root layout: ThemeProvider + i18nProvider + Navbar + Footer
│   └── index.tsx            # Landing — composes all sections
├── components/
│   ├── sections/            # One file per landing section
│   ├── ui/                  # Button, Card, SectionTitle, VideoEmbed
│   └── navigation/          # Navbar, LanguageSelector, ThemeToggle
├── providers/
│   └── ThemeProvider.tsx
├── hooks/
│   ├── useTheme.ts
│   └── useTranslation.ts
├── i18n/
│   ├── index.ts             # i18n config + t() export
│   ├── es.ts                # Spanish strings
│   └── it.ts                # Italian strings (same key structure)
├── constants/
│   └── theme.ts             # Light + dark color tokens
└── assets/
```
 
---
 
## Theme system
 
Two token sets in `constants/theme.ts`: `lightTheme` and `darkTheme`. Both share the same keys.
 
Key tokens:
- `background`, `surface`, `surfaceElevated`
- `text`, `textMuted`, `textInverse`
- `border`
- `primary` (#1F3A5F navy / #4A7AB5 dark), `primaryLight`
- `accent` (#C8960C gold / #E2A820 dark), `accentLight`
- `cta`, `ctaText`
 
`ThemeProvider` exposes `{ theme, mode, setMode, toggle, isDark }`. Mode: `'light' | 'dark' | 'system'`. Default: `'system'`.
 
NativeWind: `darkMode: 'class'` in `tailwind.config.js`. Use `dark:` prefix for Tailwind classes alongside theme tokens for inline styles.
 
**Rule:** Never hardcode hex values in components. Always use `theme.*` tokens.
 
---
 
## i18n
 
Two locales: `es` (default), `it`. Same key structure in both files.
 
Key namespaces: `nav`, `hero`, `stats`, `quienesSomos`, `mision`, `vision`, `programa`, `disciplinas`, `experiencia`, `aliados`, `inscripcion`, `footer`.
 
`useTranslation()` hook returns `{ t, locale, changeLocale }`. Language can be switched at runtime — `changeLocale('it')` updates `i18n.locale` and triggers re-render via state.
 
**Rule:** Never hardcode UI strings in JSX. Always use `t('namespace.key')`.
 
---
 
## Payments — Wompi
 
Colombia only (COP). Methods: credit/debit card, PSE, Nequi, cash.
PSE requires manual activation from the client's Wompi dashboard.
Fixed amount (single registration fee).
 
```bash
# .env.local — never commit
EXPO_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_xxxxxxxxxxxx
```
 
Client must provide production `publicKey` before go-live.
 
---
 
## Landing sections (scroll order)
 
```
Navbar (sticky) — logo · nav links · language selector · theme toggle
§1  Hero         — fullwidth image/video · headline · CTA
§2  Stats bar    — 160 spots · 4 disciplines · 86 days · June 2026
§3  Who we are   — text + photo
§4  Mission/Vision — two cards side by side
§5  The program  — Phase 1 Colombia → Phase 2 Italy
§6  Disciplines  — 4 cards: photo + summary + video + selection date
§7  Experience   — 4-step timeline
§8  Allies       — horizontal scroll of partner cards
§9  Registration — form + Wompi payment widget
Footer
```
 
---
 
## Key rules
 
- All UI strings via `t()` — no hardcoded text
- All colors via `theme.*` — no hardcoded hex
- Shared components between web and future app — avoid Platform-specific code unless strictly necessary
- Static export only — no SSR (Expo SSR is still experimental)
- Branches: `main` (prod) · `dev` · `feature/name`
 
---
 
## Pending from client (blocks development)
 
- [ ] Official logo (SVG)
- [ ] Brand guidelines (colors, typography)
- [ ] Photos per discipline + hero image/video
- [ ] Invitation videos from Italy (1 per discipline)
- [ ] Allies info: name · role · photo · social links (up to 20)
- [ ] Active Wompi account + production `publicKey`
- [ ] Domain

## Commands

```bash
npx expo start          # Start dev server (opens QR + web)
npx expo start --web    # Web only
npx expo start --ios    # iOS simulator
npx expo start --android
npx expo start --clear  # Clear Metro cache (required after config changes)
npx expo lint           # Lint
```

## Architecture

Universal app (web + mobile) from a single codebase using **Expo Router** with **NativeWind v4 + Tailwind v3**.

### Platform routing

`src/app/index.tsx` acts as a router — redirects to `/(web)` on web and `/(native)` on mobile via `Platform.OS`.

```
src/app/
├── index.tsx           ← platform redirect (web → /(web), native → /(native))
├── _layout.tsx         ← root layout, imports global.css
├── (web)/              ← web routes (URL unaffected by group name)
│   ├── _layout.tsx     ← wraps all web pages with Navbar + Footer
│   └── index.tsx       ← landing page
└── (native)/           ← mobile routes
    ├── _layout.tsx
    └── index.tsx
```

### Components

```
src/components/
└── website/
    └── landing/        ← landing page sections: Navbar, Hero, Features, HowItWorks, CTA, Footer
```

### Styling

- Tailwind classes work via `className` prop on React Native components (NativeWind handles the bridge).
- `global.css` is imported once in `src/app/_layout.tsx` — do not import it elsewhere.
- After any changes to `tailwind.config.js`, `metro.config.js`, or `babel.config.js`, restart with `--clear`.

### Path alias

`@/` maps to `src/` (configured in `tsconfig.json`). Use `@/components/...`, `@/app/...` etc.

### rules
1. NO EMOJIS -> use icons
2. NO INNECESARY COMMENTS -> Just the complex code needs comments

---

## Animations

**Engine:** React Native Reanimated v4 + `IntersectionObserver` (web) for scroll-triggered reveals.

**Wrapper component:** `src/components/ui/AnimatedSection.tsx`

```tsx
import { AnimatedSection } from "@/components/ui/AnimatedSection"

<AnimatedSection variant="fadeUp" delay={0} duration={650}>
  <MySection />
</AnimatedSection>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"fadeUp" \| "fadeIn" \| "fadeLeft" \| "fadeRight" \| "fadeDown"` | `"fadeUp"` | Direction the element slides from |
| `delay` | `number` (ms) | `0` | Delay before animation starts — use for stagger within a section |
| `duration` | `number` (ms) | `650` | Animation duration |
| `threshold` | `number` 0–1 | `0.12` | Fraction of element visible before triggering |
| `style` | `ViewStyle` | — | Passed to the `Animated.View` wrapper |
| `className` | `string` | — | NativeWind classes on the wrapper |

### Patterns

**Section-level reveal** (used in `(web)/index.tsx`):
```tsx
<AnimatedSection variant="fadeUp">
  <SomeSection />
</AnimatedSection>
```

**Staggered cards within a section** — wrap each item individually with incremental `delay`:
```tsx
{items.map((item, i) => (
  <AnimatedSection key={item.id} variant="fadeUp" delay={i * 80}>
    <Card item={item} />
  </AnimatedSection>
))}
```

**Two-column split** — opposing directions:
```tsx
<AnimatedSection variant="fadeLeft"><TextColumn /></AnimatedSection>
<AnimatedSection variant="fadeRight"><ImageColumn /></AnimatedSection>
```

### Platform behavior

- **Web:** `IntersectionObserver` fires once when the element enters the viewport. Animation does not repeat on scroll-back.
- **Native (future):** Reanimated triggers immediately on mount (no scroll detection). Enhance later with `useScrollViewOffset` if needed.

### Rules

- Never animate the `Hero` section — it's above the fold, immediate render is expected.
- Never animate `FooterSection` — it's a utility element, not a content reveal.
- Keep `duration` between 500–800ms. Faster feels cheap, slower feels sluggish.
- Keep stagger `delay` increments at 60–100ms max. Above that, the last card waits too long.
- Do not nest `AnimatedSection` inside another `AnimatedSection` — use a single wrapper at the right granularity.