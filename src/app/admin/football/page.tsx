"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Match, Team, MatchEvent } from "@/types";
import { 
  Trophy, 
  Shuffle, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  Video, 
  Scale, 
  Clock, 
  Users,
  ShieldCheck,
  Plus
} from "lucide-react";
import { formatNaira, getRoundLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminFootballPage() {
  const [teams, setTeams] = useState<Team[]>(store.getTeams("e-football-001"));
  const [matches, setMatches] = useState<Match[]>(store.getMatches("e-football-001"));
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Match edit modal state
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [isExtraTime, setIsExtraTime] = useState(false);
  const [scoreAExtra, setScoreAExtra] = useState(0);
  const [scoreBExtra, setScoreBExtra] = useState(0);
  const [isPenalties, setIsPenalties] = useState(false);
  const [scoreAPen, setScoreAPen] = useState(0);
  const [scoreBPen, setScoreBPen] = useState(0);
  const [winnerTeamId, setWinnerTeamId] = useState("");
  const [matchStatus, setMatchStatus] = useState<Match["status"]>("completed");
  const [matchReport, setMatchReport] = useState("");

  // Quick event addition
  const [eventType, setEventType] = useState<MatchEvent["eventType"]>("goal");
  const [eventMinute, setEventMinute] = useState(20);
  const [eventTeamId, setEventTeamId] = useState("");
  const [eventPlayerName, setEventPlayerName] = useState("");
  const [eventNotes, setEventNotes] = useState("");

  const openMatchEditor = (match: Match) => {
    setSelectedMatch(match);
    setScoreA(match.scoreA || 0);
    setScoreB(match.scoreB || 0);
    setIsExtraTime(match.isExtraTime || false);
    setScoreAExtra(match.scoreAExtraTime || 0);
    setScoreBExtra(match.scoreBExtraTime || 0);
    setIsPenalties(match.isPenaltyShootout || false);
    setScoreAPen(match.scoreAPenalties || 0);
    setScoreBPen(match.scoreBPenalties || 0);
    setWinnerTeamId(match.winnerTeamId || match.teamAId || "");
    setMatchStatus(match.status);
    setMatchReport(match.matchReport || "");
    setEventTeamId(match.teamAId || "");
  };

  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    store.updateMatch({
      id: selectedMatch.id,
      scoreA,
      scoreB,
      isExtraTime,
      scoreAExtraTime: isExtraTime ? scoreAExtra : 0,
      scoreBExtraTime: isExtraTime ? scoreBExtra : 0,
      isPenaltyShootout: isPenalties,
      scoreAPenalties: isPenalties ? scoreAPen : 0,
      scoreBPenalties: isPenalties ? scoreBPen : 0,
      winnerTeamId,
      status: matchStatus,
      matchReport,
    });

    store.addAuditLog({
      adminUserId: "admin-football",
      adminName: "Match Coordinator",
      action: "UPDATE_MATCH_SCORE",
      entityType: "match",
      entityId: selectedMatch.id,
      details: `Updated Match #${selectedMatch.matchNumber} (${getRoundLabel(selectedMatch.round)}). Score: ${scoreA} - ${scoreB}. Winner: ${winnerTeamId}`,
    });

    setMatches([...store.getMatches("e-football-001")]);
    setSelectedMatch(null);
    setNotification(`Match #${selectedMatch.matchNumber} result recorded.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    let fineAmount = 0;
    if (eventType === "yellow_card") fineAmount = 1000;
    if (eventType === "red_card") fineAmount = 3000;

    store.addMatchEvent(selectedMatch.id, {
      teamId: eventTeamId,
      playerName: eventPlayerName,
      eventType,
      minute: eventMinute,
      fineAmount: fineAmount > 0 ? fineAmount : undefined,
      fineStatus: fineAmount > 0 ? "pending" : "not_applicable",
      notes: eventNotes || undefined,
    });

    store.addAuditLog({
      adminUserId: "admin-football",
      adminName: "Match Coordinator",
      action: "LOG_MATCH_EVENT",
      entityType: "match_event",
      entityId: selectedMatch.id,
      details: `Logged ${eventType} at minute ${eventMinute} for ${eventPlayerName}. Fine: ₦${fineAmount}`,
    });

    setMatches([...store.getMatches("e-football-001")]);
    setSelectedMatch(store.getMatchById(selectedMatch.id) || null);
    setEventPlayerName("");
    setEventNotes("");
    setNotification(`Logged ${eventType} on Match #${selectedMatch.matchNumber}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRandomDraw = () => {
    if (confirm("Perform a random draw simulation for all 16 confirmed teams?")) {
      const shuffled = [...teams].sort(() => Math.random() - 0.5);
      shuffled.forEach((team, index) => {
        team.seedNumber = index + 1;
        team.bracketPosition = index + 1;
      });
      setTeams(shuffled);
      store.addAuditLog({
        adminUserId: "admin-director",
        adminName: "Tournament Director",
        action: "EXECUTE_RANDOM_DRAW",
        entityType: "tournament",
        entityId: "e-football-001",
        details: "Executed official random seed draw for 16 teams with departmental witnesses.",
      });
      setNotification("Random draw executed and seeds allocated!");
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Football Operations Console
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage the 16-team knockout bracket, match sheets, scores, card fines and phone video reviews
          </p>
        </div>

        <button
          onClick={handleRandomDraw}
          className="px-4 py-2.5 rounded-xl border border-brand-gold/40 bg-amber-500/10 text-brand-gold font-bold text-xs hover:bg-amber-500/20 flex items-center gap-2 active:scale-[0.96] transition-all"
        >
          <Shuffle className="w-4 h-4" />
          <span>Simulate Random Draw</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
          <span>{notification}</span>
        </div>
      )}

      {/* Matches Management List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-base text-white">All 16 Tournament Matches</h3>
        <div className="border border-white/10 rounded-2xl overflow-hidden bg-card/60">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3.5">#</th>
                  <th className="p-3.5">Round</th>
                  <th className="p-3.5">Team A</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Team B</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Cards / Fines</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {matches.map((m) => {
                  const yellowCount = m.events?.filter((e) => e.eventType === "yellow_card").length || 0;
                  const redCount = m.events?.filter((e) => e.eventType === "red_card").length || 0;

                  return (
                    <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-mono text-muted-foreground">
                        M#{m.matchNumber}
                      </td>
                      <td className="p-3.5 font-bold text-brand-gold">
                        {getRoundLabel(m.round)}
                      </td>
                      <td className="p-3.5 font-semibold text-white">
                        {m.teamA?.name || "TBD"}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-sm text-white">
                        {m.status === "scheduled" ? "-" : `${m.scoreA} : ${m.scoreB}`}
                        {m.isPenaltyShootout && (
                          <span className="text-[10px] text-amber-400 block">({m.scoreAPenalties} - {m.scoreBPenalties} pen)</span>
                        )}
                      </td>
                      <td className="p-3.5 font-semibold text-white">
                        {m.teamB?.name || "TBD"}
                      </td>
                      <td className="p-3.5">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          m.status === "completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                        )}>
                          {m.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-[11px] text-muted-foreground">
                        {yellowCount > 0 && <span className="text-amber-400 mr-2">{yellowCount}Y (₦{yellowCount * 1000})</span>}
                        {redCount > 0 && <span className="text-red-400">{redCount}R (₦{redCount * 3000})</span>}
                        {yellowCount === 0 && redCount === 0 && "-"}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => openMatchEditor(m)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-brand-gold hover:text-brand-gold font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Record / Edit</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MATCH EDITOR MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-white/20 bg-slate-900 p-6 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-white">
                  Record Match #{selectedMatch.matchNumber} ({getRoundLabel(selectedMatch.round)})
                </h3>
                <p className="text-xs text-muted-foreground">
                  {selectedMatch.teamA?.name || "Team A"} vs {selectedMatch.teamB?.name || "Team B"}
                </p>
              </div>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-xs font-bold text-muted-foreground hover:text-white"
              >
                ✕ Close
              </button>
            </div>

            {/* Score & Winner Form */}
            <form onSubmit={handleSaveMatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <label className="font-bold text-white truncate block">
                    {selectedMatch.teamA?.name || "Team A"} Score
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={scoreA}
                    onChange={(e) => setScoreA(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono text-lg font-bold"
                  />
                </div>

                <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <label className="font-bold text-white truncate block">
                    {selectedMatch.teamB?.name || "Team B"} Score
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={scoreB}
                    onChange={(e) => setScoreB(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-mono text-lg font-bold"
                  />
                </div>
              </div>

              {/* Extra Time & Penalty Toggles */}
              <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.01] space-y-3">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isExtraTime}
                      onChange={(e) => setIsExtraTime(e.target.checked)}
                      className="rounded text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-white font-semibold">Tied: 5 Mins Extra Time Played</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPenalties}
                      onChange={(e) => setIsPenalties(e.target.checked)}
                      className="rounded text-brand-gold focus:ring-brand-gold"
                    />
                    <span className="text-white font-semibold">Penalty Shootout</span>
                  </label>
                </div>

                {isPenalties && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-muted-foreground">Team A Penalty Kicks</label>
                      <input
                        type="number"
                        min={0}
                        value={scoreAPen}
                        onChange={(e) => setScoreAPen(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-muted-foreground">Team B Penalty Kicks</label>
                      <input
                        type="number"
                        min={0}
                        value={scoreBPen}
                        onChange={(e) => setScoreBPen(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Winner Selector */}
              <div className="space-y-1.5">
                <label className="font-bold text-white">Winner Advancing</label>
                <select
                  value={winnerTeamId}
                  onChange={(e) => setWinnerTeamId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-white font-semibold"
                >
                  <option value="">Select advancing winner</option>
                  {selectedMatch.teamA && <option value={selectedMatch.teamA.id}>{selectedMatch.teamA.name}</option>}
                  {selectedMatch.teamB && <option value={selectedMatch.teamB.id}>{selectedMatch.teamB.name}</option>}
                </select>
              </div>

              {/* Match Report */}
              <div className="space-y-1.5">
                <label className="font-bold text-white">Match Coordinator Notes</label>
                <textarea
                  value={matchReport}
                  onChange={(e) => setMatchReport(e.target.value)}
                  placeholder="Goals summary, stoppages, injuries..."
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold hover:bg-amber-400"
                >
                  Save Result
                </button>
              </div>
            </form>

            {/* Quick Add Match Event / Cards / Video Review */}
            <form onSubmit={handleAddEvent} className="border-t border-white/10 pt-4 space-y-3 text-xs">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-gold" />
                <span>Log Goal / Card Fine / Video Review</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <label className="text-muted-foreground">Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-white font-semibold"
                  >
                    <option value="goal">Goal</option>
                    <option value="yellow_card">Yellow Card (₦1,000 fine)</option>
                    <option value="red_card">Red Card (₦3,000 fine + ban)</option>
                    <option value="var_review">Phone Video Review</option>
                    <option value="substitution">Substitution</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground">Minute</label>
                  <input
                    type="number"
                    min={1}
                    max={45}
                    value={eventMinute}
                    onChange={(e) => setEventMinute(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-white font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-muted-foreground">Player Name / Recipient</label>
                  <input
                    type="text"
                    value={eventPlayerName}
                    onChange={(e) => setEventPlayerName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Add Event to Match Sheet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
