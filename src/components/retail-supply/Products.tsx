"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { IconArrow, IconExternal } from "./icons";
import { FLAVORS, PACKS, PACK_ORDER, PRODUCTS, productHref, type PackId } from "@/lib/products";
import { JALEED_STORE } from "@/lib/site";

type Filter = PackId | "all";

export function Products() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.pack === filter)),
    [filter],
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.products.all },
    ...PACK_ORDER.map((id) => ({ id: id as Filter, label: PACKS[id][lang] })),
  ];

  return (
    <section
      id="products"
      className="on-dark relative bg-black py-20 text-white sm:py-28 lg:py-32"
    >
      <div className="j-shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[38rem]">
            <Reveal>
              <span className="j-kicker text-white/45">{t.products.eyebrow}</span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="j-display mt-4 text-[clamp(1.875rem,4.2vw,3.25rem)] text-white">
                {t.products.title}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="j-body mt-4 text-base text-white/60 sm:text-lg">{t.products.lede}</p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div
              role="group"
              aria-label={t.products.filterLabel}
              className="j-scroll-x flex gap-1.5 overflow-x-auto rounded-full border border-white/12 bg-white/[0.04] p-1.5 backdrop-blur-md"
            >
              {filters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    aria-pressed={active}
                    className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-300 ${
                      active
                        ? "bg-white text-ink"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-white/50">{t.products.empty}</p>
        ) : (
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {visible.map((product, i) => {
              const flavor = FLAVORS[product.flavor];
              const pack = PACKS[product.pack];
              const name = product.name[lang];

              return (
                <Reveal as="li" key={product.id} delay={Math.min(i, 5) * 70}>
                  <a
                    href={productHref(product, lang)}
                    aria-label={t.products.viewAria(`${name} — ${pack[lang]}`)}
                    className="group relative flex h-full flex-col overflow-hidden rounded-jaleed border border-white/10 bg-black transition-all duration-500 hover:-translate-y-1"
                    style={{ ["--accent" as string]: flavor.accent }}
                  >
                    {/* Accent wash + border, revealed on hover */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-jaleed opacity-0 ring-1 ring-inset transition-opacity duration-500 group-hover:opacity-100"
                      style={{ boxShadow: `0 24px 60px -28px ${flavor.accent}`, color: flavor.accent }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${flavor.accent}, transparent)`,
                      }}
                    />

                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                      <Image
                        src={product.image}
                        alt={`${name} — ${pack[lang]}`}
                        fill
                        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                        quality={85}
                        loading={i < 3 ? "eager" : "lazy"}
                        className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.05]"
                        style={{ transitionTimingFunction: "var(--jaleed-ease)" }}
                      />
                      <span
                        className="absolute top-3 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-[0.6875rem] font-bold text-white/85 backdrop-blur-sm sm:top-4 sm:px-3 sm:py-1.5 sm:text-xs ltr:left-3 sm:ltr:left-4 rtl:right-3 sm:rtl:right-4"
                      >
                        {pack[lang === "ar" ? "arShort" : "enShort"]}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col border-t border-white/8 p-4 sm:p-6">
                      {/* The flavour leads; the full catalogue name stays on the
                          link label and image alt for screen readers and search. */}
                      <h3 className="flex items-center gap-2 text-base leading-snug font-extrabold text-white sm:text-lg">
                        <span
                          aria-hidden
                          className="size-2.5 shrink-0 rounded-full"
                          style={{ backgroundColor: flavor.accent }}
                        />
                        {flavor[lang]}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-white/50 sm:text-sm">
                        {t.products.descriptor} · {pack[lang]}
                      </p>

                      <span className="mt-5 flex items-center gap-2 text-sm font-bold text-white/80 transition-colors duration-300 group-hover:text-white sm:mt-6">
                        {t.products.view}
                        <IconArrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        )}

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-white/45">
              <IconExternal className="size-4 shrink-0" />
              {t.products.externalNote}
            </p>
            <a
              href={JALEED_STORE[lang]}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/8"
            >
              {t.products.storeCta}
              <IconArrow className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
