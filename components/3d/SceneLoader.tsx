import { cn } from "@/lib/utils";

/**
 * Static poster used while the 3D chunk loads and wherever WebGL is unavailable.
 * Pure SVG, no assets — it reads as the same product still-life as the live scene.
 */
export function ScenePoster({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none flex items-center justify-center", className)}>
      <svg viewBox="0 0 520 420" className="h-[min(62svh,520px)] w-auto max-w-full" fill="none">
        <defs>
          <linearGradient id="glass" x1="0" x2="1">
            <stop offset="0" stopColor="#6a2d5e" />
            <stop offset="0.5" stopColor="#3b1836" />
            <stop offset="1" stopColor="#5a2650" />
          </linearGradient>
          <linearGradient id="gold" x1="0" x2="1">
            <stop offset="0" stopColor="#a8773a" />
            <stop offset="0.45" stopColor="#f0d9a6" />
            <stop offset="1" stopColor="#9b6a30" />
          </linearGradient>
          <radialGradient id="halo" cx="0.5" cy="0.55" r="0.6">
            <stop offset="0" stopColor="#b88a4b" stopOpacity="0.35" />
            <stop offset="1" stopColor="#b88a4b" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="260" cy="230" rx="250" ry="190" fill="url(#halo)" />
        <ellipse cx="260" cy="372" rx="190" ry="22" fill="#f0e7d6" opacity="0.12" />
        <ellipse cx="260" cy="236" rx="228" ry="76" stroke="#e8cf9e" strokeOpacity="0.28" transform="rotate(-14 260 236)" />
        <rect x="222" y="86" width="76" height="278" rx="12" fill="url(#glass)" />
        <rect x="236" y="48" width="48" height="44" rx="4" fill="url(#gold)" />
        <rect x="318" y="196" width="62" height="168" rx="12" fill="url(#glass)" />
        <rect x="334" y="164" width="30" height="40" rx="3" fill="url(#gold)" />
        <rect x="341" y="132" width="16" height="36" rx="8" fill="#150a1c" />
        <rect x="118" y="290" width="92" height="74" rx="8" fill="url(#glass)" />
        <rect x="114" y="270" width="100" height="26" rx="4" fill="url(#gold)" />
        <rect x="396" y="222" width="56" height="142" rx="10" fill="#efe2cc" />
        <rect x="408" y="190" width="32" height="38" rx="3" fill="url(#gold)" />
      </svg>
    </div>
  );
}
