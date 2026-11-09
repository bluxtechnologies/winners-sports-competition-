"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { WSCEvent, EventStatus } from "@/types";
import { Calendar, Plus, Edit2, CheckCircle2, Trophy, Timer } from "lucide-react";
import { formatNaira, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<WSCEvent[]>(store.getEvents());
  const [selectedEvent, setSelectedEvent] = useState<WSCEvent | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleStatusChange = (eventId: string, newStatus: EventStatus) => {
    store.updateEvent({ id: eventId, status: newStatus });
    setEvents([...store.getEvents()]);
    store.addAuditLog({
      adminUserId: "admin-director",
      adminName: "Tournament Director",
      action: "UPDATE_EVENT_STATUS",
      entityType: "event",
      entityId: eventId,
      details: `Changed event status to ${newStatus}`,
    });
    setStatusMessage(`Event status updated to "${newStatus}".`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Events Engine Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Create, publish, schedule and configure WSC sports competitions
          </p>
        </div>

        <button
          onClick={() => alert("Event creation form initialized. Southern Delta University sports engine supports adding Athletics, Basketball, or Cycling.")}
          className="px-4 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-2 active:scale-[0.96] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Event</span>
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((evt) => {
          const isFootball = evt.categoryId === "football";

          return (
            <div
              key={evt.id}
              className="athletic-card rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase",
                    isFootball ? "bg-amber-500/10 text-brand-gold border border-brand-gold/30" : "bg-emerald-500/10 text-brand-emerald border border-brand-emerald/30"
                  )}>
                    {isFootball ? <Trophy className="w-3.5 h-3.5" /> : <Timer className="w-3.5 h-3.5" />}
                    <span>{evt.edition}</span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={evt.status}
                    onChange={(e) => handleStatusChange(evt.id, e.target.value as EventStatus)}
                    className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/20 text-xs text-white font-bold focus:outline-none focus:border-brand-gold"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="registration_open">Registration Open</option>
                    <option value="registration_closed">Registration Closed</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {evt.venue} • {formatDate(evt.startDate)} - {formatDate(evt.endDate)}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Prize Pool</div>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">
                      {formatNaira(evt.prizePoolTotal)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Fee</div>
                    <div className="font-mono font-bold text-brand-gold text-sm mt-0.5">
                      {formatNaira(evt.registrationFee)}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-muted-foreground uppercase">Capacity</div>
                    <div className="font-mono font-bold text-white text-sm mt-0.5">
                      {evt.confirmedCount || 0} / {evt.maxParticipants}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">ID: <code className="text-white/60 font-mono">{evt.id}</code></span>
                <span className="text-brand-gold font-bold">Registration Deadline: {formatDate(evt.registrationDeadline)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
