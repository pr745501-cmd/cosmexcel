export interface AudienceGroup {
  id: string;
  index: string;
  title: string;
  members: string[];
}

export const audienceIntro = {
  heading: "Who will you meet?",
  sub: "Connect with the Leaders Shaping the Future",
  lead: "This exclusive executive platform will bring together:",
  closing: ["Network", "Exchange", "Collaborate", "Innovate", "Lead"],
} as const;

export const audience: AudienceGroup[] = [
  { id: "c-suite", index: "01", title: "C-Suite Leaders", members: ["CEOs", "Managing Directors", "Presidents", "Startup Founders", "Business Unit Heads"] },
  { id: "manufacturing", index: "02", title: "Manufacturing Leaders", members: ["Manufacturing Directors", "Plant Heads", "Operation Leaders", "Quality Heads", "EHS Leaders"] },
  { id: "innovation", index: "03", title: "Innovation Leaders", members: ["R&D Heads", "Product Development Leaders", "Packaging Innovation Experts"] },
  { id: "strategic", index: "04", title: "Strategic Functions", members: ["Supply Chain Leaders", "Procurement Heads", "Sustainability Leaders", "Regulatory & Compliance Experts"] },
  { id: "ecosystem", index: "05", title: "Industry Ecosystem", members: ["Ingredients Manufacturers", "Packaging Companies", "OEM & ODM Partners", "Technology Providers", "Automation Specialists", "Consulting Firms"] },
];
