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

/**
 * Where this landing page is deployed. Configurable so the page can live at
 * retail.jaleedwater.com, jaleedwater.com/retail-supply, or anywhere else.
 * Set NEXT_PUBLIC_SITE_URL at build time; the fallback is only a placeholder.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://retail.jaleedwater.com"
).replace(/\/$/, "");

/** Path this landing page is served from (used for canonical + hreflang). */
export const LANDING_PATH = process.env.NEXT_PUBLIC_LANDING_PATH ?? "/retail-supply";

/** Identifies the lead source written to the spreadsheet. */
export const LEAD_SOURCE = process.env.NEXT_PUBLIC_LEAD_SOURCE ?? "retail-supply-landing";

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
