"use client";

import { useSyncExternalStore } from "react";
import { delegateTypes, fees, formatINR, getCurrentPeriod, periods } from "@/data/pricing";
import { cn } from "@/lib/utils";

const noop = () => () => {};

/** Brochure fee table. The window that today's date falls into is marked as current. */
export function PricingTable() {
  const current = useSyncExternalStore(noop, () => getCurrentPeriod(), () => null);

  return (
    /* Horizontal scroll wrapper for narrow screens */
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full min-w-[28rem] border-collapse text-left">
        <caption className="mb-5 text-left font-display text-xl text-champagne sm:text-2xl">
          Registration Fees <span className="text-sm text-ivory/70 sm:text-base">(18% GST extra)</span>
        </caption>
        <thead>
          <tr className="border-b border-champagne/30 text-xs text-ivory/70 sm:text-sm">
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
                <th scope="row" className="py-4 pr-3 text-left font-normal sm:py-5">
                  <span className="flex flex-wrap items-center gap-2 font-display text-xl text-ivory sm:text-2xl">
                    {p.label}
                    {isCurrent && (
                      <span className="bg-gold px-2 py-0.5 font-sans text-[0.6rem] font-medium tracking-[0.12em] text-night uppercase sm:text-[0.65rem]">
                        Current
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-[0.75rem] leading-snug text-ivory/70 sm:text-[0.82rem]">{p.validity}</span>
                </th>
                {delegateTypes.map((t) => (
                  <td key={t.id} className="tabular px-2 py-4 font-display text-[1.35rem] text-champagne sm:py-5 sm:text-[1.65rem] md:text-3xl">
                    {formatINR(fees[t.id][p.id])}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
