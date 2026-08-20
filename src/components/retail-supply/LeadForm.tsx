"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { IconAlert, IconArrow, IconCheck, IconMail, IconPhone, IconWhatsApp } from "./icons";
import { LIMITS, validateLead, type LeadErrors, type LeadField, type LeadInput } from "@/lib/leads";
import type { Dict } from "@/lib/i18n";
import { CONTACT, LEAD_SOURCE } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: LeadInput = { phone: "", email: "", company: "", message: "" };
const ORDER: LeadField[] = ["phone", "email", "company", "message"];

export function LeadForm() {
  const { t, lang } = useLanguage();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);

  const [values, setValues] = useState<LeadInput>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Partial<Record<LeadField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const fieldId = (name: LeadField) => `${uid}-${name}`;

  function update(name: LeadField, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // Only re-validate a field the user has already left, so typing stays quiet.
    if (touched[name]) {
      const all = validateLead(next);
      setErrors((prev) => ({ ...prev, [name]: all[name] }));
    }
    if (status === "error") setStatus("idle");
  }

  function blur(name: LeadField) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const all = validateLead(values);
    setErrors((prev) => ({ ...prev, [name]: all[name] }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const found = validateLead(values);
    setErrors(found);
    setTouched({ phone: true, email: true, company: true, message: true });

    const firstInvalid = ORDER.find((name) => found[name]);
    if (firstInvalid) {
      const target = formRef.current?.querySelector<HTMLElement>(
        `#${CSS.escape(fieldId(firstInvalid))}`,
      );
      // Let React commit the error state before moving focus.
      requestAnimationFrame(() => target?.focus());
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot, lang, source: LEAD_SOURCE }),
      });

      if (!response.ok) {
        // 422 means the server disagreed with client validation — surface it.
        if (response.status === 422) {
          const data = (await response.json().catch(() => null)) as { errors?: LeadErrors } | null;
          if (data?.errors) {
            setErrors(data.errors);
            setTouched({ phone: true, email: true, company: true, message: true });
          }
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(EMPTY);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const invalidFields = ORDER.filter((name) => errors[name]);

  const fieldProps = (name: LeadField) => ({
    t,
    name,
    id: fieldId(name),
    value: values[name],
    error: touched[name] ? errors[name] : undefined,
    onChange: update,
    onBlur: blur,
  });

  return (
    <section id="lead-form" className="bg-canvas py-20 sm:py-28 lg:py-32">
      <div className="j-shell">
        <div className="overflow-hidden rounded-jaleed-lg border border-hairline bg-white shadow-[var(--jaleed-shadow)]">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* ---------------- Form ---------------- */}
            <div className="p-6 sm:p-10 lg:p-12">
              {status === "success" ? (
                <SuccessPanel t={t} onReset={reset} />
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex h-full flex-col"
                >
                  {status === "error" && (
                    <div
                      role="alert"
                      className="j-pop mb-6 flex items-start gap-3 rounded-jaleed-sm border border-raspberry/25 bg-raspberry/5 p-4"
                    >
                      <IconAlert className="mt-0.5 size-5 shrink-0 text-raspberry" />
                      <div>
                        <p className="text-sm font-extrabold text-ink">
                          {t.form.error.title}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {t.form.error.body}
                        </p>
                      </div>
                    </div>
                  )}

                  {invalidFields.length > 0 && (
                    <p className="j-sr" role="status">
                      {t.form.errors.summary}:{" "}
                      {invalidFields
                        .map((name) => t.form.fields[name])
                        .join(lang === "ar" ? "، " : ", ")}
                    </p>
                  )}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      {...fieldProps("phone")}
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      dirOverride="ltr"
                      hint={t.form.fields.phoneHint}
                    />
                    <Field
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      dirOverride="ltr"
                    />
                    <div className="sm:col-span-2">
                      <Field
                        {...fieldProps("company")}
                        type="text"
                        autoComplete="organization"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Field
                        {...fieldProps("message")}
                        textarea
                        optional
                        hint={t.form.fields.messageHint}
                      />
                    </div>
                  </div>

                  {/* Honeypot — hidden from people, irresistible to bots. */}
                  <div aria-hidden className="j-sr">
                    <label htmlFor={`${uid}-website`}>Website</label>
                    <input
                      id={`${uid}-website`}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:bg-black hover:shadow-[var(--jaleed-shadow-lift)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <>
                          <span
                            aria-hidden
                            className="j-spin size-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          {t.form.submitting}
                        </>
                      ) : (
                        <>
                          {t.form.submit}
                          <IconArrow className="size-[18px] transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="j-body max-w-[22rem] text-xs text-muted">
                      {t.form.privacy}
                    </p>
                  </div>
                </form>
              )}
            </div>
            {/* ---------------- Brand panel ---------------- */}
            <div className="on-dark relative isolate overflow-hidden bg-ink p-8 text-white sm:p-10 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-45"
                style={{
                  background:
                    "radial-gradient(120% 90% at 15% 0%, rgba(123,75,209,0.35), transparent 55%), radial-gradient(110% 80% at 90% 100%, rgba(14,156,151,0.28), transparent 55%)",
                }}
              />

              <Reveal className="relative z-10">
                <span className="j-kicker text-white/50">{t.form.eyebrow}</span>
                <h2 className="j-display mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] text-white">
                  {t.form.title}
                </h2>
                <p className="j-body mt-5 text-base text-white/70">
                  {t.form.lede}
                </p>
              </Reveal>

              <Reveal delay={100} className="relative z-10">
                <ul className="mt-8 space-y-3.5">
                  {t.form.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <IconCheck className="mt-0.5 size-4 shrink-0 text-white/45" />
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={180} className="relative z-10">
                <div className="mt-10 border-t border-white/12 pt-8">
                  <p className="text-sm font-extrabold text-white">
                    {t.form.asideTitle}
                  </p>
                  <p className="j-body mt-2 text-sm text-white/55">
                    {t.form.asideBody}
                  </p>

                  <ul className="mt-6 space-y-2">
                    <ContactRow
                      href={`mailto:${CONTACT.email}`}
                      icon={<IconMail className="size-[18px]" />}
                      label={t.form.emailLabel}
                      value={CONTACT.email}
                      ltr
                    />
                    <ContactRow
                      href={`tel:${CONTACT.phone}`}
                      icon={<IconPhone className="size-[18px]" />}
                      label={t.form.phoneLabel}
                      value={CONTACT.phone}
                      ltr
                    />
                    <ContactRow
                      href={CONTACT.whatsapp}
                      icon={<IconWhatsApp className="size-[18px]" />}
                      label={t.form.whatsappLabel}
                      value={CONTACT.phone}
                      external
                      ltr
                    />
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Declared at module scope on purpose: a component defined inside
   LeadForm would be a new type on every render, remounting the inputs
   and dropping focus on each keystroke.
   ------------------------------------------------------------------ */

function Field({
  t,
  name,
  id,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  textarea = false,
  optional = false,
  hint,
  dirOverride,
  autoComplete,
  inputMode,
}: {
  t: Dict;
  name: LeadField;
  id: string;
  value: string;
  error?: LeadErrors[LeadField];
  onChange: (name: LeadField, value: string) => void;
  onBlur: (name: LeadField) => void;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  hint?: string;
  dirOverride?: "ltr" | "rtl";
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const invalid = Boolean(error);
  const describedBy =
    [invalid ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

  const shared = {
    id,
    name,
    value,
    onChange: (e: { target: { value: string } }) => onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": invalid || undefined,
    "aria-describedby": describedBy,
    "aria-required": !optional,
    maxLength: LIMITS[name],
    autoComplete,
    dir: dirOverride,
    className: `w-full rounded-jaleed-sm border bg-white px-4 py-3.5 text-base text-ink transition-colors duration-200 focus:outline-none ${
      invalid
        ? "border-raspberry focus:border-raspberry"
        : "border-hairline hover:border-muted/45 focus:border-ink"
    }`,
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-bold text-ink">
          {t.form.fields[name]}
        </label>
        <span className="text-xs font-medium text-muted/70">
          {optional ? t.form.optional : t.form.required}
        </span>
      </div>

      {textarea ? (
        <textarea {...shared} rows={5} className={`${shared.className} min-h-[8rem] resize-y`} />
      ) : (
        <input {...shared} type={type} inputMode={inputMode} />
      )}

      {invalid ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-raspberry"
        >
          <IconAlert className="size-4 shrink-0" />
          {t.form.errors[error!]}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-2 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function SuccessPanel({ t, onReset }: { t: Dict; onReset: () => void }) {
  return (
    <div className="flex h-full min-h-[24rem] flex-col items-center justify-center py-8 text-center">
      <span
        aria-hidden
        className="j-pop flex size-20 items-center justify-center rounded-full bg-elder/10"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-elder text-white">
          <IconCheck className="size-7" strokeWidth={2.2} />
        </span>
      </span>

      <h3 className="j-display mt-7 text-2xl text-ink sm:text-[1.75rem]">{t.form.success.title}</h3>
      <p className="j-body mt-3 max-w-[26rem] text-base text-muted">{t.form.success.body}</p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 rounded-full border border-hairline px-6 py-3 text-sm font-bold text-ink transition-colors duration-300 hover:border-ink hover:bg-canvas"
      >
        {t.form.success.again}
      </button>
    </div>
  );
}

function ContactRow({
  href,
  icon,
  label,
  value,
  external = false,
  ltr = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
  external?: boolean;
  ltr?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="group -mx-3 flex items-center gap-3.5 rounded-jaleed-sm px-3 py-2.5 transition-colors duration-300 hover:bg-white/5"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/70 transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
          {icon}
        </span>
        <span className="min-w-0">
          <span className="block text-xs text-white/45">{label}</span>
          <span
            className="block truncate text-sm font-semibold text-white"
            dir={ltr ? "ltr" : undefined}
          >
            {value}
          </span>
        </span>
      </a>
    </li>
  );
}
