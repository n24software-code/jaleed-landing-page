import type { Metadata } from "next";
import { RetailSupplyPage } from "@/components/retail-supply/RetailSupplyPage";
import { DEFAULT_LANG, dict, isLang, type Lang } from "@/lib/i18n";
import { CONTACT, JALEED_STORE, LANDING_PATH, SITE_URL, SOCIALS } from "@/lib/site";

type SearchParams = Promise<{ lang?: string | string[] }>;

/** `?lang=en` renders the English page server-side; anything else is Arabic. */
function resolveLang(value: string | string[] | undefined): Lang {
  const raw = Array.isArray(value) ? value[0] : value;
  return isLang(raw) ? raw : DEFAULT_LANG;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const lang = resolveLang((await searchParams).lang);
  const t = dict[lang];
  const url = lang === "en" ? `${LANDING_PATH}?lang=en` : LANDING_PATH;

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: {
        ar: LANDING_PATH,
        en: `${LANDING_PATH}?lang=en`,
        "x-default": LANDING_PATH,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Jaleed",
      locale: lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: lang === "ar" ? ["en_US"] : ["ar_SA"],
      title: t.meta.title,
      description: t.meta.description,
      url,
      images: [
        { url: "/brand/hero-cans-wall.jpg", width: 1920, height: 2400, alt: t.meta.ogAlt },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/brand/hero-cans-wall.jpg"],
    },
  };
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const lang = resolveLang((await searchParams).lang);
  const t = dict[lang];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: "Jaleed",
        alternateName: "جليد",
        url: JALEED_STORE.ar,
        logo: `${SITE_URL}/brand/jaleed-logo-dark.png`,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        sameAs: SOCIALS.map((s) => s.href),
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}${LANDING_PATH}#webpage`,
        url: `${SITE_URL}${LANDING_PATH}`,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}#organization` },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Static, developer-authored structured data.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RetailSupplyPage lang={lang} />
    </>
  );
}
