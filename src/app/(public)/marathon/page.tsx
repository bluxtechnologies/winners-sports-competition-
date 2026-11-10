"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Timer, 
  MapPin, 
  Calendar, 
  Heart, 
  Award, 
  CheckCircle2, 
  Search,
  Users,
  ArrowRight
} from "lucide-react";
import { store } from "@/services/store";
import { siteConfig } from "@/config/site";
import { formatNaira, formatDurationSeconds, formatDate } from "@/lib/utils";
import { BibBadge } from "@/components/shared/BibBadge";
import { cn } from "@/lib/utils";

export default function MarathonPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "results" | "runners" | "route">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const event = store.getEventById("e-marathon-002");
  const raceCategories = store.getRaceCategories("e-marathon-002");
  const participants = store.getParticipants("e-marathon-002");
  const results = store.getRaceResults("rc-10k");

  const filteredParticipants = participants.filter((p) =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.bibNumber && p.bibNumber.includes(searchQuery)) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Marathon Header Banner */}
      <section className="border-b border-border bg-background pt-10 pb-12">
        <div className="container max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
              <Timer className="w-3.5 h-3.5 text-primary" />
              <span>Campus Road Race • First Edition</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Host: <span className="text-foreground font-medium">{siteConfig.hostInstitution}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
                Winners Marathon Challenge (WMC)
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Southern Delta University campus road endurance competition. Timed 10K Campus Elite division and 5K Campus Fun Run. Official numbered bib credentials, checkpoint verification, and on-site emergency first aid.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/marathon/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors"
              >
                <span>Register as Runner</span>
              </Link>
            </div>
          </div>

          {/* Key Marathon Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-border">
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">10K & 5K</div>
              <div className="text-xs text-muted-foreground mt-0.5">Race Categories</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-primary">₦50,000</div>
              <div className="text-xs text-muted-foreground mt-0.5">10K Podium Cash Prizes</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">Every 2.5km</div>
              <div className="text-xs text-muted-foreground mt-0.5">Water & Aid Checkpoints</div>
            </div>
            <div className="p-3 rounded-[6px] border border-border bg-card">
              <div className="text-lg font-bold font-mono text-foreground">Dec 8, 2026</div>
              <div className="text-xs text-muted-foreground mt-0.5">Official Race Day (6:30 AM)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container max-w-5xl space-y-6">
        <div className="flex items-center gap-1 border-b border-border pb-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "overview"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            Race Categories & Prizes
          </button>
          <button
            onClick={() => setActiveTab("results")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "results"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            Live Results Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("runners")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "runners"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            Registered Runners ({participants.length})
          </button>
          <button
            onClick={() => setActiveTab("route")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors whitespace-nowrap",
              activeTab === "route"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            Campus Route & Medical Safety
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {raceCategories.map((category) => (
                <div key={category.id} className="rounded-[6px] border border-border bg-card p-5 space-y-4 shadow-subtle">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-foreground">
                      {category.distanceKm}KM
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-[6px] bg-muted text-foreground border border-border">
                      Fee: {formatNaira(category.fee)}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Official Bib & Hydration</span>
                    <Link
                      href={`/marathon/register?category=${category.id}`}
                      className="font-medium text-primary hover:underline"
                    >
                      Register for {category.distanceKm}K
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Podium Prizes */}
            <div className="rounded-[6px] border border-border bg-card p-5 space-y-3 shadow-subtle">
              <h3 className="text-sm font-semibold text-foreground">
                10K Campus Elite Cash Prizes
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground">1st Place Champion</div>
                  <div className="text-base font-bold font-mono text-primary mt-1">₦30,000</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Trophy & Gold Medal</div>
                </div>
                <div className="p-3 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground">2nd Place Runner-Up</div>
                  <div className="text-base font-bold font-mono text-foreground mt-1">₦15,000</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Silver Medal</div>
                </div>
                <div className="p-3 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground">3rd Place Podium</div>
                  <div className="text-base font-bold font-mono text-foreground mt-1">₦5,000</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">Bronze Medal</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Results */}
        {activeTab === "results" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
              <div>
                <h3 className="font-semibold text-foreground text-sm">10K Campus Elite Leaderboard</h3>
                <p className="text-muted-foreground">Official timing records</p>
              </div>
            </div>

            <div className="rounded-[6px] border border-border bg-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                    <tr>
                      <th className="py-2.5 px-3">Pos</th>
                      <th className="py-2.5 px-3">Bib #</th>
                      <th className="py-2.5 px-3">Runner Name</th>
                      <th className="py-2.5 px-3">Gun Time</th>
                      <th className="py-2.5 px-3">Chip Time</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {results.map((res) => (
                      <tr key={res.id} className="hover:bg-muted/20">
                        <td className="py-2 px-3 font-mono font-bold text-foreground">
                          #{res.finishingPosition}
                        </td>
                        <td className="py-2 px-3 font-mono font-semibold text-primary">
                          {res.bibNumber}
                        </td>
                        <td className="py-2 px-3 font-medium text-foreground">
                          {res.participantName}
                        </td>
                        <td className="py-2 px-3 font-mono text-muted-foreground">
                          {formatDurationSeconds(res.gunTimeSeconds)}
                        </td>
                        <td className="py-2 px-3 font-mono font-medium text-foreground">
                          {formatDurationSeconds(res.chipTimeSeconds)}
                        </td>
                        <td className="py-2 px-3">
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            Finished
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Runners Search & Roster */}
        {activeTab === "runners" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Registered Participants</h3>
                <p className="text-xs text-muted-foreground">Search by runner name or bib number</p>
              </div>

              <div className="w-full sm:w-64 relative">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name or bib..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredParticipants.map((p) => (
                <div key={p.id} className="rounded-[6px] border border-border bg-card p-3.5 space-y-2 text-xs shadow-subtle">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-mono font-bold text-primary text-sm">
                      BIB #{p.bibNumber || "---"}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                      {p.raceCategoryId === "rc-10k" ? "10K Elite" : "5K Fun Run"}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground text-xs">{p.fullName}</h4>
                    <p className="text-[11px] text-muted-foreground">{p.email}</p>
                  </div>

                  <div className="pt-1 text-[11px] flex items-center justify-between text-muted-foreground">
                    <span>T-Shirt: {p.tShirtSize}</span>
                    <span className={cn(
                      p.checkInStatus ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"
                    )}>
                      {p.checkInStatus ? "Checked In" : "Pending Check-In"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Route & Medical Safety */}
        {activeTab === "route" && (
          <div className="space-y-4">
            <div className="rounded-[6px] border border-border bg-card p-6 space-y-4 shadow-subtle text-xs">
              <h3 className="text-sm font-semibold text-foreground">
                SDU Campus Course Layout & Medical Safety Protocol
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The marathon follows Southern Delta University's perimeter Ring Road, beginning and ending at the SDU Main Sports Complex.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 rounded-[6px] bg-muted/30 border border-border space-y-1.5">
                  <div className="font-semibold text-foreground">Course Supervision & Water Stations</div>
                  <p className="text-muted-foreground leading-relaxed">
                    Hydration points and course marshals are stationed every 2.5 kilometers along the Ring Road. Bottled water, glucose, and electrolytes are available at each station.
                  </p>
                </div>

                <div className="p-3.5 rounded-[6px] bg-muted/30 border border-border space-y-1.5">
                  <div className="font-semibold text-foreground">Medical First Aid & Evacuation</div>
                  <p className="text-muted-foreground leading-relaxed">
                    SDU University Health Centre paramedic teams and mobile ambulance units will patrol the circuit continuously throughout race duration. Runners experiencing dizziness or distress must report to the nearest marshal immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
