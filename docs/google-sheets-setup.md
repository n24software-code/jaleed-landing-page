# Sending leads to Google Sheets

Leads travel **browser → `/api/leads` (this server) → Apps Script → Sheet**.

The browser never sees a Google credential. The Apps Script URL and the shared
secret are read from server-only environment variables in
`src/app/api/leads/route.ts`; nothing is prefixed `NEXT_PUBLIC_`, so nothing is
inlined into the client bundle.

---

## 1. Create the spreadsheet

New Google Sheet, first row exactly:

| A         | B     | C     | D            | E       | F        | G      |
| --------- | ----- | ----- | ------------ | ------- | -------- | ------ |
| Timestamp | Phone | Email | Company Name | Message | Language | Source |

## 2. Add the Apps Script

**Extensions → Apps Script**, replace `Code.gs` with:

```javascript
// Must match GOOGLE_SHEETS_WEBHOOK_TOKEN on the server.
const SHARED_TOKEN = 'replace-with-a-long-random-string';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    // Reject anything that does not carry the shared secret.
    if (body.token !== SHARED_TOKEN) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    sheet.appendRow([
      body.timestamp || new Date().toISOString(),
      // Leading apostrophe stops Sheets from mangling +966… into a formula.
      "'" + (body.phone || ''),
      body.email || '',
      body.company || '',
      body.message || '',
      body.language || '',
      body.source || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## 3. Deploy it

**Deploy → New deployment → Web app**

- Execute as: **Me**
- Who has access: **Anyone**

"Anyone" is what lets this server POST to it. The `SHARED_TOKEN` check is what
keeps everyone else out — so make the token long and random, and never commit it.

Copy the `/exec` URL.

## 4. Point the app at it

Set these on the server (Vercel project settings, or `.env.local` locally):

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfy…/exec
GOOGLE_SHEETS_WEBHOOK_TOKEN=the-same-long-random-string
```

Restart, submit the form, and confirm a row lands in the sheet.

---

## Behaviour when it isn't configured

With no `GOOGLE_SHEETS_WEBHOOK_URL`, `/api/leads` logs the full lead to the
server console and returns **503**, so the form shows its error state. That is
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

## Swapping in a different backend

Only `src/app/api/leads/route.ts` knows where leads go. To use a CRM, a database,
or an email relay instead, replace the `fetch(webhookUrl, …)` block. The form,
validation, and states need no changes.
