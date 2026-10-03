import { Globe, Mail, Phone } from "lucide-react";
import { contact, event, navLinks } from "@/data/event";

export function Footer() {
  return (
    <footer className="on-dark bg-night text-ivory">
      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <p className="flex items-baseline gap-2">
            <span className="font-display text-4xl font-semibold tracking-[0.14em]">COSMEXCEL</span>
            <span className="font-display text-3xl text-champagne italic">2027</span>
          </p>
          <p className="mt-3 font-display text-xl text-champagne italic">{event.tagline}</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/75">
            {event.title} · {event.dateLabel} · {event.venue}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="font-display text-xl text-champagne">Explore</h2>
          <ul className="mt-4 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-gold inline-flex min-h-10 items-center text-ivory/85 hover:text-ivory">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="font-display text-xl text-champagne">{contact.organisation}</h2>
          <ul className="mt-4 space-y-1">
            <li>
              <a href={`mailto:${contact.email}`} className="link-gold inline-flex min-h-10 items-center gap-3 text-ivory/85 hover:text-ivory">
                <Mail aria-hidden className="h-4 w-4 text-gold" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={`tel:${contact.phoneHref}`} className="link-gold inline-flex min-h-10 items-center gap-3 text-ivory/85 hover:text-ivory">
                <Phone aria-hidden className="h-4 w-4 text-gold" /> {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.website} target="_blank" rel="noopener noreferrer" className="link-gold inline-flex min-h-10 items-center gap-3 text-ivory/85 hover:text-ivory">
                <Globe aria-hidden className="h-4 w-4 text-gold" /> schoolofmanufacturing.com
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
