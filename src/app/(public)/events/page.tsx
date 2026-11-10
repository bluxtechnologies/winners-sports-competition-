"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  Calendar, 
  MapPin, 
  ArrowRight
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
    <div className="container max-w-5xl py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          <span>WSC Event Catalogue</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Competitions & Tournaments
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Browse active and upcoming sports competitions across Southern Delta University, Ozoro. A shared athletic event infrastructure across football and endurance road running.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors",
            filter === "all"
              ? "bg-primary text-primary-foreground font-semibold"
              : "border border-border text-foreground hover:bg-muted"
          )}
        >
          All Competitions ({events.length})
        </button>
        <button
          onClick={() => setFilter("football")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5",
            filter === "football"
              ? "bg-primary text-primary-foreground font-semibold"
              : "border border-border text-foreground hover:bg-muted"
          )}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Football (WFC)</span>
        </button>
        <button
          onClick={() => setFilter("marathon")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5",
            filter === "marathon"
              ? "bg-primary text-primary-foreground font-semibold"
              : "border border-border text-foreground hover:bg-muted"
          )}
        >
          <Timer className="w-3.5 h-3.5" />
          <span>Marathon (WMC)</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredEvents.map((evt) => {
          const isFootball = evt.categoryId === "football";

          return (
            <div
              key={evt.id}
              className="rounded-[6px] border border-border bg-card p-6 flex flex-col justify-between space-y-5 shadow-subtle text-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs text-primary uppercase tracking-wider">
                    {evt.edition}
                  </span>
                  <span className="px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground uppercase text-[10px] font-semibold border border-border">
                    {evt.status.replace("_", " ")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {evt.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-[11px] mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span>{evt.venue}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed line-clamp-3">
                  {evt.description}
                </p>

                <div className="grid grid-cols-3 gap-2 p-3 rounded-[6px] bg-muted/40 border border-border text-center">
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Fee</div>
                    <div className="font-mono font-bold text-foreground text-xs mt-0.5">
                      {formatNaira(evt.registrationFee)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Prize Pool</div>
                    <div className="font-mono font-bold text-primary text-xs mt-0.5">
                      {formatNaira(evt.prizePoolTotal)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase">Draw / Slots</div>
                    <div className="font-mono font-bold text-foreground text-xs mt-0.5">
                      {evt.confirmedCount || 0} / {evt.maxParticipants}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <Link
                  href={isFootball ? "/football" : "/marathon"}
                  className="text-primary font-medium hover:underline flex items-center gap-1"
                >
                  <span>Explore Competition Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={isFootball ? "/football/register" : "/marathon/register"}
                  className="px-3.5 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  Register
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
