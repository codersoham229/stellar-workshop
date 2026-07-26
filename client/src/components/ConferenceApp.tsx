"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TicketGrid from "@/components/TicketGrid";

// Mock Stellar address for demo
const MOCK_ADDRESS = "GDXJCYG3V6T4E7NMCY5M6O3MKZG5U5VJ3K2L1ABCDEF";

export default function ConferenceApp() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const handleConnect = useCallback(() => {
    if (connected) {
      // Toggle disconnect
      setConnected(false);
      setAddress(null);
      return;
    }

    // Simulate wallet connection
    setConnected(true);
    setAddress(MOCK_ADDRESS);
  }, [connected]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header connected={connected} address={address} onConnect={handleConnect} />
      <main className="flex-1">
        <Hero />
        <TicketGrid connected={connected} />
      </main>
      <footer className="border-t border-white/[0.04] py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-xs text-foreground/20">
          <p>Built on Stellar • Powered by Soroban</p>
        </div>
      </footer>
    </div>
  );
}
