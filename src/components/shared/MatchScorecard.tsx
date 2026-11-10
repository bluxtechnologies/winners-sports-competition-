"use client";

import { Match } from "@/types";
import { 
  Clock, 
  MapPin, 
  Video, 
  CheckCircle, 
  AlertTriangle
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
    <div className="rounded-[6px] border border-border bg-card p-4 space-y-3 shadow-subtle">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground uppercase tracking-wider bg-muted px-2 py-0.5 rounded-[6px] border border-border text-[11px]">
            {getRoundLabel(match.round)}
          </span>
          <span className="font-medium text-muted-foreground">Match #{match.matchNumber}</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
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
      <div className="grid grid-cols-1 sm:grid-cols-7 items-center gap-3 py-1">
        {/* Team A */}
        <div className={cn(
          "sm:col-span-3 flex items-center justify-between sm:justify-start gap-2.5 p-2.5 rounded-[6px] border transition-colors",
          teamAWon 
            ? "border-primary/40 bg-primary/5 text-foreground font-semibold" 
            : "border-border bg-muted/20 text-muted-foreground"
        )}>
          <div className="flex items-center gap-2 truncate">
            <div className="w-6 h-6 rounded-[6px] bg-muted flex items-center justify-center font-bold text-[11px] text-foreground border border-border">
              {match.teamA?.shortCode || "A"}
            </div>
            <span className="text-xs font-medium text-foreground truncate">
              {match.teamA?.name || "Team A (TBD)"}
            </span>
          </div>
          {teamAWon && (
            <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded-[6px] border border-primary/20">
              Winner
            </span>
          )}
        </div>

        {/* Score Display */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 font-mono text-xl font-bold tracking-tight text-foreground">
            <span className={cn(teamAWon && "text-primary")}>{match.status === "scheduled" ? "-" : match.scoreA}</span>
            <span className="text-muted-foreground text-xs">:</span>
            <span className={cn(teamBWon && "text-primary")}>{match.status === "scheduled" ? "-" : match.scoreB}</span>
          </div>
          {match.isPenaltyShootout && (
            <div className="text-[10px] text-muted-foreground font-mono">
              Pen: {match.scoreAPenalties}-{match.scoreBPenalties}
            </div>
          )}
          {match.status !== "scheduled" && (
            <span className="text-[10px] uppercase font-medium text-muted-foreground mt-0.5">
              {match.status}
            </span>
          )}
        </div>

        {/* Team B */}
        <div className={cn(
          "sm:col-span-3 flex items-center justify-between sm:justify-end gap-2.5 p-2.5 rounded-[6px] border transition-colors",
          teamBWon 
            ? "border-primary/40 bg-primary/5 text-foreground font-semibold" 
            : "border-border bg-muted/20 text-muted-foreground"
        )}>
          {teamBWon && (
            <span className="text-[10px] font-bold uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded-[6px] border border-primary/20 order-last sm:order-first">
              Winner
            </span>
          )}
          <div className="flex items-center gap-2 truncate justify-end">
            <span className="text-xs font-medium text-foreground truncate">
              {match.teamB?.name || "Team B (TBD)"}
            </span>
            <div className="w-6 h-6 rounded-[6px] bg-muted flex items-center justify-center font-bold text-[11px] text-foreground border border-border">
              {match.teamB?.shortCode || "B"}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Events / Officiating Notes */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          {yellowCards.length > 0 && (
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
              <span className="w-2.5 h-3.5 bg-amber-500 rounded-[2px] inline-block" />
              {yellowCards.length} Yellow
            </span>
          )}
          {redCards.length > 0 && (
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
              <span className="w-2.5 h-3.5 bg-red-600 rounded-[2px] inline-block" />
              {redCards.length} Red
            </span>
          )}
          {varReviews.length > 0 && (
            <span className="flex items-center gap-1 text-primary font-medium">
              <Video className="w-3 h-3" />
              {varReviews.length} Phone Review
            </span>
          )}
          {yellowCards.length === 0 && redCards.length === 0 && (
            <span className="text-muted-foreground">Clean Match (0 Disciplinary Fines)</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {match.refereeName && (
            <span>Ref: <strong className="text-foreground font-medium">{match.refereeName}</strong></span>
          )}
          {onOpenReport && (
            <button
              onClick={() => onOpenReport(match)}
              className="text-primary hover:underline font-medium text-[11px] ml-1"
            >
              Match Report
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
