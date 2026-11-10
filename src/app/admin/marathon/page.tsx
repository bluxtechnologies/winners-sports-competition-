"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Participant, RaceResult } from "@/types";
import { Timer, CheckCircle2, Search, X } from "lucide-react";
import { formatDurationSeconds } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminMarathonPage() {
  const [participants, setParticipants] = useState<Participant[]>(store.getParticipants("e-marathon-002"));
  const [results, setResults] = useState<RaceResult[]>(store.getRaceResults("rc-10k"));
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Time recording modal
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [gunMinutes, setGunMinutes] = useState(36);
  const [gunSeconds, setGunSeconds] = useState(24);
  const [chipMinutes, setChipMinutes] = useState(36);
  const [chipSeconds, setChipSeconds] = useState(20);
  const [status, setStatus] = useState<RaceResult["status"]>("finished");

  const handleCheckInToggle = (participantId: string, currentStatus: boolean) => {
    store.updateParticipantCheckIn(participantId, !currentStatus);
    setParticipants([...store.getParticipants("e-marathon-002")]);
    store.addAuditLog({
      adminUserId: "admin-marathon",
      adminName: "Marathon Manager",
      action: !currentStatus ? "RUNNER_CHECK_IN" : "RUNNER_CHECK_OUT",
      entityType: "participant",
      entityId: participantId,
      details: `${!currentStatus ? "Checked in" : "Cancelled check in for"} participant ${participantId}`,
    });
    setNotification(`Check-in status updated.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSaveTime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParticipant) return;

    const totalGun = gunMinutes * 60 + gunSeconds;
    const totalChip = chipMinutes * 60 + chipSeconds;

    const existingResults = store.getRaceResults("rc-10k");
    const nextPos = existingResults.length + 1;

    const newResult: RaceResult = {
      id: `res-${Date.now()}`,
      raceCategoryId: selectedParticipant.raceCategoryId,
      participantId: selectedParticipant.id,
      participantName: selectedParticipant.fullName,
      bibNumber: selectedParticipant.bibNumber || "---",
      gunTimeSeconds: totalGun,
      chipTimeSeconds: totalChip,
      finishingPosition: nextPos,
      status,
    };

    store.addRaceResult(newResult);
    store.addAuditLog({
      adminUserId: "admin-marathon",
      adminName: "Marathon Manager",
      action: "RECORD_RACE_TIME",
      entityType: "race_result",
      entityId: newResult.id,
      details: `Recorded chip time ${chipMinutes}m ${chipSeconds}s for Bib #${selectedParticipant.bibNumber} (${selectedParticipant.fullName}). Position: ${nextPos}`,
    });

    setResults([...store.getRaceResults("rc-10k")]);
    setSelectedParticipant(null);
    setNotification(`Recorded finish time for Bib #${selectedParticipant.bibNumber}!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const filtered = participants.filter((p) =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.bibNumber && p.bibNumber.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Marathon Operations Console
          </h1>
          <p className="text-xs text-muted-foreground">
            Race day check-in, bib verification, chip time entry, and emergency medical registry
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search runner or bib..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-[6px] border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Participants Check-In & Details Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Participants Roster ({participants.length})</h3>
          <span className="text-xs text-muted-foreground">
            {participants.filter(p => p.checkInStatus).length} Checked In
          </span>
        </div>

        <div className="rounded-[6px] border border-border bg-card overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                <tr>
                  <th className="py-2.5 px-3">Bib #</th>
                  <th className="py-2.5 px-3">Runner Name</th>
                  <th className="py-2.5 px-3">Division</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Emergency Contact</th>
                  <th className="py-2.5 px-3">Check-In</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/20">
                    <td className="py-2.5 px-3 font-mono font-bold text-primary">
                      #{p.bibNumber || "---"}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-foreground">
                      {p.fullName}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground">
                      {p.raceCategoryName || (p.raceCategoryId === "rc-10k" ? "10K Elite" : "5K Fun Run")}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-muted-foreground">
                      {p.phone}
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-muted-foreground">
                      <div>{p.emergencyContactName} ({p.emergencyContactRelationship})</div>
                      <div className="font-mono text-[10px]">{p.emergencyContactPhone}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <button
                        onClick={() => handleCheckInToggle(p.id, p.checkInStatus)}
                        className={cn(
                          "px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase border transition-colors",
                          p.checkInStatus 
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" 
                            : "bg-muted text-muted-foreground border-border hover:text-foreground"
                        )}
                      >
                        {p.checkInStatus ? "Checked In" : "Pending"}
                      </button>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedParticipant(p)}
                        className="px-2.5 py-1 rounded-[6px] border border-border hover:bg-muted font-medium text-xs text-foreground inline-flex items-center gap-1"
                      >
                        <Timer className="w-3 h-3 text-primary" />
                        <span>Record Time</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RECORD TIME MODAL */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[6px] border border-border bg-card p-5 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  Record Finish Time
                </h3>
                <p className="text-xs text-primary font-mono font-semibold">
                  Bib #{selectedParticipant.bibNumber} • {selectedParticipant.fullName}
                </p>
              </div>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTime} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Chip Time (MM:SS)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={180}
                    value={chipMinutes}
                    onChange={(e) => setChipMinutes(parseInt(e.target.value, 10) || 0)}
                    placeholder="Mins"
                    className="w-1/2 px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono font-bold"
                  />
                  <span className="text-muted-foreground font-bold">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={chipSeconds}
                    onChange={(e) => setChipSeconds(parseInt(e.target.value, 10) || 0)}
                    placeholder="Secs"
                    className="w-1/2 px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => setSelectedParticipant(null)}
                  className="px-3 py-1.5 rounded-[6px] border border-border text-foreground hover:bg-muted font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  Save Finish Time
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
