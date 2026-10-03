import { CalendarDays, BedDouble } from "lucide-react";
import { event, contact } from "@/data/event";
import { accommodationNote } from "@/data/pricing";
import { agenda } from "@/data/agenda";
import { Reveal } from "@/components/ui/Reveal";

export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative bg-ivory">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-20 sm:px-8 md:gap-14 md:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Left: venue info */}
        <Reveal className="lg:col-span-7">
          <h2
            id="venue-title"
            className="font-display text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.98] font-medium text-aubergine"
          >
            {event.venue}
          </h2>
          <p className="mt-5 flex items-center gap-3 text-lg text-gold-deep sm:text-xl">
            <CalendarDays aria-hidden strokeWidth={1.4} className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            {event.dateLabel}
          </p>
          <div className="mt-6 flex items-center gap-3" aria-hidden>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="rule-gold w-40" />
          </div>
          <div className="mt-6 flex max-w-xl gap-4 text-ink/85">
            <BedDouble aria-hidden strokeWidth={1.3} className="mt-1 h-5 w-5 shrink-0 text-gold-deep sm:h-6 sm:w-6" />
            <p className="leading-relaxed text-[0.95rem] sm:text-base">
              <span className="font-medium text-aubergine">Accommodation. </span>
              {accommodationNote} Questions? Write to{" "}
              <a href={`mailto:${contact.email}`} className="link-gold text-plum break-all">
                {contact.email}
              </a>
              .
            </p>
          </div>
        </Reveal>

        {/* Right: schedule list */}
        <Reveal as="div" delay={0.15} className="lg:col-span-5">
          <ol className="divide-y divide-gold/30 border-y border-gold/30">
            {agenda.map((d) => (
              <li key={d.id} className="flex flex-wrap items-baseline justify-between gap-4 py-6 sm:gap-6 sm:py-7">
                <div>
                  <p className="font-display text-3xl text-aubergine sm:text-4xl">{d.label}</p>
                  <p className="mt-1 text-xs text-mist sm:text-sm">{d.date}</p>
                </div>
                <p className="font-display text-2xl text-gold-deep italic sm:text-3xl">{d.theme}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
