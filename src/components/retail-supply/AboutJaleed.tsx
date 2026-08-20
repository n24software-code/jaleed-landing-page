"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { FLAVORS, type Flavor } from "@/lib/products";

const FLAVOR_KEYS: Flavor[] = ["blackberryGrape", "raspberryApple", "elderflowerApple"];

export function AboutJaleed() {
  const { t, lang } = useLanguage();

  return (
    <section id="about" className="relative bg-white py-16 sm:py-20 lg:py-24">
      <div className="j-shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ---- Copy ---- */}
          <div>
            <Reveal>
              <span className="j-kicker text-muted">{t.about.eyebrow}</span>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="j-display mt-4 text-[clamp(1.5rem,3vw,2.5rem)] text-ink">
                {t.about.title}
              </h2>
            </Reveal>

            {/* <Reveal delay={150}>
              <p className="j-body mt-6 max-w-[34rem] text-base text-muted sm:text-lg">
                {t.about.body}
              </p>
            </Reveal> */}

            <Reveal delay={220}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-jaleed border border-hairline bg-hairline sm:grid-cols-4">
                {t.about.highlights.map((h) => (
                  <div
                    key={h.title}
                    className="flex flex-col justify-between bg-white px-4 py-5 sm:px-5 sm:py-6"
                  >
                    <dt className="text-sm leading-snug font-extrabold text-ink sm:text-[0.9375rem]">
                      {h.title}
                    </dt>
                    <dd className="mt-2 text-xs leading-snug text-muted">
                      {h.note}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            {/* <Reveal delay={290}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="j-kicker text-muted">
                  {t.about.flavorsLabel}
                </span>
                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  {FLAVOR_KEYS.map((key) => (
                    <li
                      key={key}
                      className="flex items-center gap-2 text-sm font-semibold text-ink"
                    >
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: FLAVORS[key].accent }}
                      />
                      {FLAVORS[key][lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal> */}
          </div>

          {/* ---- Product plinth: black ground matches the official photography ---- */}
          <Reveal delay={140} className="relative">
            <div className="relative overflow-hidden rounded-jaleed-lg bg-black">
              <div className="relative aspect-[5/3] w-full">
                <Image
                  src="/brand/hero-cans-wall.jpg"
                  alt={t.about.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 420px"
                  quality={82}
                  loading="lazy"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <p className="text-sm font-bold text-white/90 sm:text-base">
                  {lang === "ar" ? "٢٥٠ مل · بدون سكر" : "250 ml · Sugar free"}
                </p>
                <div className="flex gap-1.5" aria-hidden>
                  {FLAVOR_KEYS.map((key) => (
                    <span
                      key={key}
                      className="size-2.5 rounded-full ring-1 ring-white/40"
                      style={{ backgroundColor: FLAVORS[key].accent }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
