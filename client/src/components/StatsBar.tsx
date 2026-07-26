"use client";

import { useState, useEffect } from "react";

export default function StatsBar() {
  const [ticketsSold, setTicketsSold] = useState(858);
  const [xlmRaised, setXlmRaised] = useState(6420);

  // Simulate real-time live purchase activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setTicketsSold((prev) => prev + 1);
        setXlmRaised((prev) => prev + (Math.random() > 0.5 ? 15 : 5));
      }
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-y border-white/[0.08] bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-around gap-6 px-6 py-4 text-center">
        {/* Stat 1 */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-3-12h15a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 15V8.25A2.25 2.25 0 014.5 6z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-mono text-lg font-extrabold text-foreground tabular-nums">
              {ticketsSold.toLocaleString()}
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Tickets Issued On-Chain
            </div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-mono text-lg font-extrabold text-foreground tabular-nums">
              {xlmRaised.toLocaleString()} XLM
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Volume Processed
            </div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-mono text-lg font-extrabold text-green-400 tabular-nums">
              ~1.2s
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Avg Finality Latency
            </div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-mono text-lg font-extrabold text-foreground">
              Soroban v22
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Smart Contract Engine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
