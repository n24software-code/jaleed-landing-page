import { NextResponse } from "next/server";
import { isLang } from "@/lib/i18n";
import { LIMITS, sanitize, validateLead, type LeadInput } from "@/lib/leads";
import { LEAD_SOURCE } from "@/lib/site";

export const runtime = "nodejs";
/** Never cached — this endpoint only ever writes. */
export const dynamic = "force-dynamic";

/**
 * Lead intake for the Retail & Supply landing page.
 *
 * The browser only ever talks to this route. Credentials for the spreadsheet
 * live in server-only environment variables and are never sent to the client:
 *
 *   GOOGLE_SHEETS_WEBHOOK_URL   Apps Script /exec URL (server-side only)
 *   GOOGLE_SHEETS_WEBHOOK_TOKEN Shared secret the Apps Script verifies
 *
 * See docs/google-sheets-setup.md for the Apps Script that receives this.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

/**
 * Best-effort in-process rate limiting. Good enough to blunt casual abuse on a
 * single instance; put a shared store or an edge WAF in front for real scale.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (now > v.resetAt) hits.delete(k);
    }
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip;
}

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const raw = (body ?? {}) as Record<string, unknown>;

  // Honeypot: real users never see this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal that it was rejected.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const input: LeadInput = {
    phone: sanitize(raw.phone, LIMITS.phone),
    email: sanitize(raw.email, LIMITS.email),
    company: sanitize(raw.company, LIMITS.company),
    message: sanitize(raw.message, LIMITS.message),
  };

  const errors = validateLead(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const lang = isLang(raw.lang) ? raw.lang : "ar";
  const source = sanitize(raw.source, 80) || LEAD_SOURCE;

  const record = {
    timestamp: new Date().toISOString(),
    phone: input.phone,
    email: input.email,
    company: input.company,
    message: input.message,
    language: lang,
    source,
  };

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    // No spreadsheet wired up yet. Keep the lead in the server log rather than
    // dropping it, and tell the visitor the submission failed so they retry or
    // use a direct channel.
    console.error("[leads] GOOGLE_SHEETS_WEBHOOK_URL is not set. Lead not stored:", record);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN
          ? { "X-Webhook-Token": process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        token: process.env.GOOGLE_SHEETS_WEBHOOK_TOKEN,
        ...record,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.error("[leads] Sheets webhook rejected the lead:", response.status, record);
      return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
    }
  } catch (error) {
    console.error("[leads] Sheets webhook failed:", error, record);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
}
