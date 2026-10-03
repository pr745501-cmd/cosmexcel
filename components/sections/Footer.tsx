import { Globe, Mail, Phone } from "lucide-react";
import { contact, event, navLinks } from "@/data/event";

export function Footer() {
  return (
    <footer className="on-dark bg-night text-ivory">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-4 py-16 sm:px-8 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:px-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <p className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display text-3xl font-semibold tracking-[0.14em] sm:text-4xl">COSMEXCEL</span>
            <span className="font-display text-2xl text-champagne italic sm:text-3xl">2027</span>
          </p>
          <p className="mt-2 font-display text-lg text-champagne italic sm:text-xl">{event.tagline}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
            {event.title} · {event.dateLabel} · {event.venue}
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer" className="lg:col-span-3">
          <h2 className="font-display text-lg text-champagne sm:text-xl">Explore</h2>
          <ul className="mt-3 space-y-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-gold inline-flex min-h-10 items-center text-sm text-ivory/85 hover:text-ivory sm:text-base">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-4">
          <h2 className="font-display text-lg text-champagne sm:text-xl">{contact.organisation}</h2>
          <ul className="mt-3 space-y-1">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="link-gold inline-flex min-h-10 items-center gap-3 text-sm text-ivory/85 hover:text-ivory break-all sm:text-base"
              >
                <Mail aria-hidden className="h-4 w-4 shrink-0 text-gold" /> {contact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contact.phoneHref}`}
                className="link-gold inline-flex min-h-10 items-center gap-3 text-sm text-ivory/85 hover:text-ivory sm:text-base"
              >
                <Phone aria-hidden className="h-4 w-4 shrink-0 text-gold" /> {contact.phone}
              </a>
            </li>
            <li>
              <a
                href={contact.website}
                target="_blank"
                rel="noopener noreferrer"
                className="link-gold inline-flex min-h-10 items-center gap-3 text-sm text-ivory/85 hover:text-ivory sm:text-base"
              >
                <Globe aria-hidden className="h-4 w-4 shrink-0 text-gold" /> schoolofmanufacturing.com
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
