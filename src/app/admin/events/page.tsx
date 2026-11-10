"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { WSCEvent, EventStatus } from "@/types";
import { 
  Trophy, 
  Timer, 
  Settings2, 
  CheckCircle2, 
  AlertCircle,
  X,
  Edit2
} from "lucide-react";
import { formatNaira, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<WSCEvent[]>(store.getEvents());
  const [editingParamsEvent, setEditingParamsEvent] = useState<WSCEvent | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Edit Parameters Form State
  const [maxTeams, setMaxTeams] = useState(16);
  const [squadSize, setSquadSize] = useState(7);
  const [playersOnPitch, setPlayersOnPitch] = useState(5);
  const [prizePoolTotal, setPrizePoolTotal] = useState(80000);
  const [prizeFirst, setPrizeFirst] = useState(50000);
  const [prizeSecond, setPrizeSecond] = useState(20000);
  const [prizeThird, setPrizeThird] = useState(10000);
  const [halfDuration, setHalfDuration] = useState(20);
  const [gracePeriod, setGracePeriod] = useState(15);
  const [yellowCardFine, setYellowCardFine] = useState(1000);
  const [redCardFine, setRedCardFine] = useState(3000);
  const [registrationFee, setRegistrationFee] = useState(10000);

  const openParamEditor = (evt: WSCEvent) => {
    setEditingParamsEvent(evt);
    setMaxTeams(evt.maxTeams || 16);
    setSquadSize(evt.squadSize || 7);
    setPlayersOnPitch(evt.playersOnPitch || 5);
    setPrizePoolTotal(evt.prizePoolTotal || 80000);
    setPrizeFirst(evt.prizeFirst || 50000);
    setPrizeSecond(evt.prizeSecond || 20000);
    setPrizeThird(evt.prizeThird || 10000);
    setHalfDuration(evt.halfDurationMinutes || 20);
    setGracePeriod(evt.gracePeriodMinutes || 15);
    setYellowCardFine(evt.yellowCardFine || 1000);
    setRedCardFine(evt.redCardFine || 3000);
    setRegistrationFee(evt.registrationFee || 10000);
  };

  const handleSaveParameters = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParamsEvent) return;

    store.updateEventTournamentParameters(editingParamsEvent.id, {
      maxTeams,
      squadSize,
      playersOnPitch,
      prizePoolTotal,
      prizeFirst,
      prizeSecond,
      prizeThird,
      halfDurationMinutes: halfDuration,
      gracePeriodMinutes: gracePeriod,
      yellowCardFine,
      redCardFine,
    });

    store.updateEvent({
      id: editingParamsEvent.id,
      registrationFee,
    });

    store.addAuditLog({
      adminUserId: "admin-director",
      adminName: "Tournament Director",
      action: "UPDATE_TOURNAMENT_PARAMETERS",
      entityType: "WSCEvent",
      entityId: editingParamsEvent.id,
      details: `Updated parameters for ${editingParamsEvent.title}: ${maxTeams} Teams, ${squadSize} Squad (${playersOnPitch} on pitch), ₦${prizePoolTotal.toLocaleString()} Prize Pool, ${halfDuration}+${halfDuration}m duration, ${gracePeriod}m grace period.`,
    });

    setEvents([...store.getEvents()]);
    setEditingParamsEvent(null);
    setStatusMessage("Tournament parameters saved successfully. Public platform values updated.");
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleStatusChange = (eventId: string, newStatus: EventStatus) => {
    store.updateEvent({ id: eventId, status: newStatus });
    setEvents([...store.getEvents()]);
    store.addAuditLog({
      adminUserId: "admin-director",
      adminName: "Tournament Director",
      action: "UPDATE_EVENT_STATUS",
      entityType: "WSCEvent",
      entityId: eventId,
      details: `Changed event status to ${newStatus}`,
    });
    setStatusMessage(`Event status updated to "${newStatus}".`);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Events Engine & Parameters
          </h1>
          <p className="text-xs text-muted-foreground">
            Configure sports categories, dynamic tournament numbers, prizes, duration, and fines
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-[6px] border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Events Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {events.map((evt) => {
          const isFootball = evt.categoryId === "football";

          return (
            <div
              key={evt.id}
              className="rounded-[6px] border border-border bg-card p-5 space-y-4 shadow-subtle flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-[6px] bg-muted flex items-center justify-center text-foreground border border-border">
                      {isFootball ? <Trophy className="w-3.5 h-3.5 text-primary" /> : <Timer className="w-3.5 h-3.5 text-muted-foreground" />}
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {evt.edition}
                    </span>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={evt.status}
                    onChange={(e) => handleStatusChange(evt.id, e.target.value as EventStatus)}
                    className="px-2.5 py-1 rounded-[6px] bg-background border border-border text-xs text-foreground font-medium focus:outline-none focus:ring-1 focus:ring-primary"
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
                  <h3 className="text-base font-bold text-foreground">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {evt.venue} • {formatDate(evt.startDate)}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {evt.description}
                </p>

                {/* Live Dynamic Parameter Snapshot */}
                <div className="p-3 rounded-[6px] bg-muted/40 border border-border space-y-2 text-xs">
                  <div className="text-[11px] font-semibold text-foreground uppercase tracking-wider">
                    Dynamic Tournament Parameters
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                    <div>Draw: <strong className="text-foreground">{evt.maxTeams} Teams</strong></div>
                    <div>Squad: <strong className="text-foreground">{evt.squadSize} ({evt.playersOnPitch} on pitch)</strong></div>
                    <div>Prize Pool: <strong className="text-primary font-mono">{formatNaira(evt.prizePoolTotal)}</strong></div>
                    <div>Match Duration: <strong className="text-foreground">{evt.halfDurationMinutes} + {evt.halfDurationMinutes} Min</strong></div>
                    <div>Grace Period: <strong className="text-foreground">{evt.gracePeriodMinutes} Mins</strong></div>
                    <div>Yellow / Red Fine: <strong className="text-foreground">{formatNaira(evt.yellowCardFine)} / {formatNaira(evt.redCardFine)}</strong></div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground text-[11px] font-mono">
                  ID: {evt.id}
                </span>
                <button
                  type="button"
                  onClick={() => openParamEditor(evt)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Configure Parameters</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* PARAMETERS CONFIGURATION MODAL */}
      {editingParamsEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Configure Tournament Parameters
                </h3>
                <p className="text-xs text-muted-foreground">
                  Editing live numbers for {editingParamsEvent.title}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingParamsEvent(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveParameters} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-foreground block">Max Teams</label>
                  <input
                    type="number"
                    min={2}
                    max={64}
                    value={maxTeams}
                    onChange={(e) => setMaxTeams(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono"
                  />
                  <span className="text-[10px] text-muted-foreground">e.g. 16 Teams</span>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-foreground block">Squad Size</label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={squadSize}
                    onChange={(e) => setSquadSize(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono"
                  />
                  <span className="text-[10px] text-muted-foreground">e.g. 7 Players</span>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-foreground block">Players on Pitch</label>
                  <input
                    type="number"
                    min={1}
                    max={11}
                    value={playersOnPitch}
                    onChange={(e) => setPlayersOnPitch(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono"
                  />
                  <span className="text-[10px] text-muted-foreground">e.g. 5 on Pitch</span>
                </div>
              </div>

              {/* Financials & Prize Pool */}
              <div className="pt-2 border-t border-border">
                <div className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">
                  Prize Pool & Financials
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-medium text-foreground block">Total Cash Prize Pool (₦)</label>
                    <input
                      type="number"
                      step={1000}
                      value={prizePoolTotal}
                      onChange={(e) => setPrizePoolTotal(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                    <span className="text-[10px] text-muted-foreground">e.g. ₦80,000</span>
                  </div>

                  <div className="space-y-1">
                    <label className="font-medium text-foreground block">Registration Fee (₦)</label>
                    <input
                      type="number"
                      step={500}
                      value={registrationFee}
                      onChange={(e) => setRegistrationFee(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                    <span className="text-[10px] text-muted-foreground">e.g. ₦10,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">1st Prize (₦)</label>
                    <input
                      type="number"
                      value={prizeFirst}
                      onChange={(e) => setPrizeFirst(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">2nd Prize (₦)</label>
                    <input
                      type="number"
                      value={prizeSecond}
                      onChange={(e) => setPrizeSecond(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">3rd Prize (₦)</label>
                    <input
                      type="number"
                      value={prizeThird}
                      onChange={(e) => setPrizeThird(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Match Officiating & Duration */}
              <div className="pt-2 border-t border-border">
                <div className="text-[11px] font-semibold text-foreground uppercase tracking-wider mb-2">
                  Match Duration & Fines
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">Half (Mins)</label>
                    <input
                      type="number"
                      value={halfDuration}
                      onChange={(e) => setHalfDuration(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                    <span className="text-[10px] text-muted-foreground">{halfDuration} + {halfDuration} Min</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">Grace (Mins)</label>
                    <input
                      type="number"
                      value={gracePeriod}
                      onChange={(e) => setGracePeriod(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                    <span className="text-[10px] text-muted-foreground">{gracePeriod} Mins</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">Yellow Fine (₦)</label>
                    <input
                      type="number"
                      value={yellowCardFine}
                      onChange={(e) => setYellowCardFine(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground block">Red Fine (₦)</label>
                    <input
                      type="number"
                      value={redCardFine}
                      onChange={(e) => setRedCardFine(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingParamsEvent(null)}
                  className="px-3 py-1.5 rounded-[6px] border border-border text-foreground text-xs hover:bg-muted font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90"
                >
                  Save Parameters
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
