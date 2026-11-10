"use client";

import { Participant } from "@/types";
import { CheckCircle2, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface BibBadgeProps {
  participant: Participant;
}

export function BibBadge({ participant }: BibBadgeProps) {
  const is10k = participant.raceCategoryId === "rc-10k";

  return (
    <div className="relative w-full max-w-xs rounded-[6px] border border-border bg-card p-5 text-center shadow-subtle">
      {/* Top Header */}
      <div className="flex justify-between items-center pb-3 border-b border-border">
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Southern Delta University, Ozoro
        </div>
        <div className="text-[10px] font-semibold text-primary uppercase">
          WMC 2026
        </div>
      </div>

      {/* Division Badge */}
      <div className="pt-3">
        <span className={cn(
          "py-0.5 px-2.5 rounded-[6px] text-[11px] font-semibold uppercase tracking-wider inline-block border",
          is10k 
            ? "bg-primary/10 text-primary border-primary/20" 
            : "bg-muted text-foreground border-border"
        )}>
          {participant.raceCategoryName || (is10k ? "10K Elite" : "5K Fun Run")}
        </span>
      </div>

      {/* Bib Number */}
      <div className="py-4">
        <span className="font-mono text-5xl font-bold tracking-tight text-foreground">
          {participant.bibNumber || "---"}
        </span>
      </div>

      {/* Runner Name & Details */}
      <div className="border-t border-border pt-3 space-y-1">
        <h4 className="font-semibold text-sm text-foreground truncate">
          {participant.fullName}
        </h4>
        <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-2">
          <span>Gender: {participant.gender.toUpperCase()}</span>
          <span>•</span>
          <span>T-Shirt: {participant.tShirtSize}</span>
        </div>
      </div>

      {/* Check-In Status */}
      <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5">
          {participant.checkInStatus ? (
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Checked In
            </span>
          ) : (
            <span className="text-muted-foreground flex items-center gap-1 font-medium">
              Awaiting Race Day Check-In
            </span>
          )}
        </div>
        <div className="text-[10px] text-muted-foreground font-mono">
          REF: {participant.registrationId}
        </div>
      </div>
    </div>
  );
}
