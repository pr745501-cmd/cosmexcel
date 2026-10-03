import { CalendarDays, BedDouble } from "lucide-react";
import { event, contact } from "@/data/event";
import { accommodationNote } from "@/data/pricing";
import { agenda } from "@/data/agenda";
import { Reveal } from "@/components/ui/Reveal";

export function Venue() {
  return (
    <section id="venue" aria-labelledby="venue-title" className="relative bg-ivory">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <Reveal className="lg:col-span-7">
          <h2 id="venue-title" className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.98] font-medium text-aubergine">
            {event.venue}
          </h2>
          <p className="mt-6 flex items-center gap-3 text-xl text-gold-deep">
            <CalendarDays aria-hidden strokeWidth={1.4} className="h-6 w-6" />
            {event.dateLabel}
          </p>
          <div className="mt-8 flex items-center gap-3" aria-hidden>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="rule-gold w-40" />
          </div>
          <div className="mt-8 flex max-w-xl gap-4 text-ink/85">
            <BedDouble aria-hidden strokeWidth={1.3} className="mt-1 h-6 w-6 shrink-0 text-gold-deep" />
            <p className="leading-relaxed">
              <span className="font-medium text-aubergine">Accommodation. </span>
              {accommodationNote} Questions? Write to{" "}
              <a href={`mailto:${contact.email}`} className="link-gold text-plum">
                {contact.email}
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal as="div" delay={0.15} className="lg:col-span-5">
          <ol className="divide-y divide-gold/30 border-y border-gold/30">
            {agenda.map((d) => (
              <li key={d.id} className="flex items-baseline justify-between gap-6 py-7">
                <div>
                  <p className="font-display text-4xl text-aubergine">{d.label}</p>
                  <p className="mt-1 text-sm text-mist">{d.date}</p>
                </div>
                <p className="font-display text-3xl text-gold-deep italic">{d.theme}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
