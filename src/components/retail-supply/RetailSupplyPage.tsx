"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";
import { LanguageProvider, useLanguage } from "./LanguageProvider";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { AboutJaleed } from "./AboutJaleed";
import { Benefits } from "./Benefits";
import { Products } from "./Products";
import { LeadForm } from "./LeadForm";
import { Footer } from "./Footer";

export function RetailSupplyPage({ lang }: { lang: Lang }) {
  // Tells the boot script that hydration landed, so its reveal safety net
  // stays out of the way and the scroll animations run as designed.
  useEffect(() => {
    document.documentElement.classList.add("j-hydrated");
  }, []);

  return (
    <LanguageProvider initialLang={lang}>
      <SkipLink />
      <Header />
      <main id="main">
        <Hero />
        {/* <AboutJaleed /> */}
        <Benefits />
        <LeadForm />
        <Products />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

function SkipLink() {
  const { t } = useLanguage();
  return (
    <a href="#main" className="j-skip">
      {t.header.skipToContent}
    </a>
  );
}
