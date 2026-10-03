export type SessionKind = "keynote" | "session" | "spotlight" | "networking" | "ceremony" | "break";

export interface AgendaItem {
  time: string;
  session: string;
  title?: string;
  kind: SessionKind;
}

export interface AgendaDay {
  id: "day-1" | "day-2";
  label: string;
  date: string;
  theme: string;
  path: string[];
  items: AgendaItem[];
}

const spotlight = (n: number, time: string): AgendaItem => ({ time, session: `Industry Innovation Spotlight - ${n}`, kind: "spotlight" });

export const agenda: AgendaDay[] = [
  {
    id: "day-1",
    label: "Day 1",
    date: "28 January 2027",
    theme: "Create",
    path: ["Future", "Skin", "Hair", "Color/Fragrance", "Entrepreneurship", "Sustainability"],
    items: [
      { time: "08:30–09:00", session: "Breakfast", title: "Networking Breakfast", kind: "networking" },
      { time: "09:00–09:30", session: "Inauguration", title: "Inaugural Session", kind: "keynote" },
      { time: "09:30–10:30", session: "The Future of Beauty", title: "What will drive the Cosmetics Industry in 2027-2030?", kind: "session" },
      { time: "10:30–11:30", session: "Skin Care", title: "From Anti Ageing to Longevity : The Next Generation of Skin Health", kind: "session" },
      { time: "11:30–11:45", session: "High Tea", title: "Networking High Tea", kind: "networking" },
      { time: "11:45–12:45", session: "Hair Care", title: "The Scalp Revolution : From Haircare to Hair & Scalp Health", kind: "session" },
      spotlight(1, "12:45–1:00"),
      spotlight(2, "1:00–1:15"),
      { time: "1:15–2:00", session: "Lunch", title: "Networking Lunch", kind: "networking" },
      { time: "2:00–3:00", session: "Colour Cosmetics & Fragrance", title: "The New Era of Expression, Personalisation & Sensory Beauty", kind: "session" },
      spotlight(3, "3:00–3:15"),
      { time: "3:15–4:00", session: "From Idea to Beauty Brand", title: "Entrepreneurship & Business Opportunities in Cosmetics", kind: "session" },
      { time: "4:00–4:15", session: "High Tea", title: "Networking High Tea", kind: "networking" },
      spotlight(4, "4:15–4:30"),
      { time: "4:30–5:30", session: "Sustainable Beauty", title: "From Green Claims to Responsible Products, Processes & Packaging", kind: "session" },
      { time: "5:30–7:00", session: "Relaxation Break", kind: "break" },
      { time: "7:00–9:30", session: "Dinner, Award Ceremony & Photograph", title: "Networking Dinner, Cosmetics Leadership Awards & Group Photograph", kind: "ceremony" },
    ],
  },
  {
    id: "day-2",
    label: "Day 2",
    date: "29 January 2027",
    theme: "Scale & Lead",
    path: ["Manufacturing", "Quality", "Regulatory", "Supply Chain", "Global Leadership"],
    items: [
      { time: "08:30–09:00", session: "Breakfast", title: "Networking Breakfast", kind: "networking" },
      { time: "09:00–09:30", session: "Opening Remarks", title: "Opening Remarks & Welcome Address", kind: "keynote" },
      { time: "09:30–10:30", session: "Operational Excellence in Cosmetics", title: "Productivity, Quality, OEE, Cost, Speed & Scale", kind: "session" },
      { time: "10:30–11:30", session: "Regulatory Radar 2027", title: "Preparing for the Next Generation of Global Cosmetics Regulation", kind: "session" },
      { time: "11:30–11:45", session: "High Tea", title: "Networking High Tea", kind: "networking" },
      { time: "11:45–12:45", session: "Claims, Transparency & Consumer Trust", title: "Where Innovation Meets Regulation", kind: "session" },
      spotlight(1, "12:45–1:00"),
      spotlight(2, "1:00–1:15"),
      { time: "1:15–2:00", session: "Lunch", title: "Networking Lunch", kind: "networking" },
      { time: "2:00–2:45", session: "Globalisation of Indian Cosmetics", title: "Can India Become a Global Beauty Manufacturing & Innovation Hub?", kind: "session" },
      spotlight(3, "2:45–3:00"),
      { time: "3:00–3:45", session: "Supply Chain Resilience", title: "Ingredients, Sourcing, Cost, Capacity & Speed", kind: "session" },
      { time: "3:45–4:00", session: "High Tea", title: "Networking High Tea", kind: "networking" },
      spotlight(4, "4:00–4:15"),
      { time: "4:15–5:00", session: "The Cosmetics Industry 2030", title: "What will the winners do differently? (CEO/CXO Closing Panel)", kind: "keynote" },
      { time: "5:00–5:15", session: "Concluding Remarks", title: "Closing Remarks for the Summit", kind: "keynote" },
    ],
  },
];
