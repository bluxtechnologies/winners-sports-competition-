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
  Printer,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { generateReferenceCode, formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PlayerInput {
  fullName: string;
  email: string;
  phone: string;
  matricNumber: string;
  jerseyNumber: string;
}

export default function FootballRegistrationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Step 1: Team & Captain
  const [teamName, setTeamName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [department, setDepartment] = useState("");
  const [captainName, setCaptainName] = useState("");
  const [captainEmail, setCaptainEmail] = useState("");
  const [captainPhone, setCaptainPhone] = useState("");
  const [captainMatric, setCaptainMatric] = useState("");

  // Step 2: 7 Players
  const [players, setPlayers] = useState<PlayerInput[]>([
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "10" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "7" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "9" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "4" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "5" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "8" },
    { fullName: "", email: "", phone: "", matricNumber: "", jerseyNumber: "2" },
  ]);

  // Step 3: Terms
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [finesAcknowledged, setFinesAcknowledged] = useState(false);
  const [studentEligibilityDeclared, setStudentEligibilityDeclared] = useState(false);

  // Step 4: Payment Submission
  const [payerName, setPayerName] = useState("");
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split("T")[0]);
  const [transferRef, setTransferRef] = useState("");

  const handlePlayerChange = (index: number, field: keyof PlayerInput, val: string) => {
    const updated = [...players];
    updated[index][field] = val;
    setPlayers(updated);
  };

  const autofillCaptainAsPlayer1 = () => {
    if (!captainName) return;
    const updated = [...players];
    updated[0] = {
      fullName: captainName,
      email: captainEmail,
      phone: captainPhone,
      matricNumber: captainMatric,
      jerseyNumber: "10",
    };
    setPlayers(updated);
  };

  // Step Validations
  const validateStep1 = () => {
    setError(null);
    if (!teamName.trim() || !department.trim() || !captainName.trim() || !captainEmail.trim() || !captainPhone.trim() || !captainMatric.trim()) {
      setError("Please complete all team and captain fields.");
      return false;
    }
    // Check if team name already exists
    const existing = store.getTeams("e-football-001");
    if (existing.some(t => t.name.toLowerCase() === teamName.trim().toLowerCase())) {
      setError("A team with this name is already registered. Please choose a unique team name.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setError(null);
    const existingTeams = store.getTeams("e-football-001");
    const existingEmails = new Set(existingTeams.flatMap(t => t.players.map(p => p.email.toLowerCase())));
    const existingMatrics = new Set(existingTeams.flatMap(t => t.players.map(p => p.matricNumber.toUpperCase())));

    const seenEmailsInForm = new Set<string>();
    const seenMatricsInForm = new Set<string>();

    for (let i = 0; i < players.length; i++) {
      const p = players[i];
      if (!p.fullName.trim() || !p.email.trim() || !p.matricNumber.trim()) {
        setError(`Please fill in required details for Player ${i + 1}.`);
        return false;
      }
      const emailLower = p.email.trim().toLowerCase();
      const matricUpper = p.matricNumber.trim().toUpperCase();

      // Intra-team duplicate check
      if (seenEmailsInForm.has(emailLower)) {
        setError(`Duplicate email address "${p.email}" found within your roster.`);
        return false;
      }
      if (seenMatricsInForm.has(matricUpper)) {
        setError(`Duplicate matriculation number "${p.matricNumber}" found within your roster.`);
        return false;
      }
      seenEmailsInForm.add(emailLower);
      seenMatricsInForm.add(matricUpper);

      // Cross-team duplicate check
      if (existingEmails.has(emailLower)) {
        setError(`Player with email "${p.email}" is already registered on another team.`);
        return false;
      }
      if (existingMatrics.has(matricUpper)) {
        setError(`Student with matric number "${p.matricNumber}" is already registered on another team.`);
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    setError(null);
    if (!termsAccepted || !finesAcknowledged || !studentEligibilityDeclared) {
      setError("You must acknowledge all terms, card fines, and student eligibility declarations.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!payerName.trim() || !transferRef.trim()) {
      setError("Please enter the payer name and official bank transfer reference code.");
      return;
    }

    const refCode = generateReferenceCode("WFC");
    const regId = `reg-${Date.now()}`;
    const newTeamId = `team-${Date.now()}`;

    // Create Team in Store
    const newTeam = {
      id: newTeamId,
      registrationId: regId,
      eventId: "e-football-001",
      name: teamName.trim(),
      shortCode: shortCode.trim() || teamName.slice(0, 3).toUpperCase(),
      departmentOrHall: department.trim(),
      captainName: captainName.trim(),
      captainEmail: captainEmail.trim(),
      captainPhone: captainPhone.trim(),
      captainMatric: captainMatric.trim(),
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      players: players.map((p, idx) => ({
        id: `p-${Date.now()}-${idx}`,
        fullName: p.fullName.trim(),
        email: p.email.trim().toLowerCase(),
        phone: p.phone.trim() || captainPhone.trim(),
        matricNumber: p.matricNumber.trim().toUpperCase(),
        jerseyNumber: parseInt(p.jerseyNumber, 10) || idx + 1,
        isCaptain: idx === 0,
        verificationStatus: "unverified" as const,
      })),
    };

    store.addTeam(newTeam);

    // Create Payment in Store
    store.addPayment({
      id: `pay-${Date.now()}`,
      registrationId: regId,
      eventId: "e-football-001",
      payerName: payerName.trim(),
      transferDate,
      amount: siteConfig.football.registrationFee,
      transferReference: transferRef.trim(),
      status: "pending_verification",
      createdAt: new Date().toISOString(),
    });

    // Audit log
    store.addAuditLog({
      adminUserId: "system",
      adminName: "Public Registration Engine",
      action: "SUBMIT_TEAM_REGISTRATION",
      entityType: "team",
      entityId: newTeamId,
      details: `Registered team "${teamName}" with 7 players. Payment reference: ${transferRef}`,
    });

    setSubmittedRef(refCode);
    try {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  // Success view
  if (submittedRef) {
    return (
      <div className="container py-16 max-w-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-brand-emerald border border-brand-emerald/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Registration Submitted!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your team registration has been recorded and submitted for administrator verification.
          </p>
        </div>

        {/* Reference Slip Card */}
        <div className="p-6 rounded-3xl border border-white/10 bg-card/80 text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Registration Reference
              </div>
              <div className="font-mono text-2xl font-black text-brand-gold tracking-wider">
                {submittedRef}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Payment Verification Pending
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-muted-foreground">Team Name:</div>
              <div className="font-bold text-white text-sm">{teamName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Captain:</div>
              <div className="font-bold text-white text-sm">{captainName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Amount:</div>
              <div className="font-mono font-bold text-white text-sm">₦10,000</div>
            </div>
            <div>
              <div className="text-muted-foreground">Payment Reference:</div>
              <div className="font-mono font-bold text-brand-gold text-sm truncate">{transferRef}</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
            <strong>Next Steps:</strong>
            <p className="text-[11px] leading-relaxed">
              The Finance Officer will verify your bank transfer of ₦10,000 into the official First Bank account. Once verified, your team will be confirmed and added to the official 16-team tournament draw!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/football"
            className="px-6 py-3 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
          >
            Back to Tournament Hub
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Confirmation Slip</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16 max-w-3xl space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <Link
          href="/football"
          className="inline-flex items-center gap-1.5 text-xs text-brand-gold hover:underline font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to WFC Hub</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Football Team Registration
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Register your 7-player squad for the 16-team Winners Football Competition. ₦10,000 entry fee. Southern Delta University, Ozoro students only.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 1 ? "bg-amber-500/20 border-brand-gold text-brand-gold" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          1. Team Info
        </div>
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 2 ? "bg-amber-500/20 border-brand-gold text-brand-gold" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          2. 7 Players
        </div>
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 3 ? "bg-amber-500/20 border-brand-gold text-brand-gold" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          3. Terms
        </div>
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 4 ? "bg-amber-500/20 border-brand-gold text-brand-gold" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          4. Payment
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: TEAM & CAPTAIN */}
      {step === 1 && (
        <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 1: Team & Captain Details</h3>
            <p className="text-xs text-muted-foreground">Identify your team and designate the official captain.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-white">Team Name *</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Engineering Dynamos"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Short Code (3-4 Letters)</label>
              <input
                type="text"
                value={shortCode}
                maxLength={4}
                onChange={(e) => setShortCode(e.target.value.toUpperCase())}
                placeholder="e.g. ENG"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold uppercase font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Faculty / Department / Hall *</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="e.g. Faculty of Engineering"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Captain&apos;s Full Name *</label>
              <input
                type="text"
                value={captainName}
                onChange={(e) => setCaptainName(e.target.value)}
                placeholder="e.g. Chinedu Okafor"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Captain&apos;s SDU Matric Number *</label>
              <input
                type="text"
                value={captainMatric}
                onChange={(e) => setCaptainMatric(e.target.value.toUpperCase())}
                placeholder="e.g. SDU/ENG/2022/1042"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Captain&apos;s Phone Number *</label>
              <input
                type="tel"
                value={captainPhone}
                onChange={(e) => setCaptainPhone(e.target.value)}
                placeholder="e.g. 08031234567"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Captain&apos;s Student Email *</label>
              <input
                type="email"
                value={captainEmail}
                onChange={(e) => setCaptainEmail(e.target.value)}
                placeholder="e.g. c.okafor@student.sdu.edu.ng"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="px-6 py-3 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-2 active:scale-[0.96] transition-all"
            >
              <span>Continue to 7-Player Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: 7 PLAYERS ROSTER */}
      {step === 2 && (
        <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div>
              <h3 className="font-extrabold text-lg text-white">Step 2: Squad Roster (Exactly 7 Players)</h3>
              <p className="text-xs text-muted-foreground">5 active players on pitch + 2 permanent substitutes.</p>
            </div>
            <button
              type="button"
              onClick={autofillCaptainAsPlayer1}
              className="text-xs font-bold text-brand-gold hover:underline"
            >
              Autofill Captain as Player 1
            </button>
          </div>

          <div className="space-y-4">
            {players.map((player, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center font-bold font-mono text-[11px]">
                      {idx + 1}
                    </span>
                    <strong className="text-white">
                      {idx === 0 ? "Player 1 (Team Captain)" : `Player ${idx + 1} ${idx >= 5 ? "(Substitute)" : ""}`}
                    </strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] text-muted-foreground">Full Name *</label>
                    <input
                      type="text"
                      value={player.fullName}
                      onChange={(e) => handlePlayerChange(idx, "fullName", e.target.value)}
                      placeholder="Student full name"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">Matric Number *</label>
                    <input
                      type="text"
                      value={player.matricNumber}
                      onChange={(e) => handlePlayerChange(idx, "matricNumber", e.target.value.toUpperCase())}
                      placeholder="SDU/.../..."
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">Jersey #</label>
                    <input
                      type="number"
                      value={player.jerseyNumber}
                      onChange={(e) => handlePlayerChange(idx, "jerseyNumber", e.target.value)}
                      placeholder="1-99"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] text-muted-foreground">Email Address *</label>
                    <input
                      type="email"
                      value={player.email}
                      onChange={(e) => handlePlayerChange(idx, "email", e.target.value)}
                      placeholder="student@sdu.edu.ng"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[11px] text-muted-foreground">Phone Number</label>
                    <input
                      type="tel"
                      value={player.phone}
                      onChange={(e) => handlePlayerChange(idx, "phone", e.target.value)}
                      placeholder="080..."
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10"
            >
              Back to Step 1
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="px-6 py-3 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-2 active:scale-[0.96] transition-all"
            >
              <span>Continue to Terms & Constitution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TERMS & CONSTITUTION */}
      {step === 3 && (
        <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 3: Tournament Agreement & Policies</h3>
            <p className="text-xs text-muted-foreground">Review and accept the constitutional rules of WFC First Edition.</p>
          </div>

          <div className="space-y-4 text-xs">
            <label className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3 cursor-pointer hover:border-brand-gold/40 transition-colors">
              <input
                type="checkbox"
                checked={studentEligibilityDeclared}
                onChange={(e) => setStudentEligibilityDeclared(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 text-brand-gold focus:ring-brand-gold"
              />
              <div className="space-y-1">
                <span className="font-bold text-white block">Student Eligibility Declaration</span>
                <span className="text-muted-foreground leading-relaxed">
                  I confirm that all seven registered players on this roster are current, enrolled students of Southern Delta University, Ozoro. Any team fielding an unregistered or ineligible player faces immediate expulsion.
                </span>
              </div>
            </label>

            <label className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3 cursor-pointer hover:border-brand-gold/40 transition-colors">
              <input
                type="checkbox"
                checked={finesAcknowledged}
                onChange={(e) => setFinesAcknowledged(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 text-brand-gold focus:ring-brand-gold"
              />
              <div className="space-y-1">
                <span className="font-bold text-white block">Disciplinary Policy & Mandatory Fines</span>
                <span className="text-muted-foreground leading-relaxed">
                  We acknowledge the disciplinary policy: Yellow card fine is <strong>₦1,000</strong>; Red card fine is <strong>₦3,000</strong> accompanied by an automatic next-match sporting ban. Fines are paid directly to the Finance Officer.
                </span>
              </div>
            </label>

            <label className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3 cursor-pointer hover:border-brand-gold/40 transition-colors">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-white/20 text-brand-gold focus:ring-brand-gold"
              />
              <div className="space-y-1">
                <span className="font-bold text-white block">Rules of the Game & 15-Minute Grace Period</span>
                <span className="text-muted-foreground leading-relaxed">
                  We accept the Monkey Post rules: 20 minutes per half, 2 maximum permanent substitutions, no fixed keeper, phone video review system, and the strict 15-minute walkover forfeiture rule for non-appearance.
                </span>
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10"
            >
              Back to Roster
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep3()) setStep(4);
              }}
              className="px-6 py-3 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 flex items-center gap-2 active:scale-[0.96] transition-all"
            >
              <span>Continue to Payment (₦10,000)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PAYMENT SUBMISSION */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 4: Bank Transfer Payment Submission</h3>
            <p className="text-xs text-muted-foreground">Transfer ₦10,000 to the official committee account and input your transfer reference.</p>
          </div>

          {/* Official Bank Account Card */}
          <div className="p-5 rounded-2xl border-2 border-brand-gold/40 bg-gradient-to-r from-amber-950/40 to-black space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-brand-gold">
                Official Tournament Account
              </span>
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                Fee: ₦10,000
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="text-muted-foreground">Bank: <span className="font-bold text-white">{siteConfig.bankDetails.bankName}</span></div>
              <div className="text-muted-foreground">Account Name: <span className="font-bold text-white">{siteConfig.bankDetails.accountName}</span></div>
              <div className="text-muted-foreground flex items-center gap-2">
                <span>Account Number:</span>
                <span className="font-mono text-base font-extrabold text-brand-gold tracking-widest">{siteConfig.bankDetails.accountNumber}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-white">Payer Account / Sender Name *</label>
              <input
                type="text"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Name as it appears on the bank transfer debit alert"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Transfer Date *</label>
              <input
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Bank Reference / Session ID *</label>
              <input
                type="text"
                value={transferRef}
                onChange={(e) => setTransferRef(e.target.value)}
                placeholder="e.g. 00001324110819284200..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10"
            >
              Back to Terms
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-extrabold text-xs shadow-xl shadow-amber-500/20 active:scale-[0.96] transition-all"
            >
              Submit Registration & Payment
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
