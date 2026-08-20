"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { IconArrow, IconChevronDown } from "./icons";

export function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="hero"
      className="on-dark relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-black text-white"
    >
      {/* Official Jaleed product photography, full-bleed. */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/brand/hero-cans-ice.jpg"
          alt={t.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="j-drift object-cover object-[center_38%]"
        />
        {/* Scrims: keep the header legible and let type sit on quiet ground. */}
        {/* Base tint: carries legibility on narrow screens where copy spans the
            full width and the directional scrim below has nowhere to fall off. */}
        <div className="absolute inset-0 bg-black/45 sm:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              lang === "ar"
                ? "linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.66) 32%, rgba(0,0,0,0.12) 70%, rgba(0,0,0,0) 88%)"
                : "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.66) 32%, rgba(0,0,0,0.12) 70%, rgba(0,0,0,0) 88%)",
          }}
        />
        {/* Keeps the logo and switcher readable wherever the crop lands. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      <div className="j-shell relative z-10 w-full pt-20 pb-8 sm:pt-24 sm:pb-12">
        <div className="max-w-[46rem]">
          <Reveal>
            <span className="j-kicker inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-white/90 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-white" />
              {t.hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="j-display mt-5 text-[clamp(2.25rem,6.2vw,3.5rem)] text-white">
              {t.hero.title}
            </h1>
          </Reveal>

          <Reveal delay={170}>
            <p className="mt-4 max-w-[34rem] text-[clamp(1.0625rem,1.9vw,1.375rem)] font-medium text-white/90">
              {t.hero.lede}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <p className="j-body mt-4 max-w-[50rem] text-[0.9rem] text-white/70">
              {t.hero.body}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#lead-form"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-bold text-ink transition-all duration-300 hover:bg-white/90 hover:shadow-[0_16px_40px_-16px_rgba(255,255,255,0.5)]"
              >
                {t.hero.ctaPrimary}
                <IconArrow className="size-[18px] transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-colors duration-300 hover:border-white/60 hover:bg-white/10"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Audience strip — states plainly who the page is for. */}
      <Reveal
        delay={420}
        as="div"
        className="relative z-10  opacity-0"
      >
        <div className="j-shell flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6 opacity-0">
          <span className="j-kicker shrink-0 text-white/50">
            {t.audience.label}
          </span>
          <ul className="j-scroll-x flex items-center gap-x-5 gap-y-2 overflow-x-auto text-sm font-semibold whitespace-nowrap text-white/85 sm:flex-wrap sm:whitespace-normal ">
            {t.audience.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-5 before:hidden before:size-1 before:rounded-full before:bg-white/30 sm:[&:not(:first-child)]:before:block"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="absolute bottom-24 z-10 hidden size-11 items-center justify-center rounded-full border border-white/25 text-white/70 transition-colors duration-300 hover:border-white/60 hover:text-white lg:flex ltr:right-[clamp(1.25rem,4vw,3rem)] rtl:left-[clamp(1.25rem,4vw,3rem)]"
      >
        <IconChevronDown className="size-5" />
      </a>
    </section>
  );
}
