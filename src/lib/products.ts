/**
 * Official Jaleed catalogue, mirrored from jaleedwater.com.
 * Names, images and slugs come from the live store — `href()` always resolves
 * to the real product page, so nothing here is a duplicate or invented route.
 */
import type { Lang } from "./i18n";

export type Flavor = "blackberryGrape" | "raspberryApple" | "elderflowerApple";
export type PackId = "single" | "sixPack" | "case24";

/** Accent colours sampled from the official can artwork. */
export const FLAVORS: Record<Flavor, { accent: string; ar: string; en: string }> = {
  blackberryGrape: { accent: "#7B4BD1", ar: "التوت الأسود والعنب", en: "Blackberry & Grape" },
  raspberryApple: { accent: "#E1376C", ar: "توت العليق والتفاح", en: "Raspberry & Apple" },
  elderflowerApple: { accent: "#0E9C97", ar: "زهرة البيلسان والتفاح", en: "Elderflower & Apple" },
};

export const PACKS: Record<PackId, { ar: string; en: string; arShort: string; enShort: string }> = {
  single: { ar: "عبوة مفردة", en: "Single Can", arShort: "٢٥٠ مل", enShort: "250 ml" },
  sixPack: { ar: "٦ عبوات", en: "6 Pack", arShort: "٦ × ٢٥٠ مل", enShort: "6 × 250 ml" },
  case24: { ar: "كرتون ٢٤", en: "24 Pack", arShort: "٢٤ × ٢٥٠ مل", enShort: "24 × 250 ml" },
};

export const PACK_ORDER: PackId[] = ["single", "sixPack", "case24"];

export type Product = {
  id: string;
  /** Exact slug used by the official store. */
  slug: string;
  flavor: Flavor;
  pack: PackId;
  image: string;
  name: { ar: string; en: string };
};

export const PRODUCTS: Product[] = [
  {
    id: "bg-single",
    slug: "blackberry-grape-sparkling-water",
    flavor: "blackberryGrape",
    pack: "single",
    image: "/products/blackberry-grape-sparkling-water.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد نكهة التوت الأسود والعنب",
      en: "Jaleed Sugar Free Sparkling Water — Blackberry & Grape",
    },
  },
  {
    id: "ra-single",
    slug: "apple-raspberry-single-can",
    flavor: "raspberryApple",
    pack: "single",
    image: "/products/apple-raspberry-single-can.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد توت العليق والتفاح",
      en: "Jaleed Sparkling Water — Raspberry & Apple",
    },
  },
  {
    id: "ea-single",
    slug: "elderflower-apple-single-can",
    flavor: "elderflowerApple",
    pack: "single",
    image: "/products/elderflower-apple-single-can.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد زهرة البيلسان والتفاح",
      en: "Jaleed Sparkling Water — Elderflower & Apple",
    },
  },
  {
    id: "bg-6",
    slug: "مياه-غازيه-بدون-سكر-جليد-نكهه-التوت-الاسود-والعنب-6-عبوات-250-مل",
    flavor: "blackberryGrape",
    pack: "sixPack",
    image: "/products/blackberry-grape-6-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد نكهة التوت الأسود والعنب",
      en: "Jaleed Sparkling Water — Blackberry & Grape",
    },
  },
  {
    id: "ra-6",
    slug: "مياه-غازية-بدون-سكر-جليد-نكهة-توت-العليق-والتفاح-6-عبوات-250-مل",
    flavor: "raspberryApple",
    pack: "sixPack",
    image: "/products/apple-raspberry-6-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد نكهة توت العليق والتفاح",
      en: "Jaleed Sparkling Water — Raspberry & Apple",
    },
  },
  {
    id: "ea-6",
    slug: "مياه-غازية-بدون-سكر-جليد-زهرة-البيلسان-والتفاح-6-عبوات-250-مل",
    flavor: "elderflowerApple",
    pack: "sixPack",
    image: "/products/elderflower-apple-6-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد زهرة البيلسان والتفاح",
      en: "Jaleed Sparkling Water — Elderflower & Apple",
    },
  },
  {
    id: "bg-24",
    slug: "blackberry-grape-24-pack",
    flavor: "blackberryGrape",
    pack: "case24",
    image: "/products/blackberry-grape-24-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد نكهة التوت الأسود والعنب",
      en: "Jaleed Sparkling Water — Blackberry & Grape",
    },
  },
  {
    id: "ra-24",
    slug: "apple-raspberry-24-pack",
    flavor: "raspberryApple",
    pack: "case24",
    image: "/products/apple-raspberry-24-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد نكهة توت العليق والتفاح",
      en: "Jaleed Sparkling Water — Raspberry & Apple",
    },
  },
  {
    id: "ea-24",
    slug: "elderflower-apple-24-pack",
    flavor: "elderflowerApple",
    pack: "case24",
    image: "/products/elderflower-apple-24-pack.jpg",
    name: {
      ar: "مياه غازية بدون سكر — جليد زهرة البيلسان والتفاح",
      en: "Jaleed Sparkling Water — Elderflower & Apple",
    },
  },
];

/** Resolves the real product page on the official store, per locale. */
export function productHref(product: Product, lang: Lang): string {
  const prefix = lang === "en" ? "/en/products/" : "/products/";
  return `https://jaleedwater.com${prefix}${encodeURI(product.slug)}`;
}
