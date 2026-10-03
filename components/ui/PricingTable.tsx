"use client";

import { useSyncExternalStore } from "react";
import { delegateTypes, fees, formatINR, getCurrentPeriod, periods } from "@/data/pricing";
import { cn } from "@/lib/utils";

const noop = () => () => {};

/** Brochure fee table. The window that today's date falls into is marked as current. */
export function PricingTable() {
  const current = useSyncExternalStore(noop, () => getCurrentPeriod(), () => null);
  return (
    <table className="w-full border-collapse text-left">
      <caption className="mb-5 text-left font-display text-2xl text-champagne">
        Registration Fees <span className="text-base text-ivory/70">(18% GST extra)</span>
      </caption>
      <thead>
        <tr className="border-b border-champagne/30 text-sm text-ivory/70">
          <th scope="col" className="py-3 pr-3 font-medium">
            Valid till
          </th>
          {delegateTypes.map((t) => (
            <th key={t.id} scope="col" className="px-2 py-3 font-medium">
              {t.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {periods.map((p) => {
          const isCurrent = current === p.id;
          return (
            <tr key={p.id} className={cn("border-b border-champagne/15 align-top", isCurrent && "bg-champagne/10")}>
              <th scope="row" className="py-5 pr-3 text-left font-normal">
                <span className="flex flex-wrap items-center gap-2 font-display text-2xl text-ivory">
                  {p.label}
                  {isCurrent && <span className="bg-gold px-2 py-0.5 font-sans text-[0.65rem] font-medium tracking-[0.14em] text-night uppercase">Current</span>}
                </span>
                <span className="mt-1 block text-[0.82rem] leading-snug text-ivory/70">{p.validity}</span>
              </th>
              {delegateTypes.map((t) => (
                <td key={t.id} className="tabular px-2 py-5 font-display text-[1.65rem] text-champagne sm:text-3xl">
                  {formatINR(fees[t.id][p.id])}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
