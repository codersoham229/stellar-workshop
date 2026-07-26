"use client";

import { useState, useCallback, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export interface DigitalTicketPassProps {
  /** Ticket Tier Name (e.g., "VIP Pass" or "General Admission") */
  tierName: string;
  /** Price in XLM */
  priceXlm?: number | string;
  /** Purchaser's Stellar Public Key (G-address) */
  userPublicKey: string;
  /** Stellar Transaction Hash from Horizon submit */
  transactionHash: string;
  /** Purchase ISO timestamp or formatted string */
  timestamp?: string;
  /** Optional callback to close or dismiss the pass */
  onClose?: () => void;
}

export default function DigitalTicketPass({
  tierName,
  priceXlm,
  userPublicKey,
  transactionHash,
  timestamp,
  onClose,
}: DigitalTicketPassProps) {
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [holderHandle, setHolderHandle] = useState("@dev_builder");
  const [isEditingHandle, setIsEditingHandle] = useState(false);

  const ticketRef = useRef<HTMLDivElement>(null);

  // Format date/time
  const formattedTimestamp = timestamp
    ? new Date(timestamp).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      })
    : new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });

  // Truncate helper
  const truncate = (str: string, lead = 6, tail = 6) => {
    if (!str) return "";
    if (str.length <= lead + tail) return str;
    return `${str.slice(0, lead)}...${str.slice(-tail)}`;
  };

  // Trigger floating confirmation toast
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // Copy transaction hash to clipboard
  const handleCopyHash = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(transactionHash);
      triggerToast("Transaction Hash copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy hash:", err);
    }
  }, [transactionHash]);

  // Print/Save Pass
  const handlePrintPass = useCallback(() => {
    window.print();
  }, []);

  const stellarExpertUrl = `https://stellar.expert/explorer/testnet/tx/${transactionHash}`;

  return (
    <div className="relative mx-auto w-full max-w-md p-4">
      {/* Confirmation Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-green-500/30 bg-slate-900/95 px-4 py-2 text-xs font-semibold text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.3)] backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-200">
          <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Futuristic Ticket Pass Container */}
      <div
        ref={ticketRef}
        className="relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_0_60px_-10px_rgba(139,92,246,0.3)]"
      >
        {/* Decorative Side Notches */}
        <div className="absolute -left-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-accent/30 bg-background shadow-inner" />
        <div className="absolute -right-4 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full border border-accent/30 bg-background shadow-inner" />

        {/* Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/20 text-accent">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-12v.75m0 3v.75m0 3v.75m0 3V18m-3-12h15a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 15V8.25A2.25 2.25 0 014.5 6z" />
              </svg>
            </div>
            <span className="font-mono text-xs font-bold tracking-widest text-foreground/80 uppercase">
              DEV CON 2026 • OFFICIAL PASS
            </span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-1 text-foreground/40 transition-colors hover:bg-white/10 hover:text-foreground"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Status Pill */}
        <div className="relative z-10 my-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3.5 py-1 text-[11px] font-semibold text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            VERIFIED ON STELLAR TESTNET
          </div>
        </div>

        {/* Ticket Main Details */}
        <div className="relative z-10 my-4 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
            Ticket Tier
          </span>
          <h2 className="mt-1 text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-purple-200 to-accent bg-clip-text text-transparent sm:text-4xl">
            {tierName}
          </h2>

          {/* Customizable Attendee Handle */}
          <div className="mt-2 flex items-center justify-center gap-1 text-xs">
            <span className="text-foreground/40">Holder:</span>
            {isEditingHandle ? (
              <input
                type="text"
                value={holderHandle}
                onChange={(e) => setHolderHandle(e.target.value)}
                onBlur={() => setIsEditingHandle(false)}
                onKeyDown={(e) => e.key === "Enter" && setIsEditingHandle(false)}
                autoFocus
                className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs font-semibold text-accent outline-none focus:ring-1 focus:ring-accent"
              />
            ) : (
              <button
                onClick={() => setIsEditingHandle(true)}
                className="font-mono font-semibold text-accent underline decoration-dashed underline-offset-4 hover:text-white"
                title="Click to edit handle"
              >
                {holderHandle} ✎
              </button>
            )}
          </div>

          {priceXlm && (
            <p className="mt-1 font-mono text-xs text-foreground/60">
              Paid: <span className="font-bold text-foreground">{priceXlm} XLM</span>{" "}
              <span className="text-accent font-semibold">(~${(Number(priceXlm) * 0.12).toFixed(2)} USD)</span>
            </p>
          )}

        </div>

        {/* Metadata Grid */}
        <div className="relative z-10 my-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-md">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Stellar Address
            </span>
            <span className="mt-0.5 block font-mono text-xs font-medium text-foreground/90">
              {truncate(userPublicKey, 6, 6)}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Issued Date
            </span>
            <span className="mt-0.5 block font-mono text-xs font-medium text-foreground/90 truncate">
              {formattedTimestamp}
            </span>
          </div>

          <div className="col-span-2 border-t border-white/[0.06] pt-2.5">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
              Transaction Hash
            </span>
            <span className="mt-0.5 block font-mono text-xs font-medium text-accent truncate">
              {transactionHash}
            </span>
          </div>
        </div>

        {/* Dashed Cut-Out Stub Divider */}
        <div className="relative z-10 my-6 flex items-center justify-between">
          <div className="h-px flex-1 border-b border-dashed border-white/20" />
          <span className="px-3 font-mono text-[9px] uppercase tracking-widest text-foreground/30">
            ENTRY VERIFICATION
          </span>
          <div className="h-px flex-1 border-b border-dashed border-white/20" />
        </div>

        {/* QR Code Section */}
        <div className="relative z-10 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="rounded-xl border border-white/10 bg-white p-3 shadow-lg">
            <QRCodeSVG
              value={stellarExpertUrl}
              size={140}
              bgColor="#ffffff"
              fgColor="#09090b"
              level="M"
            />
          </div>
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/50">
            Scan for Event Check-In
          </span>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 mt-6 grid grid-cols-3 gap-2">
          {/* Copy Hash Button */}
          <button
            onClick={handleCopyHash}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-foreground/90 transition-all hover:border-accent/50 hover:bg-accent/10 active:scale-95"
          >
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.75v-6.75" />
            </svg>
            <span>Copy</span>
          </button>

          {/* Print/Save Pass Button */}
          <button
            onClick={handlePrintPass}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-foreground/90 transition-all hover:border-accent/50 hover:bg-accent/10 active:scale-95"
          >
            <svg className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231a1.125 1.125 0 01-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-19.126 0C1.068 7.441.3 8.376.3 9.456v6.294A2.25 2.25 0 002.55 18h1.091" />
            </svg>
            <span>Print</span>
          </button>

          {/* StellarExpert Explorer Link */}
          <a
            href={stellarExpertUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-xl border border-accent/40 bg-accent/20 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] active:scale-95"
          >
            <span>Explorer</span>
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

