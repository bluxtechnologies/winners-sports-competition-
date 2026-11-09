"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { store } from "@/services/store";
import { formatNaira, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function EventsPage() {
  const [filter, setFilter] = useState<"all" | "football" | "marathon">("all");
  const events = store.getEvents();

  const filteredEvents = filter === "all" 
    ? events 
    : events.filter((e) => e.categoryId === filter);

  return (
    <div className="container py-12 md:py-16 space-y-10">
      {/* Page Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>WSC Event Catalogue</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
          Competitions & Tournaments
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Browse upcoming and active athletic tournaments across Southern Delta University, Ozoro. One shared sports registration engine across football and road running.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
            filter === "all"
              ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
              : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          All Competitions ({events.length})
        </button>
        <button
          onClick={() => setFilter("football")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            filter === "football"
              ? "bg-brand-gold text-black shadow-md shadow-amber-500/20"
              : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Football (WFC)</span>
        </button>
        <button
          onClick={() => setFilter("marathon")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            filter === "marathon"
              ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20"
              : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Marathon (WMC)</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => {
          const isFootball = evt.categoryId === "football";

          return (
            <div
              key={evt.id}
              className="athletic-card rounded-3xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-5">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                    isFootball
                      ? "bg-amber-500/10 text-brand-gold border border-brand-gold/30"
                      : "bg-emerald-500/10 text-brand-emerald border border-brand-emerald/30"
                  )}>
                    {isFootball ? <Trophy className="w-3.5 h-3.5" /> : <Timer className="w-3.5 h-3.5" />}
                    <span>{evt.edition}</span>
                  </div>

                  <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-md bg-white/5 text-white/80 border border-white/10">
                    {evt.status.replace("_", " ")}
                  </span>
                </div>

                {/* Event Title */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {evt.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{evt.venue}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-emerald" />
                      <span>{formatDate(evt.startDate)} - {formatDate(evt.endDate)}</span>
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {evt.description}
                </p>

                {/* Highlights Grid */}
                <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Prize Pool</div>
                    <div className="font-mono font-bold text-white text-base mt-0.5">
                      {formatNaira(evt.prizePoolTotal)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Registration Fee</div>
                    <div className="font-mono font-bold text-brand-gold text-base mt-0.5">
                      {formatNaira(evt.registrationFee)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground font-semibold uppercase">Capacity</div>
                    <div className="font-mono font-bold text-white text-base mt-0.5">
                      {evt.confirmedCount || 0} / {evt.maxParticipants}
                    </div>
                  </div>
                </div>

                {/* Rules highlight */}
                <div className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] text-xs text-muted-foreground space-y-1">
                  <div className="font-semibold text-white/90">Rules & Format Summary:</div>
                  <p className="text-[11px] leading-relaxed">{evt.rulesSummary}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={isFootball ? "/football" : "/marathon"}
                  className="text-xs font-bold text-white hover:text-brand-gold flex items-center gap-1.5 transition-colors"
                >
                  <span>Explore Tournament Hub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={isFootball ? "/football/register" : "/marathon/register"}
                  className={cn(
                    "text-xs font-extrabold px-5 py-2.5 rounded-xl text-black shadow-lg transition-all active:scale-[0.96]",
                    isFootball 
                      ? "bg-brand-gold hover:bg-amber-400 shadow-amber-500/20" 
                      : "bg-brand-emerald text-white hover:bg-emerald-600 shadow-emerald-500/20"
                  )}
                >
                  {isFootball ? "Register Team (₦10k)" : "Register Runner"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
