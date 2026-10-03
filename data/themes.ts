export interface Theme {
  id: string;
  index: string;
  title: string;
}

/** "What you'll gain at this summit" — the eight areas exactly as listed in the brochure. */
export const themes: Theme[] = [
  { id: "market", index: "01", title: "Global Beauty Market Intelligence" },
  { id: "innovation", index: "02", title: "Product Innovation & Formulation" },
  { id: "entrepreneurship", index: "03", title: "Entrepreneurship & Brand Building" },
  { id: "sustainability", index: "04", title: "Sustainable & Responsible Beauty" },
  { id: "manufacturing", index: "05", title: "Manufacturing Excellence" },
  { id: "regulatory", index: "06", title: "Regulatory & Consumer Trust" },
  { id: "growth", index: "07", title: "Global Growth & Supply Chain" },
  { id: "leadership", index: "08", title: "Leadership & Future-Ready Strategy" },
];
