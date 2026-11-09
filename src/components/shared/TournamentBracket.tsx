"use client";

import { Match, Team } from "@/types";
import { Trophy, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TournamentBracketProps {
  matches: Match[];
  teams: Team[];
}

export function TournamentBracket({ matches, teams }: TournamentBracketProps) {
  const getTeam = (teamId?: string) => teams.find((t) => t.id === teamId);

  // Group matches by round
  const r16Matches = matches.filter((m) => m.round === "round_of_16");
  const qfMatches = matches.filter((m) => m.round === "quarter_finals");
  const sfMatches = matches.filter((m) => m.round === "semi_finals");
  const finalMatch = matches.find((m) => m.round === "final");
  const thirdPlaceMatch = matches.find((m) => m.round === "third_place");

  const renderMatchCard = (match?: Match, label?: string) => {
    if (!match) {
      return (
        <div className="w-56 p-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] text-xs text-muted-foreground flex items-center justify-center">
          Match TBD
        </div>
      );
    }

    const teamA = getTeam(match.teamAId);
    const teamB = getTeam(match.teamBId);
    const isCompleted = match.status === "completed";
    const teamAWon = match.winnerTeamId && match.winnerTeamId === match.teamAId;
    const teamBWon = match.winnerTeamId && match.winnerTeamId === match.teamBId;

    return (
      <div className="w-60 rounded-xl border border-white/10 bg-card/90 shadow-lg shadow-black/40 overflow-hidden text-xs transition-all hover:border-brand-gold/40 hover:shadow-amber-500/10">
        <div className="px-3 py-1.5 bg-white/5 border-b border-white/10 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span className="font-semibold text-white/90">
            {label || `M#${match.matchNumber}`}
          </span>
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded uppercase font-bold",
            isCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          )}>
            {isCompleted ? "Finished" : match.status}
          </span>
        </div>

        {/* Team A */}
        <div className={cn(
          "px-3 py-2 flex items-center justify-between border-b border-white/5 transition-colors",
          teamAWon ? "bg-amber-500/10 font-bold text-white" : "text-muted-foreground"
        )}>
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/20" />
            <span className="truncate">{teamA ? teamA.name : "Winner TBD"}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {match.isPenaltyShootout && match.scoreAPenalties !== undefined && (
              <span className="text-[10px] text-amber-400/80 font-mono">({match.scoreAPenalties}p)</span>
            )}
            <span className={cn("font-mono font-bold text-sm", teamAWon ? "text-brand-gold" : "text-white/80")}>
              {match.status === "scheduled" ? "-" : match.scoreA}
            </span>
            {teamAWon && <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />}
          </div>
        </div>

        {/* Team B */}
        <div className={cn(
          "px-3 py-2 flex items-center justify-between transition-colors",
          teamBWon ? "bg-amber-500/10 font-bold text-white" : "text-muted-foreground"
        )}>
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="w-2 h-2 rounded-full flex-shrink-0 bg-white/20" />
            <span className="truncate">{teamB ? teamB.name : "Winner TBD"}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {match.isPenaltyShootout && match.scoreBPenalties !== undefined && (
              <span className="text-[10px] text-amber-400/80 font-mono">({match.scoreBPenalties}p)</span>
            )}
            <span className={cn("font-mono font-bold text-sm", teamBWon ? "text-brand-gold" : "text-white/80")}>
              {match.status === "scheduled" ? "-" : match.scoreB}
            </span>
            {teamBWon && <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-brand-gold" />
            <span>16-Team Single Elimination Bracket</span>
          </h3>
          <p className="text-xs text-muted-foreground">
            Monkey Post 5-a-side Knockout tree at Southern Delta University, Ozoro
          </p>
        </div>
        <div className="text-xs bg-amber-500/10 text-amber-300 px-3 py-1.5 rounded-lg border border-amber-500/20 font-medium hidden sm:block">
          ₦80,000 Total Prize Pool
        </div>
      </div>

      {/* Bracket Tree (Scrollable on mobile) */}
      <div className="overflow-x-auto pb-6 pt-2">
        <div className="min-w-[1100px] flex items-center justify-between gap-6">
          {/* Column 1: Round of 16 */}
          <div className="flex flex-col gap-5 w-60">
            <div className="text-xs uppercase tracking-wider font-bold text-brand-gold/90 text-center pb-2 border-b border-brand-gold/20">
              Round of 16 (8 Matches)
            </div>
            {r16Matches.map((m, idx) => (
              <div key={m.id}>
                {renderMatchCard(m, `Match ${idx + 1}`)}
              </div>
            ))}
          </div>

          {/* Column 2: Quarter-Finals */}
          <div className="flex flex-col justify-around gap-16 w-60">
            <div className="text-xs uppercase tracking-wider font-bold text-white text-center pb-2 border-b border-white/20">
              Quarter-Finals (4 Matches)
            </div>
            {qfMatches.map((m, idx) => (
              <div key={m.id}>
                {renderMatchCard(m, `Quarter-Final ${idx + 1}`)}
              </div>
            ))}
          </div>

          {/* Column 3: Semi-Finals */}
          <div className="flex flex-col justify-around gap-40 w-60">
            <div className="text-xs uppercase tracking-wider font-bold text-white text-center pb-2 border-b border-white/20">
              Semi-Finals (2 Matches)
            </div>
            {sfMatches.map((m, idx) => (
              <div key={m.id}>
                {renderMatchCard(m, `Semi-Final ${idx + 1}`)}
              </div>
            ))}
          </div>

          {/* Column 4: Grand Final & 3rd Place */}
          <div className="flex flex-col justify-center gap-10 w-64">
            <div className="p-4 rounded-2xl border-2 border-brand-gold bg-gradient-to-b from-amber-500/15 via-black/40 to-black/60 shadow-xl shadow-amber-500/10 space-y-3">
              <div className="flex items-center justify-center gap-2 text-brand-gold font-extrabold text-xs uppercase tracking-widest text-center">
                <Trophy className="w-4 h-4" />
                <span>Grand Final (₦50,000)</span>
              </div>
              {renderMatchCard(finalMatch, "Championship Final")}
              <div className="text-[11px] text-center text-muted-foreground pt-1">
                Runner-up receives ₦20,000
              </div>
            </div>

            {/* 3rd Place Playoff */}
            <div className="p-3.5 rounded-xl border border-white/15 bg-white/[0.02] space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-200/80 text-center">
                3rd Place Playoff (₦10,000)
              </div>
              {renderMatchCard(thirdPlaceMatch, "3rd Place Match")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
