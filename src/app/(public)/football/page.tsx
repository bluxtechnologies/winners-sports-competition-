"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  Calendar, 
  FileText, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  UserPlus,
  Copy,
  Check
} from "lucide-react";
import { store } from "@/services/store";
import { TournamentBracket } from "@/components/shared/TournamentBracket";
import { MatchScorecard } from "@/components/shared/MatchScorecard";
import { formatNaira, formatDateTime } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function FootballPage() {
  const [activeTab, setActiveTab] = useState<"bracket" | "fixtures" | "teams" | "rules" | "fines">("bracket");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const event = store.getEventById("e-football-001");
  const teams = store.getTeams("e-football-001");
  const matches = store.getMatches("e-football-001");

  // Dynamic parameters from event
  const maxTeams = event?.maxTeams ?? 16;
  const squadSize = event?.squadSize ?? 7;
  const playersOnPitch = event?.playersOnPitch ?? 5;
  const prizePoolTotal = event?.prizePoolTotal ?? 80000;
  const halfDuration = event?.halfDurationMinutes ?? 20;
  const gracePeriod = event?.gracePeriodMinutes ?? 15;
  const yellowCardFine = event?.yellowCardFine ?? 1000;
  const redCardFine = event?.redCardFine ?? 3000;

  // Disciplinary statistics
  const yellowCardEvents = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCardEvents = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");
  const totalFinesAssessed = (yellowCardEvents.length * yellowCardFine) + (redCardEvents.length * redCardFine);

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Football Header Banner */}
      <section className="border-b border-border bg-background pt-10 pb-12">
        <div className="container max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
              <Trophy className="w-3.5 h-3.5 text-primary" />
              <span>Southern Delta University, Ozoro • First Edition</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Host: <span className="text-foreground font-medium">{siteConfig.hostInstitution}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Winners Football Competition (WFC)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                5-a-side Monkey Post collegiate knockout competition. {maxTeams} registered student teams competing in single-elimination matches for {formatNaira(prizePoolTotal)} in total cash prizes. Small goalposts, no permanent goalkeeper, {halfDuration}-minute halves, and phone video reviews.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                href="/football/join"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground font-medium text-xs transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-primary" />
                <span>Join with Invite Code</span>
              </Link>
              <Link
                href="/football/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors"
              >
                <span>Register Team ({formatNaira(event?.registrationFee || 10000)})</span>
              </Link>
            </div>
          </div>

          {/* Dynamic Key Tournament Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-border">
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">{maxTeams} Teams</div>
              <div className="text-xs text-muted-foreground mt-0.5">Tournament Draw</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">{squadSize} Players Roster</div>
              <div className="text-xs text-muted-foreground mt-0.5">({playersOnPitch} on Pitch)</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-primary">{formatNaira(prizePoolTotal)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total Cash Prize Pool</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">{halfDuration} + {halfDuration} Min</div>
              <div className="text-xs text-muted-foreground mt-0.5">Regulation Match Duration</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card col-span-2 sm:col-span-1">
              <div className="text-lg font-bold font-mono text-foreground">{gracePeriod} Mins</div>
              <div className="text-xs text-muted-foreground mt-0.5">Walkover Grace Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex items-center gap-1 border-b border-border pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("bracket")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "bracket"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Knockout Bracket</span>
          </button>

          <button
            onClick={() => setActiveTab("fixtures")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "fixtures"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>All Fixtures ({matches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("teams")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "teams"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Teams & Rosters ({teams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rules")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "rules"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Monkey Post Rules</span>
          </button>

          <button
            onClick={() => setActiveTab("fines")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap",
              activeTab === "fines"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>Disciplinary Register</span>
          </button>
        </div>

        {/* Tab 1: Bracket */}
        {activeTab === "bracket" && (
          <div className="space-y-4">
            <TournamentBracket matches={matches} teams={teams} />
          </div>
        )}

        {/* Tab 2: Fixtures */}
        {activeTab === "fixtures" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Complete Fixture List & Results</h3>
                <p className="text-xs text-muted-foreground">All 16 single-elimination tournament matches</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {matches.map((m) => (
                <MatchScorecard key={m.id} match={m} />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Teams & Rosters */}
        {activeTab === "teams" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Registered Teams & Rosters</h3>
                <p className="text-xs text-muted-foreground">
                  Each squad registers {squadSize} players ({playersOnPitch} active on pitch). Teammates join via the team invitation code.
                </p>
              </div>
              <Link
                href="/football/join"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Join a Team with Code</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team) => (
                <div key={team.id} className="rounded-[6px] border border-border bg-card p-4 space-y-3 shadow-subtle">
                  <div className="flex items-center justify-between border-b border-border pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-[6px] bg-muted flex items-center justify-center font-bold text-xs text-foreground border border-border">
                          {team.shortCode}
                        </span>
                        <h4 className="font-semibold text-sm text-foreground">{team.name}</h4>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Captain: <strong className="text-foreground font-medium">{team.captainName}</strong>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                        {team.status}
                      </span>
                      <div className="text-[10px] text-muted-foreground mt-1">
                        {team.players.length}/{squadSize} Players
                      </div>
                    </div>
                  </div>

                  {/* Team Invite Code Row */}
                  <div className="flex items-center justify-between p-2 rounded-[6px] bg-muted/30 border border-border text-xs">
                    <span className="text-muted-foreground text-[11px]">Invite Code:</span>
                    <div className="flex items-center gap-1.5 font-mono font-semibold text-foreground">
                      <span>{team.inviteCode}</span>
                      <button
                        onClick={() => copyInviteCode(team.inviteCode)}
                        className="p-1 rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy Invite Code"
                      >
                        {copiedCode === team.inviteCode ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Player Roster List */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pb-1">
                      Squad Roster ({team.players.length})
                    </div>
                    <div className="divide-y divide-border/60 text-xs">
                      {team.players.map((p) => (
                        <div key={p.id} className="py-1.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 text-center font-mono font-semibold text-muted-foreground text-[11px]">
                              #{p.jerseyNumber}
                            </span>
                            <span className="font-medium text-foreground">{p.fullName}</span>
                            {p.isCaptain && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-[6px] bg-primary/10 text-primary border border-primary/20">
                                C
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-muted-foreground">
                            {p.phone}
                          </span>
                        </div>
                      ))}

                      {/* Remaining unfilled slots */}
                      {Array.from({ length: Math.max(0, squadSize - team.players.length) }).map((_, i) => (
                        <div key={`empty-${i}`} className="py-1.5 flex items-center justify-between text-muted-foreground/60 italic text-[11px]">
                          <span>Slot #{team.players.length + i + 1}: Awaiting teammate join</span>
                          <Link href={`/football/join?code=${team.inviteCode}`} className="text-primary hover:underline not-italic text-[10px]">
                            Join Slot
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Rules */}
        {activeTab === "rules" && (
          <div className="space-y-6">
            <div className="rounded-[6px] border border-border bg-card p-6 space-y-4 shadow-subtle">
              <h3 className="text-base font-bold text-foreground">
                Official WFC Monkey Post Competition Rules
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rules formulated by the Winners Sports Competition Advisory Board for Southern Delta University, Ozoro.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="space-y-1.5 p-3.5 rounded-[6px] bg-muted/30 border border-border">
                  <div className="font-semibold text-foreground">1. Squad Composition & Pitch Setup</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Squad consists of exactly {squadSize} registered players. {playersOnPitch} players are active on the pitch at any time. There is no permanent goalkeeper or goal-post defender; all 5 outfield players move freely.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-[6px] bg-muted/30 border border-border">
                  <div className="font-semibold text-foreground">2. Match Duration & Walkovers</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Matches are played over two {halfDuration}-minute halves with a 5-minute half-time interval. A strict {gracePeriod}-minute walkover grace period applies; teams failing to field at least 4 players forfeit with a 3-0 scoreline.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-[6px] bg-muted/30 border border-border">
                  <div className="font-semibold text-foreground">3. Disciplinary Fines Structure</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Yellow card incurs an official fine of {formatNaira(yellowCardFine)}. Red card incurs {formatNaira(redCardFine)} plus a mandatory 1-match suspension. Fines must be remitted to the finance desk prior to the next fixture.
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-[6px] bg-muted/30 border border-border">
                  <div className="font-semibold text-foreground">4. Phone Video Review Protocol</div>
                  <p className="text-muted-foreground leading-relaxed">
                    A designated official recording device records goalmouth incidents and contentious decisions. The referee and match coordinator may review footage on field before confirming or overturning decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Disciplinary */}
        {activeTab === "fines" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Disciplinary & Fines Register</h3>
                <p className="text-xs text-muted-foreground">
                  Official cards and penalties recorded across all tournament fixtures
                </p>
              </div>
              <div className="text-xs font-medium text-foreground">
                Total Assessed: <strong className="text-primary font-mono">{formatNaira(totalFinesAssessed)}</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-[6px] border border-border bg-card">
                <div className="text-lg font-bold font-mono text-amber-600 dark:text-amber-400">
                  {yellowCardEvents.length} Yellow Cards
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{formatNaira(yellowCardFine)} per infraction</div>
              </div>
              <div className="p-3.5 rounded-[6px] border border-border bg-card">
                <div className="text-lg font-bold font-mono text-red-600 dark:text-red-400">
                  {redCardEvents.length} Red Cards
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{formatNaira(redCardFine)} + 1-match ban</div>
              </div>
              <div className="p-3.5 rounded-[6px] border border-border bg-card">
                <div className="text-lg font-bold font-mono text-foreground">
                  100% Remitted
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">SDU Disciplinary Compliance</div>
              </div>
            </div>

            {/* Fines Table */}
            <div className="rounded-[6px] border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                    <tr>
                      <th className="py-2.5 px-3">Player / Team</th>
                      <th className="py-2.5 px-3">Card Type</th>
                      <th className="py-2.5 px-3">Fine Amount</th>
                      <th className="py-2.5 px-3">Match</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {matches.flatMap((m) => (m.events || []).map((ev) => ({ ...ev, match: m }))).filter((ev) => ev.eventType === "yellow_card" || ev.eventType === "red_card").map((ev) => {
                      const fineAmt = ev.eventType === "yellow_card" ? yellowCardFine : redCardFine;
                      return (
                        <tr key={ev.id} className="hover:bg-muted/20">
                          <td className="py-2 px-3 font-medium text-foreground">
                            {ev.playerName || "Team Player"}
                          </td>
                          <td className="py-2 px-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded-[6px] font-semibold text-[10px] uppercase border",
                              ev.eventType === "yellow_card" 
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800" 
                                : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-800"
                            )}>
                              {ev.eventType === "yellow_card" ? "Yellow Card" : "Red Card"}
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono font-medium text-foreground">
                            {formatNaira(fineAmt)}
                          </td>
                          <td className="py-2 px-3 text-muted-foreground">
                            Match #{ev.match.matchNumber}
                          </td>
                          <td className="py-2 px-3">
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                              Paid / Settled
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
