"use client";

import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import {
  IconArrow,
  IconArrowUp,
  IconInstagram,
  IconMail,
  IconPhone,
  IconSnapchat,
  IconTikTok,
} from "./icons";
import { CONTACT, JALEED_STORE, LEGAL_LINKS, SOCIALS } from "@/lib/site";

const SOCIAL_ICONS = {
  instagram: IconInstagram,
  tiktok: IconTikTok,
  snapchat: IconSnapchat,
} as const;

export function Footer() {
  const { t, lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="j-shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* ---- Brand summary ---- */}
          <Reveal>
            <Logo variant="light" alt={t.footer.logoAlt} height={44} />
            <p className="mt-6 text-xl font-extrabold text-white">{t.footer.brand}</p>
            <p className="j-body mt-3 max-w-[30rem] text-sm text-white/55">{t.footer.summary}</p>

            <a
              href={JALEED_STORE[lang]}
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition-colors duration-300 hover:text-white/70"
            >
              {t.footer.storeLink}
              <IconArrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          </Reveal>

          {/* ---- Contact ---- */}
          <Reveal delay={80}>
            <h2 className="j-kicker text-white/45">{t.footer.contactTitle}</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                >
                  <IconMail className="size-[18px] shrink-0 text-white/40 transition-colors group-hover:text-white" />
                  <span dir="ltr">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="group flex items-center gap-3 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                >
                  <IconPhone className="size-[18px] shrink-0 text-white/40 transition-colors group-hover:text-white" />
                  <span dir="ltr">{CONTACT.phone}</span>
                </a>
              </li>
            </ul>

            <p className="mt-6 text-xs text-white/35">
              {t.footer.vat}: <span dir="ltr">{CONTACT.vatNumber}</span>
            </p>
          </Reveal>

          {/* ---- Follow + policies ---- */}
          <Reveal delay={160}>
            <h2 className="j-kicker text-white/45">{t.footer.socialTitle}</h2>
            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer me"
                      aria-label={social.label}
                      className="flex size-11 items-center justify-center rounded-full border border-white/12 text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                );
              })}
            </ul>

            <h2 className="j-kicker mt-10 text-white/45">{t.footer.linksTitle}</h2>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS[lang].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="j-shell flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {year} {lang === "ar" ? "جليد" : "Jaleed"}. {t.footer.rights}
          </p>

          <a
            href="#hero"
            className="group inline-flex items-center gap-2 text-xs font-bold text-white/50 transition-colors duration-300 hover:text-white"
          >
            <IconArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
