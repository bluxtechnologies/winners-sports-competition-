"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Participant, RaceResult } from "@/types";
import { Timer, CheckCircle2, ShieldCheck, Heart, Award, Plus, Search, UserCheck } from "lucide-react";
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Marathon Operations Console
          </h1>
          <p className="text-xs text-muted-foreground">
            Race day check-in, bib verification, chip time entry, and emergency medical registry
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search runner or bib..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-brand-emerald"
          />
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
          <span>{notification}</span>
        </div>
      )}

      {/* Runner Check-In & Bib List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-white">Runner Check-in & Medical Register</h3>
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-card/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">Bib</th>
                  <th className="p-3.5">Runner Name</th>
                  <th className="p-3.5">Division</th>
                  <th className="p-3.5">Matric</th>
                  <th className="p-3.5">Emergency Contact</th>
                  <th className="p-3.5">Medical Notes</th>
                  <th className="p-3.5">Check-In</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-mono font-black text-brand-emerald text-sm">
                      #{p.bibNumber || "---"}
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      {p.fullName}
                    </td>
                    <td className="p-3.5 text-muted-foreground">
                      {p.raceCategoryName || (p.raceCategoryId === "rc-10k" ? "10K Elite" : "5K Fun Run")}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-white/70">
                      {p.matricNumber || "Guest"}
                    </td>
                    <td className="p-3.5 text-[11px] text-muted-foreground">
                      <div>{p.emergencyContactName}</div>
                      <div className="font-mono text-[10px] text-white/60">{p.emergencyContactPhone}</div>
                    </td>
                    <td className="p-3.5 text-[11px] text-amber-300/80 max-w-xs truncate">
                      {p.medicalNotes || "None"}
                    </td>
                    <td className="p-3.5">
                      <button
                        onClick={() => handleCheckInToggle(p.id, p.checkInStatus)}
                        className={cn(
                          "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-colors",
                          p.checkInStatus ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-white/5 text-muted-foreground border border-white/10 hover:text-white"
                        )}
                      >
                        {p.checkInStatus ? "Checked In" : "Pending"}
                      </button>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          setSelectedParticipant(p);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-emerald hover:text-brand-emerald font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                      >
                        <Timer className="w-3 h-3" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-white/20 bg-slate-900 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-white">
                  Record Finish Time
                </h3>
                <p className="text-xs text-brand-emerald font-mono font-bold">
                  Bib #{selectedParticipant.bibNumber} • {selectedParticipant.fullName}
                </p>
              </div>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="text-xs font-bold text-muted-foreground hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleSaveTime} className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="font-bold text-white">Chip Time (MM:SS) *</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={180}
                    value={chipMinutes}
                    onChange={(e) => setChipMinutes(parseInt(e.target.value, 10) || 0)}
                    placeholder="Minutes"
                    className="w-1/2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono font-bold text-base"
                  />
                  <span className="text-white font-bold">:</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={chipSeconds}
                    onChange={(e) => setChipSeconds(parseInt(e.target.value, 10) || 0)}
                    placeholder="Seconds"
                    className="w-1/2 px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white font-mono font-bold text-base"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white">Finish Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white font-semibold"
                >
                  <option value="finished">Finished (Valid)</option>
                  <option value="dnf">Did Not Finish (DNF)</option>
                  <option value="dq">Disqualified (DQ)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedParticipant(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-brand-emerald text-white font-extrabold hover:bg-emerald-600"
                >
                  Save Time & Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
