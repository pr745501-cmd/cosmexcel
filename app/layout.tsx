import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { event } from "@/data/event";

const display = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-wght-normal.woff2", style: "normal", weight: "300 700" },
    { path: "./fonts/cormorant-garamond-latin-wght-italic.woff2", style: "italic", weight: "300 700" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
});

const description =
  "Cosmexcel 2027, the Cosmetics Leadership Summit, 28–29 January 2027 at Hotel Ginger, Mumbai Airport. Shaping the Future of Cosmetics through Innovation, Entrepreneurship, Sustainability, Operational Excellence & Leadership.";

export const metadata: Metadata = {
  metadataBase: new URL(event.url),
  title: "Cosmexcel 2027 | Cosmetics Leadership Summit",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Cosmexcel 2027",
    title: "Cosmexcel 2027 | Cosmetics Leadership Summit",
    description,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Cosmexcel 2027 Cosmetics Leadership Summit" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cosmexcel 2027 | Cosmetics Leadership Summit",
    description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a0c22",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2 focus:text-aubergine"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
