# Sending leads to Google Sheets

Leads travel **browser → `/api/leads` (this server) → Apps Script → Sheet**.

The browser never sees a Google credential. The Apps Script URL and the shared
secret are read from server-only environment variables in
`src/app/api/leads/route.ts`; nothing is prefixed `NEXT_PUBLIC_`, so nothing is
inlined into the client bundle.

---

## The contract

This is the agreement between `/api/leads` and the Apps Script web app. Both
sides must change together.

### Request

```
POST <web app /exec>?token=<shared secret>
Content-Type: application/json
```

```json
{
  "timestamp": "2026-08-19T15:04:05.000Z",
  "phone":     "0551234567",
  "email":     "buyer@example.com",
  "company":   "Al Nahda Trading",
  "message":   "…",
  "language":  "ar",
  "source":    "retail-supply-landing"
}
```

**The token goes in the query string, not the body and not a header.** Apps
Script reads it via `e.parameter.token`. This is not a stylistic choice:
`doPost(e)` has no access to custom request headers at all, so `Authorization`
or `X-Webhook-Token` can never work. It stays server-side — the request is made
from the Node runtime, never from the browser.

### Response

Apps Script **cannot set an HTTP status code**. Every reply is `HTTP 200`,
including a rejected token, a missing sheet, or a thrown exception. The status
therefore proves nothing, and the caller must branch on the JSON body:

```json
{ "success": true,  "row": 4 }
{ "success": false, "error": "Unauthorized" }
```

`/api/leads` treats the submission as successful **only** when
`success === true`. Anything else — a false flag, an unparseable body, a
non-2xx status, a network error, a timeout — returns 502 to the browser, which
shows the Arabic error state and keeps everything the visitor typed.

> A `/exec` POST answers `302` and redirects to `script.googleusercontent.com`.
> That is the normal success path, not an error — the JSON is only on the final
> hop, so redirects must be followed.

---

## 1. The spreadsheet

- **ID:** `1tQHueIYj386zhdOkqhyzMf86Iuf0BRoF4AyHKu1geKE`
- **Tab:** `Leads` — created automatically, with a bold frozen header row:

| Timestamp | Phone | Email | Company Name | Message | Language | Source |
| --------- | ----- | ----- | ------------ | ------- | -------- | ------ |

Keep the spreadsheet private. It never needs to be shared publicly — the script
runs as its owner.

## 2. The Apps Script

The project is **container-bound** to the spreadsheet above, so
`getActiveSpreadsheet()` resolves to the right file. The script still asserts
`ss.getId() === SPREADSHEET_ID` so that a copied or re-bound script fails loudly
instead of quietly writing somewhere else.

It targets the tab by name with `getSheetByName(SHEET_NAME)`. Do not go back to
`getActiveSheet()` — that writes to whichever tab happens to be selected, which
scatters rows once a second tab exists.

`SpreadsheetApp.flush()` forces the write to land before success is reported, so
a `success: true` really does mean the row exists.

The shared secret lives in `WEBHOOK_TOKEN` on line 1 of `Code.gs` and must equal
`GOOGLE_SHEETS_WEBHOOK_TOKEN` on the server.

## 3. Deployment

**Deploy → Manage deployments → ✏️ → Version: New version → Deploy**

- Execute as: **Me**
- Who has access: **Anyone**

"Anyone" is what lets this server POST to it; the token check is what keeps
everyone else out.

> **Saving the editor does not update the live web app.** The `/exec` URL keeps
> serving the previously deployed version until you deploy a new one. Editing
> the *existing* deployment (rather than creating a new one) keeps the same
> `/exec` URL, so no environment variable has to change.
>
> If the new code needs OAuth scopes the old version did not, Google shows
> "The Web App requires you to authorize access to your data" — the project
> owner has to click through that once.

## 4. Environment

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy…/exec
GOOGLE_SHEETS_WEBHOOK_TOKEN=the-same-secret-as-line-1-of-Code.gs
```

Set the plain `/exec` URL — the route appends `?token=…` itself.

---

## Testing it

```bash
# Reads the token from .env without printing it.
set -a; . ./.env; set +a

LOC=$(curl -s -X POST "$GOOGLE_SHEETS_WEBHOOK_URL?token=$GOOGLE_SHEETS_WEBHOOK_TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"phone":"0551234567","email":"t@example.com","company":"TEST","message":"m","language":"ar","source":"manual-test"}' \
  -D - -o /dev/null | grep -i '^location:' | tr -d '\r' | sed 's/^[Ll]ocation: //')

curl -s "$LOC"   # -> {"success":true,"row":N}
```

Then confirm the row is actually in the sheet. A `200` on its own means nothing.

## Behaviour when it isn't configured

With no `GOOGLE_SHEETS_WEBHOOK_URL`, `/api/leads` logs the lead (contact details
masked) and returns **503**, so the form shows its error state. That is
deliberate: a visitor is told the submission failed rather than being thanked
for a lead that was silently dropped.

## What the endpoint already does

- **Server-side validation** — the same rules as the client, re-run on the server
  (`src/lib/leads.ts`); bad input returns 422 with per-field codes.
- **Sanitisation** — control characters stripped, whitespace collapsed, every
  field length-capped before anything is forwarded.
- **Honeypot** — a submission with a filled `website` field returns 200 and is
  discarded without reaching the sheet, so bots get no signal.
- **Rate limiting** — 5 submissions per IP per minute, in-process. Fine for a
  single instance; put a shared store or an edge WAF in front for real scale.
- **Timeout** — the call to Apps Script is aborted after 10 seconds.
- **Redacted logging** — phone and email are masked in server logs, and the
  token is never logged.

## Swapping in a different backend

Only `src/app/api/leads/route.ts` knows where leads go. To use a CRM, a database,
or an email relay instead, replace the `fetch(endpoint, …)` block. The form,
validation, and states need no changes.
