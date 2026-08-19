/**
 * Central site configuration.
 * All values below are taken from the official Jaleed website (jaleedwater.com).
 * Edit here — nothing else needs to change.
 */

/** Public origin of the official Jaleed store. */
export const JALEED_STORE = {
  ar: "https://jaleedwater.com/",
  en: "https://jaleedwater.com/en/",
} as const;

/** Production fallback — used whenever nothing valid is configured. */
const DEFAULT_SITE_URL = "https://jaleedwater.com";

/**
 * Normalises an environment value, treating empty and whitespace-only strings
 * as unset. A variable added in the Vercel dashboard but left blank arrives as
 * "" — `??` lets that through, which is what broke the production build.
 *
 * Callers must pass `process.env.SOME_NAME` as a literal member access: build
 * tools inline those statically, and a dynamic `process.env[name]` lookup would
 * not survive into the client bundle.
 */
function env(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * Resolves a fully-qualified origin, or returns undefined if the candidate is
 * unusable. Guards the build against a value that is present but malformed
 * (`jaleedwater.com` with no scheme throws the same ERR_INVALID_URL as "").
 */
function toOrigin(candidate: string | undefined): string | undefined {
  if (!candidate) return undefined;
  // Bare hostnames are a common mis-entry; assume https rather than reject.
  const withScheme = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;
  try {
    return new URL(withScheme).origin;
  } catch {
    return undefined;
  }
}

/**
 * Where this landing page is deployed. Configurable so the page can live at
 * retail.jaleedwater.com, jaleedwater.com/retail-supply, or anywhere else.
 *
 * Resolution order:
 *   1. SITE_URL             — explicit, server-side
 *   2. NEXT_PUBLIC_SITE_URL — explicit, also readable by the browser
 *   3. VERCEL_URL           — the deployment's own host, so Preview builds get
 *                             correct canonical/OG URLs instead of production's
 *   4. https://jaleedwater.com
 *
 * Always a valid absolute origin, so `new URL(SITE_URL)` can never throw.
 */
export const SITE_URL =
  toOrigin(env(process.env.SITE_URL)) ??
  toOrigin(env(process.env.NEXT_PUBLIC_SITE_URL)) ??
  toOrigin(env(process.env.NEXT_PUBLIC_VERCEL_URL) ?? env(process.env.VERCEL_URL)) ??
  DEFAULT_SITE_URL;

/** Path this landing page is served from (used for canonical + hreflang). */
export const LANDING_PATH = env(process.env.NEXT_PUBLIC_LANDING_PATH) ?? "/retail-supply";

/** Identifies the lead source written to the spreadsheet. */
export const LEAD_SOURCE = env(process.env.NEXT_PUBLIC_LEAD_SOURCE) ?? "retail-supply-landing";

export const CONTACT = {
  email: "Team@jaleedwater.com",
  phone: "+966551506372",
  /** E.164 digits, used for tel: and wa.me links. */
  phoneDigits: "966551506372",
  whatsapp: "https://api.whatsapp.com/send?phone=966551506372",
  vatNumber: "301367768700003",
} as const;

/** Official Jaleed accounts only — verified from jaleedwater.com. */
export const SOCIALS = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/jaleed.sa" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@jaleed.sa" },
  { id: "snapchat", label: "Snapchat", href: "https://www.snapchat.com/add/jaleed.sa" },
] as const;

export const LEGAL_LINKS = {
  ar: [
    { label: "سياسة الخصوصية", href: "https://jaleedwater.com/pages/privacy-policy" },
    { label: "سياسة الاستبدال والاسترجاع", href: "https://jaleedwater.com/pages/refund-exchange-policy" },
  ],
  en: [
    { label: "Privacy Policy", href: "https://jaleedwater.com/en/pages/privacy-policy" },
    { label: "Return & Exchange Policy", href: "https://jaleedwater.com/en/pages/refund-exchange-policy" },
  ],
} as const;
