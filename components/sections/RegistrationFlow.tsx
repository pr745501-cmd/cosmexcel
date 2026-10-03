"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Minus, Plus } from "lucide-react";
import {
  calculateTotal,
  delegateTypes,
  formatINR,
  getCurrentPeriod,
  groupBenefits,
  periods,
  fees,
  GST_RATE,
  type DelegateType,
  type Period,
} from "@/data/pricing";
import { contact } from "@/data/event";
import { cn } from "@/lib/utils";

const STEPS = ["Delegate type", "Period", "Your details", "Group", "Review"] as const;
const MAX_DELEGATES = 50;

interface Info {
  name: string;
  designation: string;
  company: string;
  email: string;
  phone: string;
}
type Errors = Partial<Record<keyof Info, string>>;
const EMPTY: Info = { name: "", designation: "", company: "", email: "", phone: "" };
const noop = () => () => {};

function validate(info: Info): Errors {
  const e: Errors = {};
  if (!info.name.trim()) e.name = "Enter the delegate's full name.";
  if (!info.designation.trim()) e.designation = "Enter the delegate's designation.";
  if (!info.company.trim()) e.company = "Enter the company or start-up name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email.trim())) e.email = "Enter a valid email address, such as name@company.com.";
  if (info.phone.replace(/\D/g, "").length < 8) e.phone = "Enter a phone number with at least 8 digits.";
  return e;
}

function Choice({
  name,
  value,
  checked,
  onChange,
  title,
  note,
  aside,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  note?: string;
  aside?: string;
}) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer items-start gap-3 border p-4 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-deep sm:gap-4 sm:p-5",
        checked ? "border-gold-deep bg-cream" : "border-gold/40 hover:border-gold-deep",
      )}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={cn(
          "mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          checked ? "border-gold-deep bg-gold-deep text-ivory" : "border-gold",
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-display text-xl leading-tight text-aubergine sm:text-2xl">{title}</span>
        {note && <span className="mt-1 block text-xs leading-relaxed text-mist sm:text-sm">{note}</span>}
      </span>
      {aside && <span className="tabular font-display text-xl text-gold-deep shrink-0 sm:text-2xl">{aside}</span>}
    </label>
  );
}

