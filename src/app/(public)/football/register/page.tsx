"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Users, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  ShieldCheck, 
  Copy, 
  Check,
  Share2
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { generateReferenceCode, formatNaira } from "@/lib/utils";
import { Team, TeamPlayer, CaptainAccount } from "@/types";
import { cn } from "@/lib/utils";

export default function FootballRegistrationPage() {
  const event = store.getEventById("e-football-001");
  const squadSize = event?.squadSize || 7;
  const registrationFee = event?.registrationFee || 10000;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Created team result state
  const [createdTeam, setCreatedTeam] = useState<Team | null>(null);
  const [createdCaptain, setCreatedCaptain] = useState<CaptainAccount | null>(null);

  // Step 1: Team & Captain Account
  const [teamName, setTeamName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainJersey, setCaptainJersey] = useState("10");
  const [captainPassword, setCaptainPassword] = useState("");

  // Step 2: Payment
  const [payerName, setPayerName] = useState("");
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split("T")[0]);
  const [transferRef, setTransferRef] = useState("");

  // Step 3: Terms
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [finesAcknowledged, setFinesAcknowledged] = useState(false);

  // Step 1 Validation
  const validateStep1 = () => {
    setError(null);
    if (!teamName.trim() || !captainName.trim() || !captainEmail.trim() || !captainPhone.trim() || !captainPassword.trim()) {
      setError("Please complete all required team and captain fields.");
      return false;
    }

    if (captainPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    // Check duplicate team name
    const existingTeams = store.getTeams("e-football-001");
    if (existingTeams.some(t => t.name.toLowerCase() === teamName.trim().toLowerCase())) {
      setError("A team with this name is already registered. Please choose another name.");
      return false;
    }

    // Check duplicate captain email
    if (store.getCaptainByEmail(captainEmail.trim())) {
      setError("An account with this email already exists. Please use a different email address.");
      return false;
    }

    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    setError(null);
    if (!payerName.trim() || !transferRef.trim()) {
      setError("Please provide the bank transfer payer name and transaction reference code.");
      return false;
    }
    return true;
  };

  // Final Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted || !finesAcknowledged) {
      setError("Please review and accept all tournament regulations and disciplinary terms.");
      return;
    }

    setIsSubmitting(true);

    try {
      const codeSuffix = Math.floor(1000 + Math.random() * 9000);
      const codePrefix = shortCode.trim() 
        ? shortCode.trim().toUpperCase().slice(0, 3) 
        : teamName.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || "WFC";
      const generatedInviteCode = `WFC-${codePrefix}-${codeSuffix}`;

      const regId = generateReferenceCode("WFC");
      const teamId = `team-${Date.now()}`;
      const captainId = `cap-${Date.now()}`;

      // Create Captain Player #1
      const captainPlayer: TeamPlayer = {
        id: `p-${Date.now()}`,
        fullName: captainName.trim(),
        email: captainEmail.trim().toLowerCase(),
        phone: captainPhone.trim(),
        jerseyNumber: parseInt(captainJersey, 10) || 10,
        isCaptain: true,
        verificationStatus: "verified",
      };

      // Create New Team
      const newTeam: Team = {
        id: teamId,
        registrationId: regId,
        eventId: "e-football-001",
        name: teamName.trim(),
        shortCode: codePrefix,
        captainName: captainName.trim(),
        captainEmail: captainEmail.trim().toLowerCase(),
        captainPhone: captainPhone.trim(),
        inviteCode: generatedInviteCode,
        status: "pending",
        players: [captainPlayer],
        createdAt: new Date().toISOString(),
      };

      // Create Captain Account
      const captainAccount: CaptainAccount = {
        id: captainId,
        email: captainEmail.trim().toLowerCase(),
        fullName: captainName.trim(),
        phone: captainPhone.trim(),
        teamId: teamId,
        createdAt: new Date().toISOString(),
      };

      // Save to store
      store.addTeam(newTeam);
      store.registerCaptainAccount(captainAccount);

      // Record bank payment
      store.addPayment({
        id: `pay-${Date.now()}`,
        registrationId: regId,
        eventId: "e-football-001",
        payerName: payerName.trim(),
        transferDate,
        amount: registrationFee,
        transferReference: transferRef.trim(),
        status: "pending_verification",
        createdAt: new Date().toISOString(),
      });

      // Log audit
      store.addAuditLog({
        adminUserId: captainId,
        adminName: captainName.trim(),
        action: "CREATE_TEAM_AND_CAPTAIN_ACCOUNT",
        entityType: "Team",
        entityId: teamId,
        details: `Team ${newTeam.name} registered by Captain ${captainName.trim()} with invite code ${generatedInviteCode}`,
      });

      setCreatedTeam(newTeam);
      setCreatedCaptain(captainAccount);
      setStep(4);
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCodeToClipboard = () => {
    if (!createdTeam) return;
    navigator.clipboard.writeText(createdTeam.inviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const copyLinkToClipboard = () => {
    if (!createdTeam) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const joinUrl = `${origin}/football/join?code=${createdTeam.inviteCode}`;
    navigator.clipboard.writeText(joinUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="container max-w-2xl py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <Link 
          href="/football" 
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Football Competition
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Team Registration & Captain Account Setup
        </h1>
        <p className="text-xs text-muted-foreground">
          Register your team, set up your captain credentials, and receive an invitation code for your {squadSize - 1} teammates to join.
        </p>
      </div>

      {/* Progress Steps (1 to 3) */}
      {step < 4 && (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 1 ? "bg-primary/10 border-primary text-primary font-semibold" : step > 1 ? "bg-muted border-border text-foreground" : "border-border text-muted-foreground"
          )}>
            1. Team & Captain
          </div>
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 2 ? "bg-primary/10 border-primary text-primary font-semibold" : step > 2 ? "bg-muted border-border text-foreground" : "border-border text-muted-foreground"
          )}>
            2. Bank Payment
          </div>
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 3 ? "bg-primary/10 border-primary text-primary font-semibold" : "border-border text-muted-foreground"
          )}>
            3. Review & Submit
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="p-3 rounded-[6px] bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Team & Captain Account */}
      {step === 1 && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-6 shadow-subtle">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Team & Captain Details</h2>
            <p className="text-xs text-muted-foreground">
              As team captain, you will manage your team and share the team's invitation code with your squad.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-medium text-foreground block">
                Team Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Delta United or Engineering Dynamos"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Short Code (3 Letters)
              </label>
              <input
                type="text"
                maxLength={4}
                value={shortCode}
                onChange={(e) => setShortCode(e.target.value.toUpperCase())}
                placeholder="e.g. DEL"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary uppercase font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Captain Jersey #
              </label>
              <input
                type="number"
                min={1}
                max={99}
                value={captainJersey}
                onChange={(e) => setCaptainJersey(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-border">
              <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                Captain Account Credentials
              </h3>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-medium text-foreground block">
                Captain Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="e.g. Chinedu Okafor"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Captain Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                required
                value={captainEmail}
                onChange={(e) => setCaptainEmail(e.target.value)}
                placeholder="captain@student.sdu.edu.ng"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Captain Phone Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                required
                value={captainPhone}
                onChange={(e) => setCaptainPhone(e.target.value)}
                placeholder="0803 123 4567"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-medium text-foreground block">
                Account Password <span className="text-destructive">*</span>
              </label>
              <input
                type="password"
                required
                value={captainPassword}
                onChange={(e) => setCaptainPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="text-[11px] text-muted-foreground block">
                You will use this password to access your team dashboard and verify your roster.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
            >
              <span>Next: Payment Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Bank Transfer Details */}
      {step === 2 && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-6 shadow-subtle">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Registration Fee Bank Transfer</h2>
            <p className="text-xs text-muted-foreground">
              Official registration fee for WFC is <strong>{formatNaira(registrationFee)}</strong> per team.
            </p>
          </div>

          {/* SDU Official Bank Account Box */}
          <div className="p-4 rounded-[6px] bg-muted/40 border border-border space-y-2 text-xs">
            <div className="font-semibold text-foreground">Official Tournament Bank Account:</div>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>Bank: <strong className="text-foreground">{siteConfig.paymentAccount.bankName}</strong></div>
              <div>Account #: <strong className="text-foreground font-mono">{siteConfig.paymentAccount.accountNumber}</strong></div>
              <div className="col-span-2">Account Name: <strong className="text-foreground">{siteConfig.paymentAccount.accountName}</strong></div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Sender Account Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Name on bank transfer receipt"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Transfer Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Transaction / Session ID / Reference <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={transferRef}
                  onChange={(e) => setTransferRef(e.target.value)}
                  placeholder="e.g. 09026729104829"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] border border-border text-foreground font-medium text-xs hover:bg-muted"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
            >
              <span>Next: Review & Submit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Review & Submit */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="rounded-[6px] border border-border bg-card p-6 space-y-6 shadow-subtle">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Review & Submit Registration</h2>
            <p className="text-xs text-muted-foreground">
              Confirm your team details and accept competition regulations.
            </p>
          </div>

          {/* Registration Summary */}
          <div className="p-4 rounded-[6px] bg-muted/30 border border-border space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Team Name:</span>
              <strong className="text-foreground">{teamName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Captain:</span>
              <strong className="text-foreground">{captainName} (#{captainJersey})</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Captain Email:</span>
              <span className="text-foreground">{captainEmail}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Captain Phone:</span>
              <span className="text-foreground font-mono">{captainPhone}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2">
              <span className="text-muted-foreground">Registration Fee:</span>
              <strong className="text-primary font-mono">{formatNaira(registrationFee)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transfer Reference:</span>
              <span className="text-foreground font-mono">{transferRef}</span>
            </div>
          </div>

          {/* Acknowledgements */}
          <div className="space-y-3 pt-2 text-xs">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded-[4px] border-border text-primary focus:ring-primary"
              />
              <span className="text-muted-foreground leading-relaxed">
                I agree to the official WFC Monkey Post knockout rules, {event?.halfDurationMinutes || 20}-minute halves, and {event?.gracePeriodMinutes || 15}-minute walkover grace period.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={finesAcknowledged}
                onChange={(e) => setFinesAcknowledged(e.target.checked)}
                className="mt-0.5 rounded-[4px] border-border text-primary focus:ring-primary"
              />
              <span className="text-muted-foreground leading-relaxed">
                I acknowledge the mandatory disciplinary fines: {formatNaira(event?.yellowCardFine || 1000)} per yellow card and {formatNaira(event?.redCardFine || 3000)} per red card, which must be settled before subsequent fixtures.
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[6px] border border-border text-foreground font-medium text-xs hover:bg-muted"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Creating Team..." : "Submit Registration & Get Invite Code"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Success & Captain Invite Code Hub */}
      {step === 4 && createdTeam && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-6 shadow-subtle">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-9 h-9 rounded-[6px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Registration Submitted Successfully
              </h2>
              <p className="text-xs text-muted-foreground">
                Team Reference: <strong className="text-foreground font-mono">{createdTeam.registrationId}</strong>
              </p>
            </div>
          </div>

          {/* Invitation Code Display Box */}
          <div className="p-5 rounded-[6px] bg-muted/40 border border-border space-y-3">
            <div className="text-xs font-semibold text-foreground uppercase tracking-wider">
              Your Team Invitation Code
            </div>
            <div className="flex items-center justify-between bg-background p-3 rounded-[6px] border border-border">
              <span className="font-mono text-2xl font-bold tracking-wider text-primary">
                {createdTeam.inviteCode}
              </span>
              <button
                type="button"
                onClick={copyCodeToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "Copied Code" : "Copy Code"}</span>
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Share this code with your <strong>{squadSize - 1} teammates</strong>. They can visit the Join page, enter this code, and register their name and phone to join your squad roster.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={copyLinkToClipboard}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? "Link Copied to Clipboard!" : "Copy Direct Join Link"}</span>
              </button>
            </div>
          </div>

          {/* Squad Roster Tracker */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">
                Roster Status: 1 / {squadSize} Players Registered
              </span>
              <span className="text-muted-foreground text-[11px]">
                {squadSize - 1} slots open for teammates
              </span>
            </div>

            <div className="border border-border rounded-[6px] divide-y divide-border text-xs">
              {/* Captain Row */}
              <div className="p-2.5 flex items-center justify-between bg-muted/20">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-primary">#{createdTeam.players[0].jerseyNumber}</span>
                  <span className="font-medium text-foreground">{createdTeam.players[0].fullName}</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-[6px] bg-primary/10 text-primary border border-primary/20">
                    Captain
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">{createdTeam.players[0].phone}</span>
              </div>

              {/* Empty Slots */}
              {Array.from({ length: squadSize - 1 }).map((_, i) => (
                <div key={i} className="p-2.5 flex items-center justify-between text-muted-foreground/70 italic text-[11px]">
                  <span>Slot #{i + 2}: Awaiting teammate join</span>
                  <span className="not-italic text-[10px] font-mono text-muted-foreground">Code: {createdTeam.inviteCode}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <Link
              href="/football"
              className="px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium hover:bg-primary/90"
            >
              Return to Football Competition
            </Link>
            <Link
              href={`/football/join?code=${createdTeam.inviteCode}`}
              className="px-3.5 py-2 rounded-[6px] border border-border text-foreground hover:bg-muted font-medium"
            >
              Test Join Page as Player
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
