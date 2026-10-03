import Image from "next/image";
import { market } from "@/data/event";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";

export function WhySummit() {
  return (
    <section id="about" aria-labelledby="why-title" className="relative bg-ivory">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 pt-20 pb-16 sm:px-8 md:pt-28 md:gap-14 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Text column */}
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading id="why-title" eyebrow={market.eyebrow} title={market.heading} />
          </Reveal>
          <Reveal className="mt-8 max-w-2xl" delay={0.1}>
            <p className="font-display text-[1.25rem] leading-[1.45] text-ink sm:text-[1.5rem] md:text-[1.7rem]">{market.intro}</p>
          </Reveal>
        </div>

        {/* Image column */}
        <div className="relative lg:col-span-5">
          <Parallax amount={8} className="relative mx-auto aspect-[1297/860] w-full max-w-xl">
            <Image
              src="/images/products.jpg"
              alt="Plum glass and gold cosmetic vessels with a hibiscus flower on a marble plinth"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              style={{
                maskImage: "radial-gradient(ellipse 70% 72% at 50% 48%, #000 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 70% 72% at 50% 48%, #000 55%, transparent 100%)",
              }}
            />
          </Parallax>
        </div>
      </div>

      {/* Market stats band */}
      <div className="on-dark bg-aubergine text-ivory">
        <dl className="mx-auto grid max-w-[1500px] divide-y divide-champagne/20 px-4 sm:px-8 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-12">
          {market.stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.12} className="py-10 md:px-8 md:py-16 md:first:pl-0 md:last:pr-0">
              <dt className="font-display text-[clamp(3rem,7vw,6.4rem)] leading-none font-medium text-champagne">{stat.value}</dt>
              <dd>
                {stat.label && <span className="mt-3 block text-sm font-medium tracking-[0.16em] text-gold uppercase">{stat.label}</span>}
                <span className="mt-4 block max-w-sm text-[0.95rem] leading-relaxed text-ivory/80">{stat.body}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Shifts + closing quote */}
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-16 sm:px-8 md:py-24 md:gap-14 lg:grid-cols-12 lg:px-12">
        <ul className="lg:col-span-6">
          {market.shifts.map((shift) => (
            <Reveal as="li" key={shift} className="flex gap-4 border-b border-gold/30 py-5 first:border-t">
              <span aria-hidden className="mt-[0.7rem] h-2 w-2 shrink-0 rotate-45 bg-gold" />
              <span className="text-[0.98rem] leading-relaxed text-ink">{shift}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="lg:col-span-5 lg:col-start-8">
          <p className="font-display text-[clamp(1.5rem,3vw,2.7rem)] leading-[1.2] text-plum italic">{market.closing}</p>
        </Reveal>
      </div>
    </section>
  );
}