function Field({
  id,
  label,
  error,
  ...input
}: { id: string; label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-aubergine">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={cn(
          "min-h-12 w-full border bg-ivory px-4 text-base text-ink transition-colors placeholder:text-mist/60 focus:border-gold-deep focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-deep",
          error ? "border-[#9c2f3a]" : "border-gold/50",
        )}
        {...input}
      />
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-[#9c2f3a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function RegistrationFlow() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [type, setType] = useState<DelegateType>("industry");
  const [period, setPeriod] = useState<Period>("early");
  const [info, setInfo] = useState<Info>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [delegates, setDelegates] = useState(1);
  const [done, setDone] = useState(false);
  const current = useSyncExternalStore(noop, () => getCurrentPeriod(), () => null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step, done]);

  const totals = calculateTotal(type, period, delegates);
  const typeLabel = delegateTypes.find((t) => t.id === type)?.label ?? "";
  const periodMeta = periods.find((p) => p.id === period);

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };
  const next = () => {
    if (step === 2) {
      const found = validate(info);
      setErrors(found);
      if (Object.keys(found).length) return;
    }
    go(Math.min(step + 1, STEPS.length - 1));
  };
  const reset = () => {
    setStep(0);
    setDir(-1);
    setInfo(EMPTY);
    setErrors({});
    setDelegates(1);
    setType("industry");
    setPeriod("early");
    setDone(false);
  };

  const update = (key: keyof Info) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((v) => ({ ...v, [key]: undefined }));
  };

  return (
    <div className="on-light bg-ivory text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
      {/* Step progress header */}
      <div className="border-b border-gold/40 px-4 pt-6 pb-4 sm:px-8 sm:pt-7 sm:pb-5">
        <p className="mb-4 inline-block bg-aubergine px-3 py-1 text-[0.65rem] font-medium tracking-[0.12em] text-champagne uppercase sm:text-xs sm:tracking-[0.14em]">
          Front-end preview · nothing is submitted
        </p>
        <ol className="grid grid-cols-5 gap-1 sm:gap-2" aria-label="Registration steps">
          {STEPS.map((label, i) => (
            <li key={label} aria-current={i === step && !done ? "step" : undefined} className="min-w-0">
              <span className={cn("block h-[3px] transition-colors duration-500", i <= step || done ? "bg-gold" : "bg-gold/25")} />
              <span
                className={cn(
                  "mt-1.5 block truncate text-[0.62rem] leading-tight sm:mt-2 sm:text-xs",
                  i === step && !done ? "font-medium text-aubergine" : "text-mist",
                )}
              >
                <span className="tabular">{i + 1}.</span>
                {/* Show label text on sm+ */}
                <span className="hidden sm:inline"> {label}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Step content */}
      <div className="min-h-[24rem] px-4 py-6 sm:min-h-[26rem] sm:px-8 sm:py-8">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={done ? "done" : step}
            custom={dir}
            initial={{ opacity: 0, x: dir * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {done ? (
              <div>
                <h3 ref={heading} tabIndex={-1} className="font-display text-3xl text-aubergine outline-none sm:text-4xl">
                  Preview complete
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/85 sm:text-base">
                  This was a demonstration of the registration flow. No registration has been made and no payment has been taken. To register for Cosmexcel 2027, use the{" "}
                  <a href={contact.registrationForm} target="_blank" rel="noopener noreferrer" className="link-gold text-plum">
                    official registration form<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  , or contact{" "}
                  <a href={`mailto:${contact.email}`} className="link-gold text-plum break-all">
                    {contact.email}
                  </a>{" "}
                  or call{" "}
                  <a href={`tel:${contact.phoneHref}`} className="link-gold text-plum">
                    {contact.phone}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-8 inline-flex min-h-12 items-center border border-plum/40 px-6 text-[0.75rem] font-medium tracking-[0.16em] text-plum uppercase transition-colors hover:bg-plum hover:text-ivory sm:px-8 sm:text-[0.78rem] sm:tracking-[0.18em]"
                >
                  Start again
                </button>
              </div>
            ) : (
              <>
                <h3 ref={heading} tabIndex={-1} className="font-display text-2xl text-aubergine outline-none sm:text-3xl md:text-4xl">
                  {["Choose delegate type", "Choose registration period", "Delegate information", "Group registration", "Review your selection"][step]}
                </h3>

                {/* Step 0 — delegate type */}
                {step === 0 && (
                  <fieldset className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                    <legend className="sr-only">Delegate type</legend>
                    {delegateTypes.map((t) => (
                      <Choice
                        key={t.id}
                        name={`${uid}-type`}
                        value={t.id}
                        checked={type === t.id}
                        onChange={() => setType(t.id)}
                        title={t.label}
                        aside={`${formatINR(Math.min(...Object.values(fees[t.id])))}–${formatINR(Math.max(...Object.values(fees[t.id])))}`}
                      />
                    ))}
                  </fieldset>
                )}

                {/* Step 1 — period */}
                {step === 1 && (
                  <fieldset className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                    <legend className="sr-only">Registration period</legend>
                    {periods.map((p) => (
                      <Choice
                        key={p.id}
                        name={`${uid}-period`}
                        value={p.id}
                        checked={period === p.id}
                        onChange={() => setPeriod(p.id)}
                        title={p.label}
                        note={`${p.validity}${current === p.id ? " · Open now" : ""}`}
                        aside={formatINR(fees[type][p.id])}
                      />
                    ))}
                    <p className="text-sm text-mist">Fees are per delegate and exclude 18% GST.</p>
                  </fieldset>
                )}

                {/* Step 2 — delegate info */}
                {step === 2 && (
                  <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 sm:grid-cols-2">
                    <Field id={`${uid}-name`} label="Full name" autoComplete="name" value={info.name} onChange={update("name")} error={errors.name} />
                    <Field id={`${uid}-designation`} label="Designation" autoComplete="organization-title" value={info.designation} onChange={update("designation")} error={errors.designation} />
                    <div className="sm:col-span-2">
                      <Field id={`${uid}-company`} label="Company" autoComplete="organization" value={info.company} onChange={update("company")} error={errors.company} />
                    </div>
                    <Field id={`${uid}-email`} label="Email" type="email" autoComplete="email" inputMode="email" value={info.email} onChange={update("email")} error={errors.email} />
                    <Field id={`${uid}-phone`} label="Phone" type="tel" autoComplete="tel" inputMode="tel" value={info.phone} onChange={update("phone")} error={errors.phone} />
                  </div>
                )}

                {/* Step 3 — group */}
                {step === 3 && (
                  <div className="mt-6 sm:mt-8">
                    <p className="max-w-md text-sm text-ink/85 sm:text-base">How many delegates are you registering? Bring your team and save.</p>
                    <div className="mt-6 flex items-center gap-5">
                      <button
                        type="button"
                        aria-label="Remove one delegate"
                        disabled={delegates <= 1}
                        onClick={() => setDelegates((n) => Math.max(1, n - 1))}
                        className="flex h-11 w-11 items-center justify-center border border-gold-deep text-plum transition-colors hover:bg-plum hover:text-ivory disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-plum sm:h-12 sm:w-12"
                      >
                        <Minus aria-hidden className="h-5 w-5" />
                      </button>
                      <output aria-live="polite" className="tabular min-w-10 text-center font-display text-5xl text-aubergine sm:text-6xl">
                        {delegates}
                      </output>
                      <button
                        type="button"
                        aria-label="Add one delegate"
                        disabled={delegates >= MAX_DELEGATES}
                        onClick={() => setDelegates((n) => Math.min(MAX_DELEGATES, n + 1))}
                        className="flex h-11 w-11 items-center justify-center border border-gold-deep text-plum transition-colors hover:bg-plum hover:text-ivory disabled:opacity-35 sm:h-12 sm:w-12"
                      >
                        <Plus aria-hidden className="h-5 w-5" />
                      </button>
                    </div>
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:mt-8">
                      {groupBenefits.map((b) => (
                        <li
                          key={b.label}
                          className={cn(
                            "border p-3 text-sm transition-colors sm:p-4",
                            totals.percent === b.percent ? "border-gold-deep bg-cream font-medium text-aubergine" : "border-gold/40 text-mist",
                          )}
                        >
                          {b.label}
                          {totals.percent === b.percent && <span className="ml-2 text-gold-deep">· applied</span>}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-mist sm:text-sm">In this preview every delegate is priced at the same delegate type and period.</p>
                  </div>
                )}

                {/* Step 4 — review */}
                {step === 4 && (
                  <div className="mt-6 grid gap-6 sm:mt-8 md:grid-cols-2 md:gap-8">
                    {/* Summary dl */}
                    <dl className="space-y-2 text-[0.88rem] sm:space-y-3 sm:text-[0.95rem]">
                      {[
                        ["Delegate type", typeLabel],
                        ["Period", `${periodMeta?.label} (${periodMeta?.validity})`],
                        ["Name", info.name],
                        ["Designation", info.designation],
                        ["Company", info.company],
                        ["Email", info.email],
                        ["Phone", info.phone],
                        ["Delegates", String(delegates)],
                      ].map(([k, v]) => (
                        <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2 sm:grid-cols-[6.5rem_1fr] sm:gap-3">
                          <dt className="text-mist">{k}</dt>
                          <dd className="min-w-0 font-medium break-words text-ink">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {/* Totals */}
                    <div className="self-start">
                      <dl className="tabular bg-aubergine p-4 text-ivory sm:p-6">
                        <div className="flex justify-between gap-3 py-2 text-sm sm:text-base">
                          <dt className="text-ivory/80">
                            Base amount{" "}
                            <span className="text-xs">
                              ({formatINR(totals.unit)} × {delegates})
                            </span>
                          </dt>
                          <dd>{formatINR(totals.base)}</dd>
                        </div>
                        {totals.percent > 0 && (
                          <div className="flex justify-between gap-3 py-2 text-sm text-champagne sm:text-base">
                            <dt>Group discount ({totals.percent}%)</dt>
                            <dd>−{formatINR(totals.discount)}</dd>
                          </div>
                        )}
                        <div className="flex justify-between gap-3 py-2 text-sm sm:text-base">
                          <dt className="text-ivory/80">GST ({GST_RATE * 100}%)</dt>
                          <dd>{formatINR(totals.gst)}</dd>
                        </div>
                        <div className="mt-3 flex items-baseline justify-between gap-3 border-t border-champagne/30 pt-4">
                          <dt className="text-sm font-medium sm:text-base">Total</dt>
                          <dd className="font-display text-3xl text-champagne sm:text-4xl">{formatINR(totals.total)}</dd>
                        </div>
                      </dl>
                      <p className="mt-3 text-xs leading-relaxed text-mist">
                        Preview estimate. The group discount is applied to the base amount before 18% GST.
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer */}
      {!done && (
        <div className="flex items-center justify-between gap-3 border-t border-gold/40 px-4 py-4 sm:gap-4 sm:px-8 sm:py-5">
          <button
            type="button"
            onClick={() => go(step - 1)}
            disabled={step === 0}
            className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-medium text-plum transition-opacity disabled:pointer-events-none disabled:opacity-0"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" /> Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex min-h-12 items-center gap-2 bg-plum px-6 text-[0.74rem] font-medium tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-aubergine sm:gap-3 sm:px-8 sm:text-[0.78rem] sm:tracking-[0.18em]"
            >
              Continue <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setDone(true)}
              className="inline-flex min-h-12 items-center gap-2 bg-gold px-6 text-[0.74rem] font-medium tracking-[0.16em] text-night uppercase transition-colors hover:bg-champagne sm:gap-3 sm:px-8 sm:text-[0.78rem] sm:tracking-[0.18em]"
            >
              Finish preview
            </button>
          )}
        </div>
      )}
    </div>
  );
}
