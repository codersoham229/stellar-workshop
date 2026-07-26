"use client";

import { useState, useEffect } from "react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function calcTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] font-mono text-2xl font-bold text-foreground tabular-nums sm:h-20 sm:w-20 sm:text-3xl">
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground/40">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  // Conference date: November 15, 2026
  const conferenceDate = new Date("2026-11-15T09:00:00Z");
  const timeLeft = useCountdown(conferenceDate);

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-accent/[0.07] blur-[120px]" />
        <div className="absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-24 sm:pt-32">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.08] px-4 py-1.5 text-xs font-medium text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Live on Stellar Testnet
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          <span className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            DEV CON
          </span>{" "}
          <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
            2026
          </span>
        </h1>

        {/* Taglines */}
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-center text-lg text-foreground/50 sm:text-xl">
            The Premier Virtual Developer Conference on Stellar
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/30">
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              November 15–17, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              Virtual — Global Access
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              40+ Speakers &amp; Workshops
            </span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="mt-14 flex justify-center">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-foreground/30">
              Conference starts in
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <TimerUnit value={timeLeft.days} label="Days" />
              <span className="mt-[-20px] text-2xl font-bold text-foreground/20">:</span>
              <TimerUnit value={timeLeft.hours} label="Hours" />
              <span className="mt-[-20px] text-2xl font-bold text-foreground/20">:</span>
              <TimerUnit value={timeLeft.minutes} label="Min" />
              <span className="mt-[-20px] text-2xl font-bold text-foreground/20">:</span>
              <TimerUnit value={timeLeft.seconds} label="Sec" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
