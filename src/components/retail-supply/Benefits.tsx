"use client";

import { useLanguage } from "./LanguageProvider";
import { Reveal } from "./Reveal";
import { IconDroplet, IconGrowth, IconShield, IconSpark } from "./icons";

const ICONS = [IconSpark, IconDroplet, IconShield, IconGrowth];
const NUMERALS = { ar: ["٠١", "٠٢", "٠٣", "٠٤"], en: ["01", "02", "03", "04"] };

export function Benefits() {
  const { t, lang } = useLanguage();

  return (
    <></>
    // <section id="why" className="bg-canvas py-20 sm:py-28 lg:py-32">
    //   <div className="j-shell">
    //     <div className="max-w-[42rem]">
    //       <Reveal>
    //         <span className="j-kicker text-muted">{t.benefits.eyebrow}</span>
    //       </Reveal>
    //       <Reveal delay={80}>
    //         <h2 className="j-display mt-4 text-[clamp(1.75rem,3.8vw,2.875rem)] text-ink">
    //           {t.benefits.title}
    //         </h2>
    //       </Reveal>
    //       <Reveal delay={150}>
    //         <p className="j-body mt-5 text-base text-muted sm:text-lg">{t.benefits.lede}</p>
    //       </Reveal>
    //     </div>

    //     <ul className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
    //       {t.benefits.items.map((item, i) => {
    //         const Icon = ICONS[i] ?? IconSpark;
    //         return (
    //           <Reveal as="li" key={item.title} delay={80 * i}>
    //             <article className="group h-full rounded-jaleed border border-hairline bg-white p-7 transition-all duration-400 hover:-translate-y-1 hover:border-ink/15 hover:shadow-[var(--jaleed-shadow-lift)] sm:p-8">
    //               <div className="flex items-start justify-between gap-4">
    //                 <span className="flex size-11 items-center justify-center rounded-full bg-canvas text-ink transition-colors duration-400 group-hover:bg-ink group-hover:text-white">
    //                   <Icon className="size-5" />
    //                 </span>
    //                 <span
    //                   aria-hidden
    //                   className="text-sm font-extrabold text-ink/15 transition-colors duration-400 group-hover:text-ink/35"
    //                 >
    //                   {NUMERALS[lang][i]}
    //                 </span>
    //               </div>

    //               <h3 className="mt-6 text-lg font-extrabold text-ink">{item.title}</h3>
    //               <p className="j-body mt-3 text-sm text-muted">{item.body}</p>
    //             </article>
    //           </Reveal>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </section>
  );
}
