"use client";

import { Match } from "@/types";
import { 
  Trophy, 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle, 
  AlertTriangle,
  UserCheck
} from "lucide-react";
import { formatDateTime, getRoundLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface MatchScorecardProps {
  match: Match;
  onOpenReport?: (match: Match) => void;
}

export function MatchScorecard({ match, onOpenReport }: MatchScorecardProps) {
  const isCompleted = match.status === "completed";
  const teamAWon = match.winnerTeamId === match.teamAId;
  const teamBWon = match.winnerTeamId === match.teamBId;

  const yellowCards = match.events?.filter((e) => e.eventType === "yellow_card") || [];
  const redCards = match.events?.filter((e) => e.eventType === "red_card") || [];
  const varReviews = match.events?.filter((e) => e.eventType === "var_review") || [];

  return (
    <div className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-5 space-y-4 hover:border-brand-gold/30 transition-all shadow-md">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-brand-gold uppercase tracking-wider bg-brand-gold/10 px-2.5 py-0.5 rounded-md border border-brand-gold/20">
            {getRoundLabel(match.round)}
          </span>
          <span>Match #{match.matchNumber}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{formatDateTime(match.scheduledTime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{match.pitchLocation}</span>
          </div>
        </div>
      </div>

      {/* Teams & Scoreboard */}
      <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-4 py-2">
        {/* Team A */}
        <div className={cn(
          "sm:col-span-3 flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl border transition-colors",
          teamAWon 
            ? "border-brand-gold/40 bg-brand-gold/10 text-white font-bold" 
            : "border-white/5 bg-white/[0.02] text-muted-foreground"
        )}>
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">
              {match.teamA?.shortCode || "A"}
            </div>
            <span className="text-sm font-semibold text-white truncate">
              {match.teamA?.name || "Team A (TBD)"}
            </span>
          </div>
          {teamAWon && (
            <span className="text-[10px] font-bold uppercase text-brand-gold bg-black/40 px-2 py-0.5 rounded border border-brand-gold/30">
              Winner
            </span>
          )}
        </div>

        {/* Score Display */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-2 font-mono text-2xl font-extrabold tracking-tight text-white">
            <span className={cn(teamAWon && "text-brand-gold")}>{match.status === "scheduled" ? "-" : match.scoreA}</span>
            <span className="text-muted-foreground text-sm">:</span>
            <span className={cn(teamBWon && "text-brand-gold")}>{match.status === "scheduled" ? "-" : match.scoreB}</span>
          </div>
          {match.isPenaltyShootout && (
            <span className="text-[11px] text-amber-300 font-mono font-medium">
              Penalties: {match.scoreAPenalties} - {match.scoreBPenalties}
            </span>
          )}
          {match.isExtraTime && !match.isPenaltyShootout && (
            <span className="text-[10px] text-muted-foreground uppercase font-bold">
              After Extra Time
            </span>
          )}
        </div>

        {/* Team B */}
        <div className={cn(
          "sm:col-span-3 flex items-center justify-between sm:justify-end gap-3 p-3 rounded-xl border transition-colors",
          teamBWon 
            ? "border-brand-gold/40 bg-brand-gold/10 text-white font-bold" 
            : "border-white/5 bg-white/[0.02] text-muted-foreground"
        )}>
          {teamBWon && (
            <span className="text-[10px] font-bold uppercase text-brand-gold bg-black/40 px-2 py-0.5 rounded border border-brand-gold/30">
              Winner
            </span>
          )}
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-sm font-semibold text-white truncate">
              {match.teamB?.name || "Team B (TBD)"}
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold text-xs text-white">
              {match.teamB?.shortCode || "B"}
            </div>
          </div>
        </div>
      </div>

      {/* Disciplinary & Video Review Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-2 border-t border-white/5">
        <div className="flex flex-wrap items-center gap-2">
          {yellowCards.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[11px]">
              <span className="w-2.5 h-3.5 bg-amber-400 rounded-sm inline-block shadow-sm" />
              <span>{yellowCards.length} Yellow (₦{yellowCards.length * 1000} Fine)</span>
            </span>
          )}
          {redCards.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 border border-red-500/20 text-[11px] font-semibold">
              <span className="w-2.5 h-3.5 bg-red-500 rounded-sm inline-block shadow-sm" />
              <span>{redCards.length} Red (₦{redCards.length * 3000} Fine + Suspension)</span>
            </span>
          )}
          {varReviews.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px]">
              <Video className="w-3.5 h-3.5" />
              <span>Phone Video Review Appealed</span>
            </span>
          )}
        </div>

        {/* Officials */}
        <div className="text-[11px] text-muted-foreground flex items-center gap-3">
          {match.refereeName && (
            <span className="flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-white/60" />
              <span>Ref: {match.refereeName}</span>
            </span>
          )}
          {match.phoneOperatorName && (
            <span className="flex items-center gap-1">
              <Video className="w-3 h-3 text-brand-emerald" />
              <span>Camera: {match.phoneOperatorName}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
