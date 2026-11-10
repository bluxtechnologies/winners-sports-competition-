"use client";

import { Match, Team } from "@/types";
import { Trophy, CheckCircle2 } from "lucide-react";
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
        <div className="w-56 p-3 rounded-[6px] border border-dashed border-border bg-muted/20 text-xs text-muted-foreground flex items-center justify-center">
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
      <div className="w-56 rounded-[6px] border border-border bg-card shadow-subtle overflow-hidden text-xs">
        <div className="px-2.5 py-1.5 bg-muted/40 border-b border-border flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span className="font-semibold text-foreground">
            {label || `M#${match.matchNumber}`}
          </span>
          <span className={cn(
            "text-[10px] px-1.5 py-0.5 rounded-[6px] uppercase font-semibold",
            isCompleted 
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800" 
              : "bg-muted text-muted-foreground border border-border"
          )}>
            {isCompleted ? "Finished" : match.status}
          </span>
        </div>

        {/* Team A */}
        <div className={cn(
          "px-2.5 py-2 flex items-center justify-between border-b border-border/50",
          teamAWon ? "bg-muted/50 font-semibold text-foreground" : "text-muted-foreground"
        )}>
          <div className="flex items-center gap-2 truncate pr-2">
            <span className={cn(
              "w-1.5 h-1.5 rounded-[6px] flex-shrink-0",
              teamAWon ? "bg-primary" : "bg-muted-foreground/40"
            )} />
            <span className="truncate">{teamA ? teamA.name : "Winner TBD"}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {match.isPenaltyShootout && match.scoreAPenalties !== undefined && (
              <span className="text-[10px] text-muted-foreground font-mono">({match.scoreAPenalties}p)</span>
            )}
            <span className={cn("font-mono font-bold text-xs", teamAWon ? "text-primary" : "text-foreground")}>
              {match.status === "scheduled" ? "-" : match.scoreA}
            </span>
            {teamAWon && <CheckCircle2 className="w-3 h-3 text-primary" />}
          </div>
        </div>

        {/* Team B */}
        <div className={cn(
          "px-2.5 py-2 flex items-center justify-between",
          teamBWon ? "bg-muted/50 font-semibold text-foreground" : "text-muted-foreground"
        )}>
          <div className="flex items-center gap-2 truncate pr-2">
            <span className={cn(
              "w-1.5 h-1.5 rounded-[6px] flex-shrink-0",
              teamBWon ? "bg-primary" : "bg-muted-foreground/40"
            )} />
            <span className="truncate">{teamB ? teamB.name : "Winner TBD"}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {match.isPenaltyShootout && match.scoreBPenalties !== undefined && (
              <span className="text-[10px] text-muted-foreground font-mono">({match.scoreBPenalties}p)</span>
            )}
            <span className={cn("font-mono font-bold text-xs", teamBWon ? "text-primary" : "text-foreground")}>
              {match.status === "scheduled" ? "-" : match.scoreB}
            </span>
            {teamBWon && <CheckCircle2 className="w-3 h-3 text-primary" />}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span>16-Team Single Elimination Knockout Bracket</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Round of 16 through to the Championship Final at SDU Sports Complex
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          Official SDU Tournament Draw
        </div>
      </div>

      {/* Bracket Tree Container */}
      <div className="overflow-x-auto pb-6">
        <div className="min-w-[960px] flex items-stretch justify-between gap-6">
          {/* Round of 16 */}
          <div className="flex-1 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              Round of 16 (8 Matches)
            </div>
            <div className="space-y-4 pt-1">
              {r16Matches.slice(0, 8).map((m, idx) => (
                <div key={m.id}>
                  {renderMatchCard(m, `R16 Match #${idx + 1}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Quarter Finals */}
          <div className="flex-1 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              Quarter-Finals (4 Matches)
            </div>
            <div className="space-y-12 pt-6">
              {qfMatches.slice(0, 4).map((m, idx) => (
                <div key={m.id}>
                  {renderMatchCard(m, `QF Match #${idx + 1}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Semi Finals */}
          <div className="flex-1 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              Semi-Finals (2 Matches)
            </div>
            <div className="space-y-32 pt-16">
              {sfMatches.slice(0, 2).map((m, idx) => (
                <div key={m.id}>
                  {renderMatchCard(m, `SF Match #${idx + 1}`)}
                </div>
              ))}
            </div>
          </div>

          {/* Finals & 3rd Place */}
          <div className="flex-1 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border pb-1">
              Championship & 3rd
            </div>
            <div className="space-y-10 pt-20">
              <div>
                <div className="text-[11px] font-semibold text-primary uppercase mb-1">
                  Final (Championship)
                </div>
                {renderMatchCard(finalMatch, "Final")}
              </div>

              {thirdPlaceMatch && (
                <div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase mb-1">
                    3rd Place Playoff
                  </div>
                  {renderMatchCard(thirdPlaceMatch, "3rd Place")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
