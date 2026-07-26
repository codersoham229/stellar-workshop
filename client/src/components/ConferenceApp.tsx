"use client";

import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import TicketGrid from "@/components/TicketGrid";
import ScheduleSection from "@/components/ScheduleSection";
import DigitalTicketPass from "@/components/DigitalTicketPass";
import { ScrollGlobe } from "@/components/ui/landing-page";
import { StellarBanner, StellarIcon } from "@/components/ui/stellar-logo";
import { useStellarWallet } from "@/hooks/useStellarWallet";

const MOCK_DEMO_ADDRESS = "GDXJCYG3V6T4E7NMCY5M6O3MKZG5U5VJ3K2L1ABCDEF";

export default function ConferenceApp() {
  const {
    publicKey,
    isConnected,
    isInstalled,
    isLoading,
    error,
    connect,
    disconnect,
  } = useStellarWallet();

  const [activeTab, setActiveTab] = useState<"explore" | "tickets" | "schedule" | "pass">("explore");
  const [demoConnected, setDemoConnected] = useState(false);

  // State to hold purchased ticket details after successful transaction on Stellar
  const [purchasedTicket, setPurchasedTicket] = useState<{
    tierName: string;
    priceXlm: number | string;
    hash: string;
    timestamp: string;
  } | null>(null);

  // Toggle connection logic
  const handleConnectToggle = useCallback(async () => {
    if (isConnected || demoConnected) {
      disconnect();
      setDemoConnected(false);
      return;
    }

    const key = await connect();

    if (!key && isInstalled === false) {
      setDemoConnected(true);
    }
  }, [isConnected, demoConnected, connect, disconnect, isInstalled]);

  // Handle successful ticket purchase
  const handleTicketPurchased = useCallback(
    (ticket: {
      tierName: string;
      priceXlm: number | string;
      hash: string;
      timestamp: string;
    }) => {
      setPurchasedTicket(ticket);
      setActiveTab("pass");
    },
    []
  );

  const effectiveConnected = isConnected || demoConnected;
  const displayAddress = publicKey || (effectiveConnected ? MOCK_DEMO_ADDRESS : null);
  const userKeyForPass = publicKey || MOCK_DEMO_ADDRESS;

  // Globe sections for interactive landing experience
  const landingGlobeSections = [
    {
      id: "hero",
      badge: "Welcome",
      title: "DEV CON 2026",
      subtitle: "Global Stellar Developer Conference",
      description: "Journey through an immersive experience where Web3 technology meets Soroban smart contract innovation. Connect your wallet, explore keynotes, and reserve on-chain tickets.",
      align: "left" as const,
      actions: [
        {
          label: "Reserve Tickets",
          variant: "primary" as const,
          onClick: () => setActiveTab("tickets"),
        },
        {
          label: "View Agenda",
          variant: "secondary" as const,
          onClick: () => setActiveTab("schedule"),
        },
      ],
    },
    {
      id: "innovation",
      badge: "Global Network",
      title: "Connected Worldwide on Stellar",
      description: "Join thousands of Web3 engineers, Soroban developers, and financial innovators from across the globe in a 100% virtual, high-speed ecosystem.",
      align: "center" as const,
    },
    {
      id: "discovery",
      badge: "Soroban SDK v22",
      title: "Next-Gen Smart Contracts",
      subtitle: "Built for Scale & Speed",
      description: "Experience ~1.2s average finality latency, zero-knowledge privacy primitives, and seamless cross-chain interoperability.",
      align: "left" as const,
      features: [
        { title: "On-Chain Verification", description: "Every ticket pass is cryptographically signed & verified on Stellar Testnet" },
        { title: "Freighter Wallet Integration", description: "Seamless web3 access with instant hardware and extension support" },
        { title: "Live Interactive Workshops", description: "Hands-on Soroban contract engineering & auditor masterclasses" },
      ],
    },
    {
      id: "future",
      badge: "DEV CON 2026",
      title: "Reserve Your Spot",
      subtitle: "On-Chain Today",
      description: "Claim your General Admission or VIP Pass. Secure your entry badge directly on the Stellar Blockchain.",
      align: "center" as const,
      actions: [
        {
          label: "Claim Pass Now",
          variant: "primary" as const,
          onClick: () => setActiveTab("tickets"),
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-accent/30 selection:text-white">
      <Header
        connected={effectiveConnected}
        address={displayAddress}
        onConnect={handleConnectToggle}
        isLoading={isLoading}
      />

      {/* Wallet error alert banner */}
      {error && (
        <div className="border-b border-red-500/20 bg-red-500/10 px-6 py-2.5 text-center text-xs font-medium text-red-400">
          <span>{error}</span>
        </div>
      )}

      <main className="flex-1">
        {/* Navigation Tabs */}
        <div className="sticky top-16 z-30 mx-auto my-4 flex max-w-lg justify-center rounded-2xl border border-white/10 bg-slate-950/80 p-1.5 backdrop-blur-xl shadow-xl">
          <button
            onClick={() => setActiveTab("explore")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              activeTab === "explore"
                ? "bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            🌍 3D Globe
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              activeTab === "tickets"
                ? "bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            🎟️ Tickets
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
              activeTab === "schedule"
                ? "bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            📅 Schedule
          </button>
          {purchasedTicket && (
            <button
              onClick={() => setActiveTab("pass")}
              className={`flex-1 rounded-xl py-2 text-xs font-semibold transition-all ${
                activeTab === "pass"
                  ? "bg-green-500 text-white shadow-[0_0_20px_rgba(74,222,128,0.5)]"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              🎓 Pass
            </button>
          )}
        </div>

        {/* Explore Tab: Interactive ScrollGlobe */}
        {activeTab === "explore" && (
          <div className="relative">
            <Hero />
            <StatsBar />
            <div className="mx-auto max-w-6xl px-6">
              <StellarBanner />
            </div>
            <ScrollGlobe sections={landingGlobeSections} />
            <div id="tickets-section" className="pt-8">
              <TicketGrid
                connected={effectiveConnected}
                publicKey={displayAddress}
                onConnectPrompt={handleConnectToggle}
                onSuccess={handleTicketPurchased}
              />
            </div>
            <div id="agenda-section" className="pt-8">
              <ScheduleSection />
            </div>
          </div>
        )}

        {/* Tickets Tab */}
        {activeTab === "tickets" && (
          <div className="pt-6">
            <StatsBar />
            <div className="mx-auto max-w-6xl px-6">
              <StellarBanner />
            </div>
            <TicketGrid
              connected={effectiveConnected}
              publicKey={displayAddress}
              onConnectPrompt={handleConnectToggle}
              onSuccess={handleTicketPurchased}
            />
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="pt-6">
            <ScheduleSection />
          </div>
        )}

        {/* Ticket Pass Tab */}
        {activeTab === "pass" && purchasedTicket && (
          <section className="mx-auto max-w-4xl px-6 py-12 animate-in fade-in duration-300">
            <div className="mb-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-bold text-green-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                TRANSACTION CONFIRMED ON STELLAR TESTNET
              </div>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Your Digital Ticket Pass
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                Your Web3 ticket pass has been verified on Stellar. Click handle to customize your badge.
              </p>
            </div>

            {/* Digital Ticket Pass Component */}
            <DigitalTicketPass
              tierName={purchasedTicket.tierName}
              priceXlm={purchasedTicket.priceXlm}
              userPublicKey={userKeyForPass}
              transactionHash={purchasedTicket.hash}
              timestamp={purchasedTicket.timestamp}
            />

            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setActiveTab("tickets")}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-semibold text-foreground/70 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-foreground active:scale-95"
              >
                <span>Reserve Another Ticket</span>
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t border-white/[0.06] bg-black/40 py-10 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-xs text-foreground/40 sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <StellarIcon className="h-4 w-4 text-accent" />
            <span className="font-semibold text-foreground/70">Powered by Stellar Network &amp; Soroban Smart Contracts</span>
          </div>
          <p>© 2026 DEV CON • All Rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}
