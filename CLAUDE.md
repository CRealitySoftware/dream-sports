# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
