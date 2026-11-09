"use client";

import { Participant } from "@/types";
import { CheckCircle2, ShieldAlert, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface BibBadgeProps {
  participant: Participant;
}

export function BibBadge({ participant }: BibBadgeProps) {
  const is10k = participant.raceCategoryId === "rc-10k";

  return (
    <div className="relative w-full max-w-xs rounded-2xl border-2 border-white/20 bg-gradient-to-b from-slate-900 to-black p-5 shadow-2xl text-center overflow-hidden">
      {/* Top Punch Holes */}
      <div className="flex justify-between items-center px-4 mb-2">
        <div className="w-3.5 h-3.5 rounded-full bg-background border border-white/30 shadow-inner" />
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-gold">
          Winners Marathon Challenge
        </div>
        <div className="w-3.5 h-3.5 rounded-full bg-background border border-white/30 shadow-inner" />
      </div>

      {/* Division Banner */}
      <div className={cn(
        "py-1 px-3 rounded-md text-[11px] font-bold uppercase tracking-wider mb-3 text-white inline-block shadow-sm",
        is10k ? "bg-amber-600" : "bg-emerald-600"
      )}>
        {participant.raceCategoryName || (is10k ? "10K Elite" : "5K Fun Run")}
      </div>

      {/* Bib Number */}
      <div className="py-2">
        <span className="font-mono text-6xl font-black tracking-tight text-white drop-shadow-md">
          {participant.bibNumber || "---"}
        </span>
      </div>

      {/* Runner Name & Institution */}
      <div className="border-t border-white/10 pt-3 space-y-1">
        <h4 className="font-bold text-base text-white truncate">
          {participant.fullName}
        </h4>
        <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-2">
          <span>{participant.matricNumber || "Guest Runner"}</span>
          <span>•</span>
          <span>Size: {participant.tShirtSize}</span>
        </div>
      </div>

      {/* Check-In Status */}
      <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5">
          {participant.checkInStatus ? (
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Checked In
            </span>
          ) : (
            <span className="text-amber-400 flex items-center gap-1 font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" /> Pending Check-in
            </span>
          )}
        </div>
        <span className="text-[10px] text-white/50">SDU Ozoro 2026</span>
      </div>
    </div>
  );
}
