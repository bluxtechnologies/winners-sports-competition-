"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Timer, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  Award, 
  CheckCircle2, 
  Search,
  Users,
  Flame,
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
    (p.matricNumber && p.matricNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-12 pb-20">
      {/* Marathon Hero Banner */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-white/10 bg-gradient-to-b from-emerald-950/20 via-black to-background">
        <div className="container relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-emerald/30 bg-emerald-500/10 text-brand-emerald text-xs font-bold uppercase tracking-wider">
              <Timer className="w-3.5 h-3.5" />
              <span>Campus Road Race • First Edition</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              Host: <span className="text-white font-semibold">{siteConfig.hostInstitution}</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight">
                Winners Marathon <span className="text-brand-emerald">Challenge</span>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Southern Delta University&apos;s campus road running competition. Compete in the timed 10K Campus Elite or join the 5K Campus Fun Run. Official numbered bibs, chip timing, and emergency safety checkpoints along the route.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/marathon/register"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-400 hover:to-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 active:scale-[0.96] transition-all"
              >
                Register as Runner
              </Link>
            </div>
          </div>

          {/* Key Marathon Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-white">10K & 5K</div>
              <div className="text-xs text-muted-foreground">Race Categories</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-brand-emerald">₦50,000</div>
              <div className="text-xs text-muted-foreground">10K Podium Cash Prizes</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-white">Every 2.5km</div>
              <div className="text-xs text-muted-foreground">Water & Aid Stations</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl font-mono font-extrabold text-brand-gold">Dec 8, 2026</div>
              <div className="text-xs text-muted-foreground">Official Race Day (6:30 AM)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="container space-y-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "overview"
                ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Timer className="w-4 h-4" />
            <span>Race Divisions & Prizes</span>
          </button>

          <button
            onClick={() => setActiveTab("results")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "results"
                ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Award className="w-4 h-4" />
            <span>Live Results & Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab("runners")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "runners"
                ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <Users className="w-4 h-4" />
            <span>Registered Runners & Bibs ({participants.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("route")}
            className={cn(
              "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap",
              activeTab === "route"
                ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20"
                : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            <MapPin className="w-4 h-4" />
            <span>Campus Route & Safety</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & PRIZES */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 10K Elite Card */}
              <div className="athletic-card rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Timed Championship Division
                  </span>
                  <span className="font-mono font-bold text-brand-gold text-sm">
                    Fee: ₦3,000
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">10K Campus Elite Challenge</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    2 laps around Southern Delta University perimeter road. Official chip timing and cash podium prizes for student athletes.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Cash Prizes:</div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-amber-400 font-bold">1st Place</div>
                      <div className="text-base font-mono font-extrabold text-white mt-0.5">₦30,000</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-slate-300 font-bold">2nd Place</div>
                      <div className="text-base font-mono font-extrabold text-white mt-0.5">₦15,000</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-amber-600 font-bold">3rd Place</div>
                      <div className="text-base font-mono font-extrabold text-white mt-0.5">₦5,000</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Gun time & Chip time recorded</span>
                  <Link
                    href="/marathon/register?category=10k"
                    className="font-bold px-4 py-2 rounded-lg bg-brand-emerald text-white hover:bg-emerald-600 transition-colors"
                  >
                    Enter 10K Elite
                  </Link>
                </div>
              </div>

              {/* 5K Fun Run Card */}
              <div className="athletic-card rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    Community & Fitness
                  </span>
                  <span className="font-mono font-bold text-brand-emerald text-sm">
                    Fee: ₦2,000
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white">5K Campus Fun Run</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    1 lap community course open to all students, staff, and fitness enthusiasts. Run, jog, or walk to celebrate campus health.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Runner Benefits:</div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-5">
                    <li>Official personalized bib number</li>
                    <li>WMC Finisher certificate & post-race hydration</li>
                    <li>Access to water stations every 2.5km</li>
                    <li>Medical monitoring and first-aid support</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Non-podium community division</span>
                  <Link
                    href="/marathon/register?category=5k"
                    className="font-bold px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Enter 5K Fun Run
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LIVE LEADERBOARD */}
        {activeTab === "results" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">10K Campus Elite Challenge Leaderboard</h3>
                <p className="text-xs text-muted-foreground">Official electronic chip timing results and finishing positions</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Official Results
              </span>
            </div>

            <div className="border border-white/10 rounded-2xl overflow-hidden bg-card/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-3.5">Pos</th>
                      <th className="p-3.5">Bib</th>
                      <th className="p-3.5">Runner Name</th>
                      <th className="p-3.5">Gun Time</th>
                      <th className="p-3.5">Chip Time</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {results.map((res) => (
                      <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-3.5">
                          <span className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs",
                            res.finishingPosition === 1 ? "bg-amber-500 text-black shadow" :
                            res.finishingPosition === 2 ? "bg-slate-300 text-black" :
                            res.finishingPosition === 3 ? "bg-amber-700 text-white" :
                            "bg-white/10 text-white"
                          )}>
                            {res.finishingPosition}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono font-bold text-brand-gold">
                          #{res.bibNumber}
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {res.participantName}
                        </td>
                        <td className="p-3.5 font-mono text-white/90">
                          {formatDurationSeconds(res.gunTimeSeconds)}
                        </td>
                        <td className="p-3.5 font-mono text-brand-emerald font-bold">
                          {formatDurationSeconds(res.chipTimeSeconds)}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {res.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-muted-foreground text-[11px]">
                          {res.notes || "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: REGISTERED RUNNERS */}
        {activeTab === "runners" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white">Registered Runners & Bib Assignments</h3>
                <p className="text-xs text-muted-foreground">Search by runner name, bib number, or student matric</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search bib # or name..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-brand-emerald"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParticipants.map((p) => (
                <div key={p.id} className="flex justify-center">
                  <BibBadge participant={p} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ROUTE & SAFETY */}
        {activeTab === "route" && (
          <div className="max-w-4xl space-y-6 animate-fade-in text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-emerald" />
                  <span>Campus Route, Hydration & Participant Safety</span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  The Winners Marathon Challenge operates with mandatory participant welfare precautions across the campus grounds.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span>Emergency Response & First Aid</span>
                  </h4>
                  <p className="text-xs leading-relaxed">
                    A dedicated medical first-aid post and university ambulance are stationed at the SDU Sports Center Pavilion. First-aiders are posted at every 2.5km hydration checkpoint.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-emerald" />
                    <span>Mandatory Emergency Contacts</span>
                  </h4>
                  <p className="text-xs leading-relaxed">
                    Every participant must supply verified next-of-kin emergency contact details and disclose any existing respiratory or cardiovascular conditions before receiving their bib.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                <h4 className="font-bold text-white text-sm">Course Route Specifications</h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li><strong>Start / Finish:</strong> SDU Sports Complex Main Pavilion</li>
                  <li><strong>Surface:</strong> Paved university ring road, fully marshaled with traffic restricted</li>
                  <li><strong>Checkpoint 1 (2.5 km):</strong> Faculty of Engineering Roundabout (Water & Electrolytes)</li>
                  <li><strong>Checkpoint 2 (5.0 km):</strong> Main University Gate / 5K Fun Run Finish Line</li>
                  <li><strong>Checkpoint 3 (7.5 km):</strong> Hostels Block B & C Loop (Water & Cold Sponges)</li>
                  <li><strong>10K Finish:</strong> SDU Main Track Ring</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
