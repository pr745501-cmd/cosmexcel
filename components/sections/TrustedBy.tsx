import Image from "next/image";
import { companies } from "@/data/companies";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TrustedBy() {
  return (
    <section id="trusted-by" aria-labelledby="trusted-title" className="relative bg-cream">
      <div className="mx-auto max-w-[1500px] px-4 py-20 sm:px-8 md:py-28 lg:px-12">
        <Reveal>
          <SectionHeading id="trusted-title" title="Trusted by" />
        </Reveal>

        {/* Logo grid: 2-col mobile, 3-col sm, 4-col lg */}
        <ul className="mt-12 grid grid-cols-2 border-t border-l border-gold/30 sm:grid-cols-3 lg:grid-cols-4">
          {companies.map((c) => (
            <li
              key={c.logo}
              className="group relative flex aspect-[5/3] items-center justify-center border-r border-b border-gold/30 bg-ivory/40 p-4 transition-colors duration-500 hover:bg-ivory sm:p-6 md:p-8"
            >
              <Image
                src={`/logos/${c.logo}.png`}
                alt={c.name}
                width={c.width}
                height={c.height}
                sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 44vw"
                className="h-auto max-h-[3.5rem] w-auto max-w-[78%] object-contain mix-blend-multiply opacity-80 grayscale transition-[filter,opacity,transform] duration-500 ease-[var(--ease-lux)] group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 sm:max-h-[4.5rem]"
              />
            </li>
          ))}
          <li className="flex aspect-[5/3] items-center justify-center border-r border-b border-gold/30 p-4">
            <span className="font-display text-2xl text-gold-deep italic sm:text-3xl md:text-4xl">+ many others</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
