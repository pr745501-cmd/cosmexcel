/**
 * Single source of truth for event facts. Everything here is taken from the
 * Cosmexcel 2027 brochure. Nothing in this file is invented.
 */
export const event = {
  name: "Cosmexcel",
  year: 2027,
  fullName: "Cosmexcel 2027",
  title: "Cosmetics Leadership Summit",
  tagline: "Create. Scale. Lead.",
  summary:
    "Shaping the Future of Cosmetics through Innovation, Entrepreneurship, Sustainability, Operational Excellence & Leadership",
  positioning:
    "A summit designed to inspire innovation, empower entrepreneurs, and shape the future of the global cosmetics industry.",
  dateLabel: "28–29 January 2027",
  dayOne: "28 January 2027",
  dayTwo: "29 January 2027",
  /**
   * Countdown target. The brochure gives a date but no start time, so the
   * countdown runs to the start of 28 January 2027 in India Standard Time.
   */
  startsAt: "2027-01-28T00:00:00+05:30",
  venue: "Hotel Ginger, Mumbai Airport",
  /** Set NEXT_PUBLIC_SITE_URL to the production domain before launch. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cosmetics.schoolofmanufacturing.com",
} as const;

export const contact = {
  organisation: "School of Manufacturing",
  email: "hello@schoolofmanufacturing.com",
  phone: "+91-9898221954",
  phoneHref: "+919898221954",
  website: "https://schoolofmanufacturing.com/",
  /** Registration form encoded in the QR code on the brochure's registration page. */
  registrationForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSdky7obABlL0hoXK9p6poanJF4GFdipZ4LjNClWmSGyKGiF8Q/viewform?usp=header",
} as const;

export const market = {
  eyebrow: "The New Decade of Beauty",
  heading: "Why this summit matters",
  intro:
    "The global beauty industry is entering a transformative decade. With a projected market of USD 590 billion by 2030, beauty is evolving through science-led innovation, advanced manufacturing, digital commerce and changing consumer expectations. For founders and industry leaders, the opportunity is clear: build products that combine performance, purpose and consumer relevance—and turn innovative ideas into scalable beauty businesses.",
  stats: [
    {
      value: "USD 590Bn",
      label: "",
      body: "The global beauty market is projected to reach USD 590 billion by 2030, creating opportunities across skincare, haircare, colour cosmetics and fragrance.",
    },
    {
      value: "~5%",
      label: "CAGR",
      body: "Global beauty is expected to grow at approximately 5% annually through 2030, opening doors for new brands, differentiated formulations and innovative business models.",
    },
    {
      value: "#4",
      label: "Ranking",
      body: "Skincare, haircare, colour cosmetics and fragrance are shaping the future of the global beauty industry through innovation, performance and consumer-focused product development.",
    },
  ],
  shifts: [
    "AI-powered manufacturing and smart factories are reshaping product development, quality and operational efficiency.",
    "Science-backed formulations and clean-ingredient innovation are redefining consumer expectations.",
    "Digital commerce, social discovery and personalised beauty experiences are transforming brand growth.",
    "Emerging markets are creating new opportunities for inclusive, affordable and premium beauty solutions.",
    "Sustainability, product efficacy and differentiated brand experiences are becoming essential to long-term success.",
  ],
  closing:
    "Cosmexcel 2027 brings together visionaries, innovators, and changemakers from across the beauty ecosystem to exchange ideas, forge partnerships, and shape the next decade of inclusive, innovative, and sustainable growth.",
} as const;

export const pillars = [
  { word: "Connect", line: "with Global Leaders" },
  { word: "Innovate", line: "for the Future" },
  { word: "Sustain", line: "for Leading Impact" },
  { word: "Excel", line: "through Excellence" },
] as const;

export const closing = {
  heading: "Join the Industry’s Most Influential Cosmetics Leaders",
  quote: "The Future Will Be Built by Those Who Lead It",
  lead: "Cosmexcel 2027 is more than just a conference.",
  roles: [
    { lead: "It is a platform for", key: "Collaboration" },
    { lead: "A forum for", key: "Innovation" },
    { lead: "A catalyst for", key: "Transformation" },
  ],
  gathering:
    "A gathering of leaders committed to advancing the future of cosmetics industry.",
} as const;

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Agenda", href: "#agenda" },
  { label: "Leaders", href: "#leaders" },
  { label: "Trusted By", href: "#trusted-by" },
  { label: "Registration", href: "#registration" },
] as const;
