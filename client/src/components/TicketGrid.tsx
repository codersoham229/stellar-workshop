"use client";

import { useState } from "react";

type TicketTier = "general" | "vip";

interface TicketCardProps {
  tier: TicketTier;
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
  loading: boolean;
  reserved: boolean;
  onReserve: () => void;
}

function TicketCard({
  tier,
  name,
  price,
  priceNote,
  features,
  popular,
  loading,
  reserved,
  onReserve,
}: TicketCardProps) {
  const isPopular = popular ?? false;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
        isPopular
          ? "border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent shadow-[0_0_40px_-10px_rgba(139,92,246,0.15)]"
          : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_16px_rgba(139,92,246,0.5)]">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground/90">{name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-bold text-foreground">{price}</span>
          <span className="text-sm text-foreground/40">{priceNote}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-6 h-px bg-white/[0.06]" />

      {/* Features */}
      <ul className="mb-8 flex flex-1 flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-foreground/60">
            <svg
              className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                isPopular ? "text-accent" : "text-foreground/30"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Reserve Button */}
      <button
        onClick={onReserve}
        disabled={loading || reserved}
        className={`relative flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 ${
          reserved
            ? "cursor-default border border-green-500/20 bg-green-500/10 text-green-400"
            : isPopular
              ? "bg-accent text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.5)] hover:bg-accent/90 hover:shadow-[0_0_32px_-2px_rgba(139,92,246,0.6)] active:scale-[0.98]"
              : "border border-white/[0.1] bg-white/[0.05] text-foreground/90 hover:border-white/[0.2] hover:bg-white/[0.08] active:scale-[0.98]"
        } disabled:opacity-50`}
      >
        {loading ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Reserving...</span>
          </>
        ) : reserved ? (
          <>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Ticket Reserved</span>
          </>
        ) : (
          <span>Reserve Ticket</span>
        )}
      </button>
    </div>
  );
}

interface TicketGridProps {
  connected: boolean;
}

export default function TicketGrid({ connected }: TicketGridProps) {
  const [states, setStates] = useState<
    Record<TicketTier, { loading: boolean; reserved: boolean }>
  >({
    general: { loading: false, reserved: false },
    vip: { loading: false, reserved: false },
  });

  const handleReserve = (tier: TicketTier) => {
    if (!connected || states[tier].loading || states[tier].reserved) return;

    setStates((prev) => ({
      ...prev,
      [tier]: { ...prev[tier], loading: true },
    }));

    // Simulate reservation delay
    setTimeout(() => {
      setStates((prev) => ({
        ...prev,
        [tier]: { loading: false, reserved: true },
      }));
    }, 2000);
  };

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Choose Your Experience
        </h2>
        <p className="mt-3 text-foreground/40">
          Secure your spot on-chain with Stellar
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
        <TicketCard
          tier="general"
          name="General Admission"
          price="5"
          priceNote="XLM"
          features={[
            "Access to all main stage talks",
            "Live Q&A participation",
            "Workshop recordings (30 days)",
            "Digital swag bag",
            "Community Discord access",
          ]}
          loading={states.general.loading}
          reserved={states.general.reserved}
          onReserve={() => handleReserve("general")}
        />
        <TicketCard
          tier="vip"
          name="VIP Pass"
          price="15"
          priceNote="XLM"
          popular
          features={[
            "Everything in General Admission",
            "Exclusive hands-on workshops",
            "VIP networking lounge access",
            "Speaker meet & greet sessions",
            "Lifetime workshop recordings",
            "Limited edition NFT badge",
          ]}
          loading={states.vip.loading}
          reserved={states.vip.reserved}
          onReserve={() => handleReserve("vip")}
        />
      </div>

      {!connected && (
        <p className="mt-8 text-center text-sm text-foreground/30">
          Connect your wallet to reserve a ticket
        </p>
      )}
    </section>
  );
}
