import type { Metadata, Viewport } from "next";
import { Montserrat, Tajawal } from "next/font/google";
import "./globals.css";
import { DEFAULT_LANG, dict } from "@/lib/i18n";
import { LANDING_PATH, SITE_URL } from "@/lib/site";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-latin",
  display: "swap",
});

const ar = dict.ar;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: ar.meta.title,
  description: ar.meta.description,
  applicationName: "Jaleed",
  alternates: {
    canonical: LANDING_PATH,
    languages: {
      ar: LANDING_PATH,
      en: `${LANDING_PATH}?lang=en`,
      "x-default": LANDING_PATH,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Jaleed",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    title: ar.meta.title,
    description: ar.meta.description,
    url: LANDING_PATH,
    images: [
      {
        url: "/brand/hero-cans-wall.jpg",
        width: 1920,
        height: 2400,
        alt: ar.meta.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ar.meta.title,
    description: ar.meta.description,
    images: ["/brand/hero-cans-wall.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "light",
};

/**
 * Runs before first paint so a stored language preference never flashes.
 * `suppressHydrationWarning` on <html> lets it own lang/dir safely.
 */
const bootScript = `
(function(){try{
  var d=document.documentElement;
  d.classList.remove('no-js');
  // Safety net: scroll-reveal starts hidden, so if hydration never lands the
  // page must still show itself rather than staying blank. React stamps
  // 'j-hydrated' on mount, which cancels this.
  setTimeout(function(){
    if(!d.classList.contains('j-hydrated')) d.classList.add('reveal-fallback');
  },3000);
  var p=new URLSearchParams(location.search).get('lang');
  var s=null; try{s=localStorage.getItem('jaleed:lang');}catch(e){}
  var l=(p==='ar'||p==='en')?p:((s==='ar'||s==='en')?s:'${DEFAULT_LANG}');
  d.lang=l; d.dir=(l==='ar')?'rtl':'ltr';
}catch(e){}})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir="rtl"
      className={`no-js ${tajawal.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
