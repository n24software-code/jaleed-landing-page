import type { Lang } from "./i18n";

export const LIMITS = {
  phone: 24,
  email: 254,
  company: 120,
  message: 2000,
} as const;

export type LeadInput = {
  phone: string;
  email: string;
  company: string;
  message: string;
};

export type LeadField = keyof LeadInput;

/** Error codes — the UI maps these to localised copy. */
export type LeadErrorCode =
  | "phoneRequired"
  | "phoneInvalid"
  | "emailRequired"
  | "emailInvalid"
  | "companyRequired"
  | "companyShort"
  | "messageLong";

export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;

const ARABIC_DIGITS = /[٠-٩۰-۹]/g;

/** Normalises Arabic-Indic digits so users can type in either numeral set. */
export function toLatinDigits(value: string): string {
  return value.replace(ARABIC_DIGITS, (d) => {
    const code = d.charCodeAt(0);
    const base = code >= 0x06f0 ? 0x06f0 : 0x0660;
    return String(code - base);
  });
}

/** Strips control characters and collapses runaway whitespace. */
export function sanitize(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

const EMAIL_RE =
  /^[^\s@,;:<>()[\]\\]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+$/;

export function validateLead(input: LeadInput): LeadErrors {
  const errors: LeadErrors = {};

  const phone = toLatinDigits(input.phone).trim();
  if (!phone) {
    errors.phone = "phoneRequired";
  } else {
    const digits = phone.replace(/\D/g, "");
    const shapeOk = /^\+?[\d\s()\-.]{6,}$/.test(phone);
    if (!shapeOk || digits.length < 8 || digits.length > 15) errors.phone = "phoneInvalid";
  }

  const email = input.email.trim();
  if (!email) errors.email = "emailRequired";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "emailInvalid";

  const company = input.company.trim();
  if (!company) errors.company = "companyRequired";
  else if (company.length < 2) errors.company = "companyShort";

  if (input.message.length > LIMITS.message) errors.message = "messageLong";

  return errors;
}

export type LeadPayload = LeadInput & {
  lang: Lang;
  source: string;
  /** Honeypot — must remain empty. */
  website?: string;
};
