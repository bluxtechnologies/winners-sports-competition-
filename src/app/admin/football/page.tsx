"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Match, Team, MatchEvent } from "@/types";
import { 
  Trophy, 
  Shuffle, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  Users, 
  Copy, 
  Check, 
  Plus, 
  X,
  Video
} from "lucide-react";
import { formatNaira, getRoundLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminFootballPage() {
  const [teams, setTeams] = useState<Team[]>(store.getTeams("e-football-001"));
  const [matches, setMatches] = useState<Match[]>(store.getMatches("e-football-001"));
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [selectedTeamRoster, setSelectedTeamRoster] = useState<Team | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

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

  const event = store.getEventById("e-football-001");
  const yellowFine = event?.yellowCardFine || 1000;
  const redFine = event?.redCardFine || 3000;

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

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
      details: `Updated Match #${selectedMatch.matchNumber} (${getRoundLabel(selectedMatch.round)}). Score: ${scoreA} - ${scoreB}. Status: ${matchStatus}`,
    });

    setMatches([...store.getMatches("e-football-001")]);
    setSelectedMatch(null);
    setNotification(`Match #${selectedMatch.matchNumber} result recorded.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMatch) return;

    const fineAmount = eventType === "yellow_card" ? yellowFine : eventType === "red_card" ? redFine : undefined;

    store.addMatchEvent(selectedMatch.id, {
      teamId: eventTeamId || selectedMatch.teamAId || "",
      playerName: eventPlayerName || "Squad Player",
      eventType,
      minute: eventMinute,
      fineAmount,
      fineStatus: fineAmount ? "pending" : "not_applicable",
    });

    store.addAuditLog({
      adminUserId: "admin-football",
      adminName: "Match Coordinator",
      action: "ADD_MATCH_EVENT",
      entityType: "match_event",
      entityId: selectedMatch.id,
      details: `Logged ${eventType} at minute ${eventMinute} for ${eventPlayerName}. Fine: ${fineAmount ? formatNaira(fineAmount) : 'None'}`,
    });

    setMatches([...store.getMatches("e-football-001")]);
    setSelectedMatch(store.getMatchById(selectedMatch.id) || null);
    setEventPlayerName("");
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
        details: "Executed official random seed draw for 16 teams with official witnesses.",
      });
      setNotification("Random draw executed and seeds allocated!");
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Football Operations Console
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage tournament fixtures, live match scores, team invitation codes, rosters, and card fines
          </p>
        </div>

        <button
          onClick={handleRandomDraw}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors"
        >
          <Shuffle className="w-3.5 h-3.5 text-primary" />
          <span>Simulate Random Draw</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-[6px] border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Teams Roster & Invite Codes Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Registered Teams ({teams.length})</h3>
          <span className="text-xs text-muted-foreground">Captains and shareable player invite codes</span>
        </div>

        <div className="rounded-[6px] border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                <tr>
                  <th className="py-2.5 px-3">Team Name</th>
                  <th className="py-2.5 px-3">Code</th>
                  <th className="py-2.5 px-3">Captain</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Roster Size</th>
                  <th className="py-2.5 px-3">Invitation Code</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teams.map((t) => (
                  <tr key={t.id} className="hover:bg-muted/20">
                    <td className="py-2.5 px-3 font-semibold text-foreground">
                      {t.name}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-muted-foreground">
                      {t.shortCode}
                    </td>
                    <td className="py-2.5 px-3 text-foreground">
                      {t.captainName}
                    </td>
                    <td className="py-2.5 px-3 text-muted-foreground font-mono text-[11px]">
                      {t.captainPhone}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-foreground font-medium">{t.players.length}</span>
                      <span className="text-muted-foreground text-[11px]">/{event?.squadSize || 7}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="inline-flex items-center gap-1 font-mono font-semibold bg-muted px-2 py-0.5 rounded-[4px] border border-border text-[11px]">
                        <span>{t.inviteCode}</span>
                        <button
                          onClick={() => copyCode(t.inviteCode)}
                          className="p-0.5 text-muted-foreground hover:text-foreground"
                          title="Copy Code"
                        >
                          {copiedCode === t.inviteCode ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => setSelectedTeamRoster(t)}
                        className="px-2.5 py-1 rounded-[6px] border border-border hover:bg-muted font-medium text-xs text-foreground inline-flex items-center gap-1"
                      >
                        <Users className="w-3 h-3 text-primary" />
                        <span>View Roster</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Matches Management List */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-semibold text-foreground">Tournament Matches ({matches.length})</h3>
        <div className="rounded-[6px] border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Round</th>
                  <th className="py-2.5 px-3">Team A</th>
                  <th className="py-2.5 px-3">Score</th>
                  <th className="py-2.5 px-3">Team B</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Disciplinary Cards</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {matches.map((m) => {
                  const yellowCount = m.events?.filter((e) => e.eventType === "yellow_card").length || 0;
                  const redCount = m.events?.filter((e) => e.eventType === "red_card").length || 0;

                  return (
                    <tr key={m.id} className="hover:bg-muted/20">
                      <td className="py-2.5 px-3 font-mono text-muted-foreground">
                        M#{m.matchNumber}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-foreground">
                        {getRoundLabel(m.round)}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-foreground">
                        {m.teamA?.name || "TBD"}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-foreground">
                        {m.status === "scheduled" ? "-" : `${m.scoreA} : ${m.scoreB}`}
                        {m.isPenaltyShootout && (
                          <span className="text-[10px] text-muted-foreground block font-normal">
                            ({m.scoreAPenalties} - {m.scoreBPenalties} pen)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-foreground">
                        {m.teamB?.name || "TBD"}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={cn(
                          "px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase border",
                          m.status === "completed" 
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" 
                            : "bg-muted text-muted-foreground border-border"
                        )}>
                          {m.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-muted-foreground">
                        {yellowCount > 0 && <span className="text-amber-600 dark:text-amber-400 mr-2">{yellowCount}Y ({formatNaira(yellowCount * yellowFine)})</span>}
                        {redCount > 0 && <span className="text-red-600 dark:text-red-400">{redCount}R ({formatNaira(redCount * redFine)})</span>}
                        {yellowCount === 0 && redCount === 0 && "-"}
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => openMatchEditor(m)}
                          className="px-2.5 py-1 rounded-[6px] border border-border hover:bg-muted font-medium text-xs transition-colors inline-flex items-center gap-1 text-foreground"
                        >
                          <Edit3 className="w-3 h-3 text-primary" />
                          <span>Record Result</span>
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

      {/* TEAM ROSTER MODAL */}
      {selectedTeamRoster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-[6px] border border-border bg-card p-6 space-y-4 shadow-subtle my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  {selectedTeamRoster.name} Roster
                </h3>
                <p className="text-xs text-muted-foreground">
                  Captain: {selectedTeamRoster.captainName} • Invite Code: <strong className="text-foreground font-mono">{selectedTeamRoster.inviteCode}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTeamRoster(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="divide-y divide-border border border-border rounded-[6px] text-xs">
              {selectedTeamRoster.players.map((p) => (
                <div key={p.id} className="p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-primary w-6 text-center">#{p.jerseyNumber}</span>
                    <span className="font-medium text-foreground">{p.fullName}</span>
                    {p.isCaptain && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-[4px] bg-primary/10 text-primary border border-primary/20">
                        Captain
                      </span>
                    )}
                  </div>
                  <div className="text-muted-foreground text-[11px] font-mono">
                    {p.phone}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedTeamRoster(null)}
                className="px-3.5 py-1.5 rounded-[6px] border border-border text-foreground text-xs hover:bg-muted font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MATCH EDITOR MODAL */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle my-8">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-base text-foreground">
                  Record Match #{selectedMatch.matchNumber} ({getRoundLabel(selectedMatch.round)})
                </h3>
                <p className="text-xs text-muted-foreground">
                  {selectedMatch.teamA?.name || "Team A"} vs {selectedMatch.teamB?.name || "Team B"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Score & Winner Form */}
            <form onSubmit={handleSaveMatch} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1 p-3 rounded-[6px] bg-muted/30 border border-border">
                  <label className="font-medium text-foreground truncate block">
                    {selectedMatch.teamA?.name || "Team A"} Score
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={scoreA}
                    onChange={(e) => setScoreA(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono text-base font-bold"
                  />
                </div>

                <div className="space-y-1 p-3 rounded-[6px] bg-muted/30 border border-border">
                  <label className="font-medium text-foreground truncate block">
                    {selectedMatch.teamB?.name || "Team B"} Score
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={scoreB}
                    onChange={(e) => setScoreB(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-mono text-base font-bold"
                  />
                </div>
              </div>

              {/* Extra Time & Penalty Toggles */}
              <div className="p-3 rounded-[6px] border border-border bg-muted/20 space-y-2.5">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isExtraTime}
                      onChange={(e) => setIsExtraTime(e.target.checked)}
                      className="rounded-[4px] border-border text-primary focus:ring-primary"
                    />
                    <span className="text-foreground font-medium">Extra Time Played</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPenalties}
                      onChange={(e) => setIsPenalties(e.target.checked)}
                      className="rounded-[4px] border-border text-primary focus:ring-primary"
                    />
                    <span className="text-foreground font-medium">Penalty Shootout</span>
                  </label>
                </div>

                {isPenalties && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground block">{selectedMatch.teamA?.shortCode} Penalties</label>
                      <input
                        type="number"
                        min={0}
                        value={scoreAPen}
                        onChange={(e) => setScoreAPen(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-2.5 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-muted-foreground block">{selectedMatch.teamB?.shortCode} Penalties</label>
                      <input
                        type="number"
                        min={0}
                        value={scoreBPen}
                        onChange={(e) => setScoreBPen(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-2.5 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Winner Selector */}
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Winner Advancing</label>
                <select
                  value={winnerTeamId}
                  onChange={(e) => setWinnerTeamId(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground font-medium"
                >
                  <option value="">Select advancing winner</option>
                  {selectedMatch.teamA && <option value={selectedMatch.teamA.id}>{selectedMatch.teamA.name}</option>}
                  {selectedMatch.teamB && <option value={selectedMatch.teamB.id}>{selectedMatch.teamB.name}</option>}
                </select>
              </div>

              {/* Match Report */}
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Match Coordinator Report</label>
                <textarea
                  value={matchReport}
                  onChange={(e) => setMatchReport(e.target.value)}
                  placeholder="Goals summary, stoppages, injuries..."
                  rows={2}
                  className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="px-3 py-1.5 rounded-[6px] border border-border text-foreground font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
                >
                  Save Result
                </button>
              </div>
            </form>

            {/* Quick Add Match Event / Cards */}
            <form onSubmit={handleAddEvent} className="border-t border-border pt-4 space-y-3 text-xs">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-primary" />
                <span>Log Disciplinary Card / Goal Event</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="space-y-1">
                  <label className="text-muted-foreground block text-[11px]">Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground"
                  >
                    <option value="goal">Goal</option>
                    <option value="yellow_card">Yellow Card ({formatNaira(yellowFine)})</option>
                    <option value="red_card">Red Card ({formatNaira(redFine)})</option>
                    <option value="var_review">Phone Video Review</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-muted-foreground block text-[11px]">Minute</label>
                  <input
                    type="number"
                    min={1}
                    max={45}
                    value={eventMinute}
                    onChange={(e) => setEventMinute(parseInt(e.target.value, 10) || 1)}
                    className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-muted-foreground block text-[11px]">Player Name</label>
                  <input
                    type="text"
                    value={eventPlayerName}
                    onChange={(e) => setEventPlayerName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full px-2 py-1 rounded-[6px] border border-input bg-background text-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-3 py-1 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground font-medium"
                >
                  Add Card/Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
