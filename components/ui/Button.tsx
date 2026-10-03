import { cn } from "@/lib/utils";

type Variant = "gold" | "plum" | "outline" | "outline-dark";

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden px-8 py-3 text-[0.8rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 ease-[var(--ease-lux)] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-champagne",
  plum: "bg-plum text-ivory hover:bg-aubergine",
  outline: "border border-champagne/60 text-ivory hover:bg-champagne hover:text-night",
  "outline-dark": "border border-plum/40 text-plum hover:bg-plum hover:text-ivory",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

type AnchorProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = "gold", className, children } = props;
  const classes = cn(base, variants[variant], className);
  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
