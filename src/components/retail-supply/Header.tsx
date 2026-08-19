"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { useLanguage } from "./LanguageProvider";
import { LANGS, type Lang } from "@/lib/i18n";

const LANG_LABELS: Record<Lang, string> = { ar: "العربية", en: "English" };

/**
 * Sticky header. Transparent over the dark hero, then resolves to a light
 * surface with a hairline once the page scrolls — mirroring jaleedwater.com.
 */
export function Header() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-400 ${
        scrolled
          ? "border-b border-hairline bg-white/85 shadow-[0_1px_20px_-8px_rgba(16,16,18,0.18)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ transitionTimingFunction: "var(--jaleed-ease)" }}
    >
      <div
        className="j-shell flex items-center justify-between gap-4"
        style={{ height: "var(--jaleed-header-h)" }}
      >
        <a
          href="https://jaleedwater.com/"
          target="_blank"
          rel="noreferrer"
          aria-label={t.header.logoAlt}
          className="flex shrink-0 items-center transition-opacity duration-300 hover:opacity-70"
        >
          <Logo
            variant={scrolled ? "dark" : "light"}
            alt={t.header.logoAlt}
            height={34}
            priority
            // The mark is fine white strokes; over photography it needs its own
            // separation rather than a heavier scrim across the hero.
            className={scrolled ? "" : "drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"}
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="#lead-form"
            className={`hidden rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 sm:inline-flex ${
              scrolled
                ? "bg-ink text-white hover:bg-black"
                : "bg-white/12 text-white ring-1 ring-inset ring-white/30 backdrop-blur-md hover:bg-white/20"
            }`}
          >
            {t.header.cta}
          </a>

          <LanguageSwitcher
            dark={!scrolled}
            lang={lang}
            onSelect={setLang}
            groupLabel={t.header.langGroupLabel}
          />
        </div>
      </div>
    </header>
  );
}

/** Module scope, not nested: a nested component would remount on every scroll tick. */
function LanguageSwitcher({
  dark,
  lang,
  onSelect,
  groupLabel,
}: {
  dark: boolean;
  lang: Lang;
  onSelect: (next: Lang) => void;
  groupLabel: string;
}) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={`flex items-center rounded-full p-0.5 text-sm font-bold transition-colors duration-300 ${
        dark ? "on-dark bg-white/12 ring-1 ring-inset ring-white/25 backdrop-blur-md" : "bg-canvas-deep"
      }`}
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => onSelect(code)}
            aria-pressed={active}
            className={`rounded-full px-3 py-1.5 transition-colors duration-300 sm:px-3.5 ${
              active
                ? dark
                  ? "bg-white text-ink"
                  : "bg-ink text-white"
                : dark
                  ? "text-white/75 hover:text-white"
                  : "text-muted hover:text-ink"
            }`}
          >
            {LANG_LABELS[code]}
          </button>
        );
      })}
    </div>
  );
}
