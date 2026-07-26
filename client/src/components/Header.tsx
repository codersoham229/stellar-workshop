"use client";

import { StellarLogo } from "@/components/ui/stellar-logo";

interface HeaderProps {
  connected: boolean;
  address: string | null;
  onConnect: () => void;
  isLoading?: boolean;
}

export default function Header({ connected, address, onConnect, isLoading }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <StellarLogo showPoweredBy={false} />
          <span className="h-4 w-px bg-white/20" />
          <span className="font-mono text-xs font-bold tracking-widest text-foreground/80">
            DEV CON 2026
          </span>
        </div>

        <button
          onClick={onConnect}
          disabled={isLoading}
          className="group relative flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-foreground disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="h-4 w-4 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-xs">Checking Wallet...</span>
            </>
          ) : connected && address ? (
            <>
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
              <span className="font-mono text-xs">
                {address.slice(0, 4)}...{address.slice(-4)}
              </span>
            </>
          ) : (
            <>
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
                />
              </svg>
              <span>Connect Wallet</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
