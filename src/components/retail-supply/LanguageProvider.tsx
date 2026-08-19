"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DEFAULT_LANG, dict, dirOf, isLang, type Dict, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (next: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LANG_STORAGE_KEY = "jaleed:lang";

/**
 * The <html> element is the single source of truth for the active language.
 * An inline script in the document head sets it from `?lang=` or a stored
 * preference before first paint, so subscribing to it here means React always
 * agrees with the document — no flash, no divergence.
 */
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Lang {
  const current = document.documentElement.lang;
  return isLang(current) ? current : DEFAULT_LANG;
}

function applyLang(next: Lang) {
  const root = document.documentElement;
  root.lang = next;
  root.dir = dirOf(next);

  // Metadata is rendered server-side, so keep the tab and the description in
  // step when the visitor switches language without a navigation.
  document.title = dict[next].meta.title;
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute("content", dict[next].meta.description);

  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    /* storage may be blocked — the page still works */
  }

  // Keep the URL shareable without triggering a navigation.
  const url = new URL(window.location.href);
  if (next === DEFAULT_LANG) url.searchParams.delete("lang");
  else url.searchParams.set("lang", next);
  window.history.replaceState(null, "", url.toString());

  for (const listener of listeners) listener();
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, () => initialLang);

  const setLang = useCallback((next: Lang) => applyLang(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      dir: dirOf(lang),
      t: dict[lang],
      setLang,
      toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
