export type DelegateType = "industry" | "startup";
export type Period = "early" | "regular" | "late";

export const GST_RATE = 0.18;

/** Labels exactly as printed in the brochure's fee table. */
export const delegateTypes: { id: DelegateType; label: string }[] = [
  { id: "industry", label: "Industry Delegate" },
  { id: "startup", label: "Start-Up Founders" },
];

export const periods: { id: Period; label: string; validity: string; ends: string }[] = [
  { id: "early", label: "Early Bird", validity: "Till 30 Oct 2026", ends: "2026-10-30T23:59:59+05:30" },
  { id: "regular", label: "Regular", validity: "1 Nov 2026 – 15 Dec 2026", ends: "2026-12-15T23:59:59+05:30" },
  { id: "late", label: "Late", validity: "15 Dec 2026 – 25 Jan 2027", ends: "2027-01-25T23:59:59+05:30" },
];

/** Fees in INR, excluding 18% GST. */
export const fees: Record<DelegateType, Record<Period, number>> = {
  industry: { early: 12000, regular: 15000, late: 18000 },
  startup: { early: 10000, regular: 12000, late: 15000 },
};

export const groupBenefits = [
  { min: 3, max: 5, percent: 10, label: "10% off for 3–5 delegates" },
  { min: 6, max: Infinity, percent: 15, label: "15% off for 6+ delegates" },
] as const;

export const accommodationNote =
  "Special delegate rates available at the summit venue / partner hotel. Limited rooms available (Booking subject to availability).";

export function getGroupDiscountPercent(delegates: number): number {
  return groupBenefits.find((b) => delegates >= b.min && delegates <= b.max)?.percent ?? 0;
}

/** The pricing window the current date falls in, or null once registration has closed. */
export function getCurrentPeriod(now: Date = new Date()): Period | null {
  const found = periods.find((p) => now.getTime() <= new Date(p.ends).getTime());
  return found?.id ?? null;
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

export function calculateTotal(type: DelegateType, period: Period, delegates: number) {
  const unit = fees[type][period];
  const base = unit * delegates;
  const percent = getGroupDiscountPercent(delegates);
  const discount = Math.round(base * (percent / 100));
  const taxable = base - discount;
  const gst = Math.round(taxable * GST_RATE);
  return { unit, base, percent, discount, taxable, gst, total: taxable + gst };
}
