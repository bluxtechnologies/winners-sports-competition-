"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  Calendar, 
  ShieldAlert, 
  FileText, 
  Video, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Scale,
  Sparkles
} from "lucide-react";
import { store } from "@/services/store";
import { TournamentBracket } from "@/components/shared/TournamentBracket";
import { MatchScorecard } from "@/components/shared/MatchScorecard";
import { formatNaira } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function FootballPage() {
  const [activeTab, setActiveTab] = useState<"bracket" | "fixtures" | "teams" | "rules" | "fines">("bracket");
  
  const event = store.getEventById("e-football-001");
  const teams = store.getTeams("e-football-001");
  const matches = store.getMatches("e-football-001");

  // Calculate disciplinary statistics
  const yellowCardEvents = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCardEvents = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");
  const totalFinesAssessed = (yellowCardEvents.length * 1000) + (redCardEvents.length * 3000);

  return (
    <div className="space-y-12 pb-20">
      {/* Football Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-white/10 bg-gradient-to-b from-amber-950/20 via-black to-background">
        <div className="container relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              <span>Southern Delta University, Ozoro • First Edition</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              Host: <span className="text-white font-semibold">{siteConfig.hostInstitution}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
                Winners Football <span className="text-brand-gold">Competition</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                5-a-side Monkey Post football championship with 16 student teams competing in a single-elimination knockout format for ₦80,000 in cash prizes. Small goalposts, no fixed goalkeeper, 20-minute halves, and phone video reviews.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/football/register"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 active:scale-[0.96] transition-all"
              >
                Register Team (₦10,000)
              </Link>
            </div>
          </div>

          {/* Key Tournament Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-white">16 Teams</div>
              <div className="text-xs text-muted-foreground">7 Players Roster (5 on Pitch)</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-brand-gold">₦80,000</div>
              <div className="text-xs text-muted-foreground">Total Cash Prize Pool</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-white">20 + 20 Min</div>
              <div className="text-xs text-muted-foreground">Regulation Match Duration</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-amber-400">15 Mins</div>
              <div className="text-xs text-muted-foreground">Walkover Grace Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <section className="container space-y-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("bracket")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "bracket"
                ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Trophy className="w-4 h-4" />
            <span>Knockout Bracket (16 Teams)</span>
          </button>

          <button
            onClick={() => setActiveTab("fixtures")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "fixtures"
                ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Calendar className="w-4 h-4" />
            <span>Fixtures & Results ({matches.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("teams")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "teams"
                ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Users className="w-4 h-4" />
            <span>Confirmed Teams & Rosters ({teams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("rules")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "rules"
                ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <FileText className="w-4 h-4" />
            <span>Rules of Monkey Post</span>
          </button>

          <button
            onClick={() => setActiveTab("fines")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "fines"
                ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Disciplinary & Fines</span>
          </button>
        </div>

        {/* TAB 1: KNOCKOUT BRACKET */}
        {activeTab === "bracket" && (
          <div className="space-y-8 animate-fade-in">
            <TournamentBracket matches={matches} teams={teams} />

            {/* Prize Distribution Banner */}
            <div className="p-6 md:p-8 rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-black space-y-4">
              <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Prize Commitments (50% of Registration Income)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-brand-gold/30 space-y-1">
                  <div className="text-xs uppercase text-brand-gold font-extrabold">Champion</div>
                  <div className="text-3xl font-mono font-black text-white">₦50,000</div>
                  <div className="text-[11px] text-muted-foreground">Bank transfer to winning captain</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-xs uppercase text-slate-300 font-extrabold">Runner-Up</div>
                  <div className="text-3xl font-mono font-black text-white">₦20,000</div>
                  <div className="text-[11px] text-muted-foreground">Final losing team</div>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <div className="text-xs uppercase text-amber-600 font-extrabold">Third Place</div>
                  <div className="text-3xl font-mono font-black text-white">₦10,000</div>
                  <div className="text-[11px] text-muted-foreground">Winner of 3rd place playoff</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                *Note: In accordance with Document 01 (Tournament Overview), no trophy or medals will be awarded in the first edition. Cash prizes are transferred directly following conclusion of the finals.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: FIXTURES & RESULTS */}
        {activeTab === "fixtures" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">All 16 Tournament Matches</h3>
                <p className="text-xs text-muted-foreground">
                  Official match sheets, scores, extra time, penalty shootouts and volunteer phone camera records
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((m) => (
                <MatchScorecard key={m.id} match={m} />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TEAMS & ROSTERS */}
        {activeTab === "teams" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-bold text-white">16 Accepted Teams & Roster Details</h3>
              <p className="text-xs text-muted-foreground">
                Each team registers exactly 7 Southern Delta University students. No player may play for more than one team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team, idx) => (
                <div
                  key={team.id}
                  className="rounded-2xl border border-white/10 bg-card/60 p-5 space-y-4 hover:border-brand-gold/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-brand-gold flex items-center justify-center font-bold text-sm border border-brand-gold/30">
                        {team.shortCode}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-base text-white">{team.name}</h4>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/80">
                            Seed #{team.seedNumber || idx + 1}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{team.departmentOrHall}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Confirmed
                    </span>
                  </div>

                  {/* Captain Info */}
                  <div className="text-xs p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <div className="text-muted-foreground">
                      Captain: <strong className="text-white">{team.captainName}</strong>
                    </div>
                    <div className="text-muted-foreground font-mono text-[11px]">
                      Matric: <span className="text-brand-gold">{team.captainMatric}</span>
                    </div>
                  </div>

                  {/* 7-Player Roster Table */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Squad Roster (7 Registered Players):
                    </div>
                    <div className="divide-y divide-white/5 border border-white/5 rounded-xl overflow-hidden bg-black/20 text-xs">
                      {team.players.map((p) => (
                        <div key={p.id} className="px-3 py-2 flex items-center justify-between text-muted-foreground">
                          <div className="flex items-center gap-2 truncate">
                            <span className="w-5 font-mono text-[11px] text-brand-gold font-bold">
                              #{p.jerseyNumber}
                            </span>
                            <span className="text-white truncate">{p.fullName}</span>
                            {p.isCaptain && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 uppercase">
                                C
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-[10px] text-white/50">{p.matricNumber}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RULES OF MONKEY POST */}
        {activeTab === "rules" && (
          <div className="max-w-4xl space-y-8 animate-fade-in text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-gold" />
                <span>Document 03 — Rules of the Game: Monkey Post 5-a-Side</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Matches are played under the official Winners Football Competition Monkey Post rules as established for Southern Delta University, Ozoro.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Playing Area & Goalposts</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Matches use the competition&apos;s small Monkey Post goalposts.</li>
                    <li>There is <strong>no fixed goalkeeper</strong> and <strong>no fixed post defender</strong>.</li>
                    <li>All 5 active players on the pitch may move freely across the entire playing area.</li>
                    <li>No player may use their hands or arms to keep, catch, hold or deliberately stop the ball. Hand contact results in an immediate free-kick.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Substitutions & Squad Limit</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Each team registers exactly 7 players (5 on pitch, 2 substitutes).</li>
                    <li>Maximum of <strong>2 substitutions per match</strong>.</li>
                    <li><strong>Substitutions are permanent:</strong> A player who is substituted off cannot return to that match.</li>
                    <li>Substitutions must be formally authorized by the referee at a stoppage in play.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Match Duration & Knockout Tie-Breaks</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Regulation match duration is <strong>40 minutes</strong> (20 minutes first half + 20 minutes second half).</li>
                    <li>If a knockout match is tied after regulation time, teams play <strong>5 minutes of extra time</strong>.</li>
                    <li>If still tied after extra time, the match is decided by direct penalty kicks taken from the designated long-distance penalty spot toward the small goal.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm">4. 15-Minute Walkover Grace Period</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Both teams must report ready to play at the scheduled kickoff time.</li>
                    <li>A strict <strong>15-minute grace period</strong> applies.</li>
                    <li>If a team fails to field 5 players after the 15-minute grace period, the referee records non-appearance and a walkover is awarded to the opposing team.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm">5. Phone Video Review (Document 09)</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Matches are recorded using a designated volunteer smartphone from the sidelines.</li>
                    <li>Each team captain is granted <strong>one video appeal request per match</strong>.</li>
                    <li>The referee may also initiate a review for disputed goal line incidents or serious violent conduct / red card offenses.</li>
                    <li>The referee views the sideline phone footage and delivers the final decision.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DISCIPLINARY & FINES */}
        {activeTab === "fines" && (
          <div className="max-w-4xl space-y-6 animate-fade-in text-xs sm:text-sm">
            <div className="p-6 rounded-3xl border border-red-500/20 bg-card/60 space-y-4">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider">
                <Scale className="w-5 h-5" />
                <span>Document 06 — Disciplinary & Appeals Policy</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                WFC strictly enforces fair play and sportsmanship. Cards carry mandatory administrative fines payable directly to the official tournament account. Referees are prohibited from collecting cash on the pitch.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-5 bg-amber-400 rounded-sm inline-block shadow" />
                    <h4 className="font-extrabold text-white text-base">Yellow Card: ₦1,000 Fine</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Assessed for reckless fouls, persistent infringement, or dissent. Fines must be verified by the Finance Officer.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-5 bg-red-500 rounded-sm inline-block shadow" />
                    <h4 className="font-extrabold text-white text-base">Red Card: ₦3,000 Fine + 1 Match Ban</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Immediate dismissal from the pitch. Automatic 1-match sporting suspension for the team&apos;s next knockout encounter.
                  </p>
                </div>
              </div>

              {/* Live Fines Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Competition Disciplinary Ledger:</span>
                  <span className="font-mono font-bold text-brand-gold">₦{totalFinesAssessed.toLocaleString()} Assessed</span>
                </div>
                <div className="divide-y divide-white/5 text-xs text-muted-foreground">
                  <div className="py-2 flex justify-between">
                    <span>Yellow Cards Shown:</span>
                    <span className="font-mono text-white font-bold">{yellowCardEvents.length} (₦{yellowCardEvents.length * 1000})</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span>Red Cards Shown:</span>
                    <span className="font-mono text-red-400 font-bold">{redCardEvents.length} (₦{redCardEvents.length * 3000})</span>
                  </div>
                </div>
              </div>

              {/* Protest Procedure */}
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.01] space-y-2">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Formal Match Protest Procedure</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Only the team captain may file a formal protest regarding player eligibility or severe rule misapplication. Protests must be lodged in writing with the Tournament Committee within <strong>30 minutes</strong> of the final whistle. Protests challenging subjective judgment calls will not be entertained.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
