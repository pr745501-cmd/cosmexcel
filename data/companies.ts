export interface Company {
  name: string;
  logo: string;
  width: number;
  height: number;
}

/** Organisations shown on the brochure's "Trusted By" page, in brochure order. */
export const companies: Company[] = [
  { name: "Aditya Birla Group", logo: "aditya-birla", width: 413, height: 256 },
  { name: "Atul", logo: "atul", width: 305, height: 185 },
  { name: "BASF", logo: "basf", width: 453, height: 183 },
  { name: "Bayer", logo: "bayer", width: 275, height: 256 },
  { name: "Croda", logo: "croda", width: 325, height: 98 },
  { name: "Dr. Sheth’s", logo: "dr-sheths", width: 434, height: 126 },
  { name: "Emami Group", logo: "emami", width: 247, height: 197 },
  { name: "Evonik", logo: "evonik", width: 437, height: 130 },
  { name: "Hindustan Unilever Limited", logo: "hindustan-unilever", width: 473, height: 189 },
  { name: "Institute of Chemical Technology", logo: "ict", width: 256, height: 296 },
  { name: "IFF", logo: "iff", width: 227, height: 158 },
  { name: "IMCD", logo: "imcd", width: 394, height: 150 },
  { name: "Johnson & Johnson", logo: "johnson-johnson", width: 457, height: 90 },
  { name: "Kaya Clinic", logo: "kaya", width: 312, height: 209 },
  { name: "L’Oréal", logo: "loreal", width: 380, height: 87 },
  { name: "Lupin", logo: "lupin", width: 242, height: 268 },
  { name: "Marico", logo: "marico", width: 276, height: 248 },
  { name: "National University of Singapore", logo: "nus", width: 343, height: 166 },
  { name: "Nykaa", logo: "nykaa", width: 323, height: 126 },
  { name: "OmniActive", logo: "omniactive", width: 414, height: 217 },
  { name: "Pidilite", logo: "pidilite", width: 383, height: 191 },
  { name: "Reliance Industries Limited", logo: "reliance", width: 355, height: 236 },
  { name: "Woolf", logo: "woolf", width: 390, height: 91 },
];
