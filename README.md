# Jaleed — Retail & Supply Sector landing page

A single-page B2B lead-generation landing page for **جليد / Jaleed**, aimed at
retailers, distributors, suppliers, cafés, restaurants, hospitality groups and
corporate partners.

Arabic (RTL) is the default; English (LTR) is one click away.

```bash
npm install
npm run dev     # http://localhost:3000/retail-supply
```

---

## What is where

```
src/
  app/
    layout.tsx                  root <html>, fonts, base metadata, pre-paint language script
    page.tsx                    / → redirects to the landing page
    icon.png                    favicon, generated from the official logo
    globals.css                 design tokens, typography, animation, utilities
    retail-supply/page.tsx      the page: per-language metadata + JSON-LD
    api/leads/route.ts          lead intake — validation, anti-spam, Sheets forward

  components/retail-supply/
    RetailSupplyPage.tsx        section composition
    LanguageProvider.tsx        language state, bound to <html lang/dir>
    Header.tsx                  sticky header + language switcher
    Hero.tsx  AboutJaleed.tsx  Benefits.tsx  Products.tsx  LeadForm.tsx  Footer.tsx
    Logo.tsx  Reveal.tsx  icons.tsx

  lib/
    i18n.ts                     every string, both languages
    products.ts                 the catalogue + official product URLs
    site.ts                     contact details, socials, store links, deploy config
    leads.ts                    validation shared by client and server

public/
  brand/                        official logo variants and campaign photography
  products/                     official product photography
```

## Editing content

Nothing below needs a component change:

| Change                            | File                       |
| --------------------------------- | -------------------------- |
| Any Arabic or English wording     | `src/lib/i18n.ts`          |
| Products, flavours, pack sizes    | `src/lib/products.ts`      |
| Phone, email, socials, VAT number | `src/lib/site.ts`          |
| Colours, radii, spacing tokens    | `src/app/globals.css`      |

### Brand assets

All imagery, both logo variants, and every product URL come from
[jaleedwater.com](https://jaleedwater.com/). Assets are served from `public/`
rather than hot-linked, so the page does not depend on the store's CDN.

Product cards link to the **real** product pages on the official store, in the
matching locale (`/products/…` for Arabic, `/en/products/…` for English), and
open in the same tab.

## Language handling

Arabic is the default. Reaching `?lang=en` renders the English page **on the
server**, so English is fully crawlable and shareable, not a client-side veneer.

- An inline script in `<head>` applies a stored preference before first paint,
  so there is no flash of the wrong language or direction.
- `<html lang>` is the single source of truth; `LanguageProvider` subscribes to
  it with `useSyncExternalStore`.
- Switching updates content, direction, `<title>`, the meta description, the URL
  (via `replaceState`, no navigation), and `localStorage`.
- Layout is written with logical properties and `rtl:`/`ltr:` variants, so both
  directions are laid out deliberately rather than mirrored by accident.

## The lead form

Client-side validation with Arabic and English messages, then the same rules
re-run on the server. Success and error states are inline — the visitor is never
navigated away, and a failed submission keeps everything they typed.

Wiring up the spreadsheet: **[docs/google-sheets-setup.md](docs/google-sheets-setup.md)**.

Until `GOOGLE_SHEETS_WEBHOOK_URL` is set, `/api/leads` logs the lead and returns
503 so the form reports failure honestly instead of silently losing it.

## Configuration

Copy `.env.example` to `.env.local`. Public values (`NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_LANDING_PATH`) drive canonical URLs and `hreflang`, so the page can
be deployed at `retail.jaleedwater.com` or `jaleedwater.com/retail-supply`
without touching code. Set `NEXT_PUBLIC_LANDING_PATH=/` for a subdomain.

## Accessibility & motion

Semantic landmarks, one `<h1>`, labelled fields with `aria-invalid` and
`aria-describedby`, visible focus rings on both light and dark sections, a skip
link, and an accessible language switcher using `aria-pressed`.

Every animation is opt-out: `prefers-reduced-motion: reduce` disables reveals,
drift, and smooth scrolling.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # serve the production build
npx eslint src   # lint
npx tsc --noEmit # typecheck
```
