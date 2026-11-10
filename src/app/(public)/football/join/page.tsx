"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Trophy, 
  Users, 
  UserPlus, 
  CheckCircle2, 
  ArrowLeft, 
  AlertCircle
} from "lucide-react";
import { store } from "@/services/store";
import { Team, TeamPlayer } from "@/types";
import { cn } from "@/lib/utils";

function FootballJoinContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams?.get("code") || "";

  const [inviteCode, setInviteCode] = useState(initialCode);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinedSuccess, setJoinedSuccess] = useState<{
    team: Team;
    player: TeamPlayer;
  } | null>(null);

  // Auto-lookup matched team when code changes
  const matchedTeam = inviteCode.trim().length >= 4 
    ? store.getTeamByInviteCode(inviteCode.trim()) 
    : null;

  const event = matchedTeam ? store.getEventById(matchedTeam.eventId) : store.getEventById("e-football-001");
  const maxSquad = event?.squadSize || 7;

  useEffect(() => {
    if (initialCode) {
      setInviteCode(initialCode.toUpperCase());
    }
  }, [initialCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanCode = inviteCode.trim().toUpperCase();
    if (!cleanCode) {
      setError("Please enter your team invitation code.");
      return;
    }

    if (!fullName.trim() || !email.trim() || !phone.trim() || !jerseyNumber.trim()) {
      setError("Please fill out all player fields.");
      return;
    }

    const jerseyNum = parseInt(jerseyNumber, 10);
    if (isNaN(jerseyNum) || jerseyNum < 1 || jerseyNum > 99) {
      setError("Please choose a valid jersey number between 1 and 99.");
      return;
    }

    const team = store.getTeamByInviteCode(cleanCode);
    if (!team) {
      setError("Invalid invitation code. Please confirm the exact code with your team captain.");
      return;
    }

    // Check taken jersey
    const existingJersey = team.players.find(p => p.jerseyNumber === jerseyNum);
    if (existingJersey) {
      setError(`Jersey #${jerseyNum} is already taken by ${existingJersey.fullName}. Please choose a different number.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = store.joinTeamWithInviteCode(cleanCode, {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        jerseyNumber: jerseyNum,
      });

      if (!res.success || !res.player) {
        setError(res.error || "Failed to join team. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setJoinedSuccess({
        team: store.getTeamById(team.id) || team,
        player: res.player,
      });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-xl py-12 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <Link 
          href="/football" 
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Football Competition
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Join Team Roster
        </h1>
        <p className="text-xs text-muted-foreground">
          Enter your captain's invitation code to join your team's official 7-player squad roster.
        </p>
      </div>

      {/* Success State */}
      {joinedSuccess ? (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-9 h-9 rounded-[6px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Successfully Joined Team Roster
              </h2>
              <p className="text-xs text-muted-foreground">
                Welcome to <strong className="text-foreground">{joinedSuccess.team.name}</strong>
              </p>
            </div>
          </div>

          <div className="p-4 rounded-[6px] bg-muted/30 border border-border space-y-2.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Player Name:</span>
              <strong className="text-foreground">{joinedSuccess.player.fullName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Jersey Number:</span>
              <strong className="text-primary font-mono font-bold">#{joinedSuccess.player.jerseyNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Team Captain:</span>
              <span className="text-foreground">{joinedSuccess.team.captainName}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">Roster Status:</span>
              <span className="text-foreground font-semibold">
                {joinedSuccess.team.players.length} / {maxSquad} Players Registered
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-foreground">Current Team Roster:</div>
            <div className="border border-border rounded-[6px] divide-y divide-border text-xs">
              {joinedSuccess.team.players.map((p) => (
                <div key={p.id} className="p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-muted-foreground text-[11px]">#{p.jerseyNumber}</span>
                    <span className="font-medium text-foreground">{p.fullName}</span>
                    {p.isCaptain && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-[6px] bg-primary/10 text-primary border border-primary/20">
                        Captain
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{p.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <Link
              href="/football"
              className="px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90"
            >
              View Tournament Fixtures & Bracket
            </Link>
          </div>
        </div>
      ) : (
        /* Join Form */
        <form onSubmit={handleSubmit} className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle">
          {error && (
            <div className="p-3 rounded-[6px] bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Invitation Code Input */}
          <div className="space-y-1.5 text-xs">
            <label className="font-medium text-foreground block">
              Team Invitation Code <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="e.g. WFC-ENG-4912"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground font-mono uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <span className="text-[11px] text-muted-foreground block">
              Ask your team captain for the 12-character invitation code.
            </span>
          </div>

          {/* Matched Team Preview */}
          {matchedTeam && (
            <div className="p-3 rounded-[6px] bg-primary/5 border border-primary/20 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-primary">Matched Team:</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                  {matchedTeam.players.length}/{maxSquad} Players
                </span>
              </div>
              <div className="font-bold text-foreground text-sm">{matchedTeam.name} ({matchedTeam.shortCode})</div>
              <div className="text-[11px] text-muted-foreground">
                Captain: <strong className="text-foreground">{matchedTeam.captainName}</strong>
              </div>
            </div>
          )}

          {/* Player Personal Details */}
          <div className="pt-2 border-t border-border space-y-4 text-xs">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">
              Your Player Information
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Emeka Nwosu"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="player@student.sdu.edu.ng"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Phone Number <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0803 123 4567"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Desired Jersey Number (1-99) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min={1}
                max={99}
                required
                value={jerseyNumber}
                onChange={(e) => setJerseyNumber(e.target.value)}
                placeholder="e.g. 7"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
              <span className="text-[11px] text-muted-foreground block">
                Must not conflict with numbers already taken by other players on the team.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <Link
              href="/football"
              className="text-xs text-muted-foreground hover:text-foreground font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Joining..." : "Join Team Roster"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function FootballJoinPage() {
  return (
    <Suspense fallback={
      <div className="container max-w-xl py-12 text-center text-xs text-muted-foreground">
        Loading player join form...
      </div>
    }>
      <FootballJoinContent />
    </Suspense>
  );
}
