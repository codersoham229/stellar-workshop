"use client";

import { useState } from "react";

interface TalkSession {
  id: string;
  time: string;
  title: string;
  speaker: string;
  role: string;
  track: "Keynote" | "Soroban" | "DeFi" | "Security";
  isLive?: boolean;
}

const SCHEDULE_DATA: Record<number, TalkSession[]> = {
  1: [
    {
      id: "s1",
      time: "09:00 - 10:00 UTC",
      title: "Opening Keynote: The Future of Soroban & Stellar Ecosystem",
      speaker: "Denelle Dixon",
      role: "CEO & Executive Director, SDF",
      track: "Keynote",
      isLive: true,
    },
    {
      id: "s2",
      time: "10:30 - 11:30 UTC",
      title: "Building Scalable Smart Contracts with Rust & Soroban SDK v22",
      speaker: "Tomer Weller",
      role: "VP of Product, Stellar Development Foundation",
      track: "Soroban",
    },
    {
      id: "s3",
      time: "13:00 - 14:30 UTC",
      title: "Decentralized Liquidity & Automated Market Makers on Stellar",
      speaker: "Elena Rostova",
      role: "Lead Architect, Phoenix DEX",
      track: "DeFi",
    },
  ],
  2: [
    {
      id: "s4",
      time: "09:30 - 11:00 UTC",
      title: "Soroban Smart Contract Security & Formal Verification",
      speaker: "Dr. Marcus Vance",
      role: "Head of Audit, CertiK Web3 Lab",
      track: "Security",
    },
    {
      id: "s5",
      time: "11:30 - 13:00 UTC",
      title: "Cross-Chain Asset Bridges & Stellar Anchor Protocol Implementation",
      speaker: "Sarah Chen",
      role: "Principal Engineer, Stellar Anchor Net",
      track: "Soroban",
    },
    {
      id: "s6",
      time: "14:00 - 15:30 UTC",
      title: "Zero-Knowledge Proofs & Privacy Primitives on Soroban",
      speaker: "Kaelen Vance",
      role: "Cryptography Research Lead",
      track: "Keynote",
    },
  ],
  3: [
    {
      id: "s7",
      time: "10:00 - 12:00 UTC",
      title: "Global Hackathon Showcase & Live Demo Judging",
      speaker: "Community Panel",
      role: "Stellar Community Fund Committee",
      track: "Keynote",
    },
    {
      id: "s8",
      time: "13:00 - 15:00 UTC",
      title: "Closing Ceremony & $100K Soroban Grant Awards",
      speaker: "DEV CON Organizers",
      role: "DEV CON 2026 Core Team",
      track: "Keynote",
    },
  ],
};

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [selectedTrack, setSelectedTrack] = useState<string>("All");

  const sessions = SCHEDULE_DATA[activeDay] || [];
  const filteredSessions =
    selectedTrack === "All"
      ? sessions
      : sessions.filter((s) => s.track === selectedTrack);

  return (
    <section className="relative mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Conference Agenda &amp; Speakers
        </h2>
        <p className="mt-2 text-sm text-foreground/50">
          3 days of keynotes, hands-on workshops, and developer showcases.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {[
          { day: 1, label: "Day 1: Keynote & Core" },
          { day: 2, label: "Day 2: Soroban & Security" },
          { day: 3, label: "Day 3: Hackathon Showcase" },
        ].map((item) => (
          <button
            key={item.day}
            onClick={() => setActiveDay(item.day)}
            className={`rounded-2xl px-5 py-2.5 text-xs font-semibold transition-all ${
              activeDay === item.day
                ? "bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                : "border border-white/10 bg-white/5 text-foreground/70 hover:border-white/20 hover:text-foreground"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Track Filter */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        {["All", "Keynote", "Soroban", "DeFi", "Security"].map((track) => (
          <button
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`rounded-full px-3.5 py-1 text-[11px] font-medium transition-colors ${
              selectedTrack === track
                ? "bg-white/20 text-white"
                : "text-foreground/40 hover:text-foreground/80"
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-md transition-all hover:border-accent/40 hover:bg-white/[0.04] sm:flex-row sm:items-center"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-accent">
                  {session.time}
                </span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-foreground/60">
                  {session.track}
                </span>
                {session.isLive && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-bold text-green-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                    LIVE NOW
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-lg font-bold text-foreground/90">
                {session.title}
              </h3>

              <p className="mt-1 text-xs text-foreground/50">
                <span className="font-semibold text-foreground/80">{session.speaker}</span> — {session.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
