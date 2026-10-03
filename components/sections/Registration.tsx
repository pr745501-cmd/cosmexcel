import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PricingTable } from "@/components/ui/PricingTable";
import { RegistrationFlow } from "./RegistrationFlow";
import { accommodationNote, groupBenefits } from "@/data/pricing";
import { contact } from "@/data/event";

export function Registration() {
  return (
    <section id="registration" aria-labelledby="registration-title" className="on-dark relative overflow-hidden bg-aubergine text-ivory">
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(45% 40% at 90% 0%, rgba(184,138,75,0.2), transparent 70%), radial-gradient(40% 50% at 0% 100%, rgba(26,12,34,0.9), transparent 70%)" }} />
      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 md:py-32 lg:px-12">
        <Reveal>
          <SectionHeading id="registration-title" tone="dark" title="Registration" lead="Choose your delegate type and period, see your fee, and bring your team to save." />
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <PricingTable />
            <div className="mt-10 border-t border-champagne/25 pt-8">
              <h3 className="font-display text-2xl text-champagne">Group registration benefit</h3>
              <p className="mt-2 text-ivory/80">Bring your team and save:</p>
              <ul className="mt-4 space-y-2">
                {groupBenefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-3 text-lg">
                    <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-gold" />
                    {b.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 border-t border-champagne/25 pt-8">
              <a href={contact.registrationForm} target="_blank" rel="noopener noreferrer" className="link-gold inline-flex min-h-11 items-center text-lg text-champagne">
                Register via the official registration form
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
            <div className="mt-8 border-t border-champagne/25 pt-8">
              <h3 className="font-display text-2xl text-champagne">Accommodation</h3>
              <p className="mt-2 max-w-md leading-relaxed text-ivory/80">{accommodationNote}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.12}>
            <RegistrationFlow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
