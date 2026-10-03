import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}

/** Editorial section heading with the brochure's gold rule + diamond. */
export function SectionHeading({ eyebrow, title, lead, tone = "light", className, id }: Props) {
  const dark = tone === "dark";
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow && <p className={cn("mb-5 text-sm font-medium tracking-[0.06em]", dark ? "text-champagne" : "text-gold-deep")}>{eyebrow}</p>}
      <h2
        id={id}
        className={cn("font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.01em]", dark ? "text-ivory" : "text-aubergine")}
      >
        {title}
      </h2>
      <div className="mt-8 flex items-center gap-3" aria-hidden>
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <span className="rule-gold w-40" />
      </div>
      {lead && <p className={cn("mt-8 max-w-2xl text-lg leading-relaxed", dark ? "text-ivory/80" : "text-mist")}>{lead}</p>}
    </header>
  );
}
