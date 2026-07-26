import React from "react";

interface StellarLogoProps {
  className?: string;
  iconOnly?: boolean;
  showPoweredBy?: boolean;
}

export function StellarIcon({ className = "h-6 w-6 text-white" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stellar Network Logo"
    >
      {/* Official Stellar Planet Orbit Icon Geometry */}
      <path d="M 50,2 A 48,48 0 0 0 3,42 L 19,42 A 32,32 0 0 1 50,18 A 32,32 0 0 1 81,42 L 97,42 A 48,48 0 0 0 50,2 Z" />
      <path d="M 50,98 A 48,48 0 0 0 97,58 L 81,58 A 32,32 0 0 1 50,82 A 32,32 0 0 1 19,58 L 3,58 A 48,48 0 0 0 50,98 Z" />
      <polygon points="4,28 84,72 96,72 16,28" />
      <polygon points="4,72 84,28 96,28 16,72" />
    </svg>
  );
}

export function StellarLogo({ className = "", iconOnly = false, showPoweredBy = false }: StellarLogoProps) {
  if (iconOnly) {
    return <StellarIcon className={className || "h-6 w-6 text-white"} />;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {showPoweredBy && (
        <span className="text-[11px] font-semibold tracking-wider text-foreground/40 uppercase">
          Powered by
        </span>
      )}
      <div className="relative flex items-center gap-2">
        <div className="relative flex items-center justify-center rounded-full bg-accent/10 p-1.5 ring-1 ring-accent/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <StellarIcon className="h-5 w-5 text-accent" />
        </div>
        <span className="font-sans text-lg font-extrabold tracking-tight text-white">
          Stellar
        </span>
      </div>
    </div>
  );
}

export function StellarBanner() {
  return (
    <div className="relative my-8 overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-r from-accent/10 via-purple-900/10 to-blue-900/10 p-6 backdrop-blur-xl shadow-[0_0_40px_rgba(139,92,246,0.15)]">
      {/* Background glow & particles */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/40 bg-black/40 p-3 shadow-[0_0_25px_rgba(139,92,246,0.4)]">
            <StellarIcon className="h-8 w-8 text-accent animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                OFFICIAL NETWORK INTEGRATION
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping" />
            </div>
            <h4 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Stellar Testnet Horizon
            </h4>
            <p className="mt-0.5 text-xs text-foreground/60">
              Transactions, tickets &amp; smart contract execution powered by Stellar Soroban
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://stellar.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-accent/30 bg-accent/20 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all hover:bg-accent/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95"
          >
            <span>Learn About Stellar</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
