"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Timer, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  ShieldCheck, 
  Heart,
  Printer 
} from "lucide-react";
import confetti from "canvas-confetti";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { generateReferenceCode, formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function MarathonRegistrationPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [assignedBib, setAssignedBib] = useState<string | null>(null);

  // Form State
  const [category, setCategory] = useState<"rc-10k" | "rc-5k">("rc-10k");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [dateOfBirth, setDateOfBirth] = useState("2003-01-01");
  const [tShirtSize, setTShirtSize] = useState<"S" | "M" | "L" | "XL" | "2XL">("M");

  // Emergency & Safety
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [healthAgreed, setHealthAgreed] = useState(false);

  // Payment
  const [payerName, setPayerName] = useState("");
  const [transferDate, setTransferDate] = useState(new Date().toISOString().split("T")[0]);
  const [transferRef, setTransferRef] = useState("");

  const fee = category === "rc-10k" ? 3000 : 2000;

  const validateStep1 = () => {
    setError(null);
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your full name, email, and phone number.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setError(null);
    if (!emergencyName.trim() || !emergencyPhone.trim() || !emergencyRelation.trim()) {
      setError("Mandatory safety requirement: Please provide an emergency contact name, phone, and relationship.");
      return false;
    }
    if (!healthAgreed) {
      setError("You must acknowledge the health and fitness declaration before participating.");
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

    const refCode = generateReferenceCode("WMC");
    const regId = `reg-run-${Date.now()}`;
    const runnerId = `runner-${Date.now()}`;
    
    // Generate bib: 10K = 100 series, 5K = 500 series
    const existing = store.getParticipants("e-marathon-002");
    const count = existing.length + 1;
    const bib = category === "rc-10k" ? `${100 + count}` : `${500 + count}`;

    const newParticipant = {
      id: runnerId,
      registrationId: regId,
      eventId: "e-marathon-002",
      raceCategoryId: category,
      raceCategoryName: category === "rc-10k" ? "10K Campus Elite Challenge" : "5K Campus Fun Run",
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      matricNumber: matricNumber.trim() ? matricNumber.trim().toUpperCase() : undefined,
      gender,
      dateOfBirth,
      emergencyContactName: emergencyName.trim(),
      emergencyContactPhone: emergencyPhone.trim(),
      emergencyContactRelationship: emergencyRelation.trim(),
      medicalNotes: medicalNotes.trim() || undefined,
      tShirtSize,
      bibNumber: bib,
      checkInStatus: false,
      createdAt: new Date().toISOString(),
    };

    store.addParticipant(newParticipant);

    store.addPayment({
      id: `pay-${Date.now()}`,
      registrationId: regId,
      eventId: "e-marathon-002",
      payerName: payerName.trim(),
      transferDate,
      amount: fee,
      transferReference: transferRef.trim(),
      status: "pending_verification",
      createdAt: new Date().toISOString(),
    });

    store.addAuditLog({
      adminUserId: "system",
      adminName: "Public Registration Engine",
      action: "REGISTER_MARATHON_RUNNER",
      entityType: "participant",
      entityId: runnerId,
      details: `Registered runner ${fullName} for ${newParticipant.raceCategoryName}. Assigned Bib #${bib}. Payment Ref: ${transferRef}`,
    });

    setAssignedBib(bib);
    setSubmittedRef(refCode);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  if (submittedRef) {
    return (
      <div className="container py-16 max-w-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-brand-emerald border border-brand-emerald/40 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white uppercase tracking-tight">
            Runner Registered!
          </h2>
          <p className="text-sm text-muted-foreground">
            Your race entry has been recorded and your official bib number has been allocated.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="p-6 rounded-3xl border border-white/10 bg-card/80 text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Assigned Official Bib
              </div>
              <div className="font-mono text-4xl font-black text-brand-emerald">
                #{assignedBib}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Payment Verification Pending
              </span>
              <div className="font-mono text-xs text-muted-foreground mt-1">{submittedRef}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-muted-foreground">Runner:</div>
              <div className="font-bold text-white text-sm">{fullName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Race Division:</div>
              <div className="font-bold text-white text-sm">
                {category === "rc-10k" ? "10K Campus Elite" : "5K Fun Run"}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">T-Shirt Size:</div>
              <div className="font-bold text-white text-sm">{tShirtSize}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Emergency Contact:</div>
              <div className="font-bold text-white text-sm">{emergencyName} ({emergencyPhone})</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200/90 space-y-1">
            <strong>Bib Collection:</strong>
            <p className="text-[11px] leading-relaxed">
              Show this registration code or your SDU student ID at the SDU Sports Center Pavilion on race morning (Dec 8, 6:00 AM) to collect your physical chest bib and timing chip.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/marathon"
            className="px-6 py-3 rounded-xl bg-brand-emerald text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all"
          >
            Back to Marathon Hub
          </Link>
          <button
            onClick={() => window.print()}
            className="px-6 py-3 rounded-xl border border-white/20 bg-white/5 text-white font-bold text-xs hover:bg-white/10 transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Bib Slip</span>
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
          href="/marathon"
          className="inline-flex items-center gap-1.5 text-xs text-brand-emerald hover:underline font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Marathon Hub</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Marathon Runner Registration
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Enter the 10K Campus Elite or 5K Campus Fun Run at Southern Delta University, Ozoro.
        </p>
      </div>

      {/* Stepper */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 1 ? "bg-emerald-500/20 border-brand-emerald text-brand-emerald" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          1. Division & Profile
        </div>
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 2 ? "bg-emerald-500/20 border-brand-emerald text-brand-emerald" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          2. Emergency & Safety
        </div>
        <div className={cn(
          "p-2.5 rounded-xl border transition-all",
          step >= 3 ? "bg-emerald-500/20 border-brand-emerald text-brand-emerald" : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          3. Bank Transfer
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: DIVISION & PROFILE */}
      {step === 1 && (
        <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 1: Choose Division & Personal Information</h3>
            <p className="text-xs text-muted-foreground">Select your distance and provide your runner details.</p>
          </div>

          {/* Division Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className={cn(
              "p-4 rounded-2xl border cursor-pointer transition-all space-y-2",
              category === "rc-10k" ? "border-brand-emerald bg-emerald-500/10 shadow-lg shadow-emerald-500/10" : "border-white/10 bg-white/[0.02]"
            )}>
              <div className="flex items-center justify-between">
                <input
                  type="radio"
                  name="division"
                  checked={category === "rc-10k"}
                  onChange={() => setCategory("rc-10k")}
                  className="h-4 w-4 text-brand-emerald focus:ring-brand-emerald"
                />
                <span className="font-mono font-bold text-xs text-brand-emerald">₦3,000 Fee</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">10K Campus Elite Challenge</h4>
                <p className="text-[11px] text-muted-foreground">
                  2 laps, electronic chip timing, eligible for ₦30k / ₦15k / ₦5k cash prizes.
                </p>
              </div>
            </label>

            <label className={cn(
              "p-4 rounded-2xl border cursor-pointer transition-all space-y-2",
              category === "rc-5k" ? "border-brand-emerald bg-emerald-500/10 shadow-lg shadow-emerald-500/10" : "border-white/10 bg-white/[0.02]"
            )}>
              <div className="flex items-center justify-between">
                <input
                  type="radio"
                  name="division"
                  checked={category === "rc-5k"}
                  onChange={() => setCategory("rc-5k")}
                  className="h-4 w-4 text-brand-emerald focus:ring-brand-emerald"
                />
                <span className="font-mono font-bold text-xs text-brand-emerald">₦2,000 Fee</span>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">5K Campus Fun Run</h4>
                <p className="text-[11px] text-muted-foreground">
                  1 lap community run. Finisher certificate & post-race refreshment pack included.
                </p>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-white">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Runner full name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="runner@student.sdu.edu.ng"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0803..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">SDU Matric Number (If Student)</label>
              <input
                type="text"
                value={matricNumber}
                onChange={(e) => setMatricNumber(e.target.value.toUpperCase())}
                placeholder="SDU/.../... (Optional for general public)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">T-Shirt Size</label>
              <select
                value={tShirtSize}
                onChange={(e) => setTShirtSize(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              >
                <option value="S">Small (S)</option>
                <option value="M">Medium (M)</option>
                <option value="L">Large (L)</option>
                <option value="XL">Extra Large (XL)</option>
                <option value="2XL">2X Large (2XL)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="px-6 py-3 rounded-xl bg-brand-emerald text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 flex items-center gap-2 active:scale-[0.96] transition-all"
            >
              <span>Continue to Emergency & Safety</span>
              <Timer className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: EMERGENCY & SAFETY */}
      {step === 2 && (
        <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 2: Emergency Contact & Medical Declaration</h3>
            <p className="text-xs text-muted-foreground">Mandatory safety requirements for campus endurance events.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-white">Emergency Contact Full Name *</label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                placeholder="Parent, sibling or guardian"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Emergency Contact Phone Number *</label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="0802..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Relationship *</label>
              <input
                type="text"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                placeholder="e.g. Father, Sister, Friend"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-bold text-white">Medical Notes / Allergies / Disclosures</label>
              <textarea
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                placeholder="Please state any asthma, allergies, cardiovascular notes, or prescription medications..."
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald resize-none"
              />
            </div>
          </div>

          <label className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] flex items-start gap-3 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={healthAgreed}
              onChange={(e) => setHealthAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-white/20 text-brand-emerald focus:ring-brand-emerald"
            />
            <div className="space-y-1">
              <span className="font-bold text-white block">Health & Safety Acknowledgment</span>
              <span className="text-muted-foreground leading-relaxed">
                I declare that I am physically fit to participate in this road running event and will abide by all marshal instructions and medical stop orders issued on course.
              </span>
            </div>
          </label>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10"
            >
              Back to Division
            </button>
            <button
              type="button"
              onClick={() => {
                if (validateStep2()) setStep(3);
              }}
              className="px-6 py-3 rounded-xl bg-brand-emerald text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 flex items-center gap-2 active:scale-[0.96] transition-all"
            >
              <span>Continue to Payment ({formatNaira(fee)})</span>
              <CreditCard className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: PAYMENT */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          <div className="border-b border-white/10 pb-3">
            <h3 className="font-extrabold text-lg text-white">Step 3: Bank Transfer Payment Submission</h3>
            <p className="text-xs text-muted-foreground">Transfer {formatNaira(fee)} to the official tournament account.</p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-brand-emerald/40 bg-gradient-to-r from-emerald-950/40 to-black space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-extrabold text-brand-emerald">
                Official Marathon Account
              </span>
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                Fee: {formatNaira(fee)}
              </span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="text-muted-foreground">Bank: <span className="font-bold text-white">{siteConfig.bankDetails.bankName}</span></div>
              <div className="text-muted-foreground">Account Name: <span className="font-bold text-white">{siteConfig.bankDetails.accountName}</span></div>
              <div className="text-muted-foreground flex items-center gap-2">
                <span>Account Number:</span>
                <span className="font-mono text-base font-extrabold text-brand-emerald tracking-widest">{siteConfig.bankDetails.accountNumber}</span>
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Transfer Date *</label>
              <input
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">Bank Reference / Session ID *</label>
              <input
                type="text"
                value={transferRef}
                onChange={(e) => setTransferRef(e.target.value)}
                placeholder="e.g. FBN-TRF-2026-..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-emerald font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-white hover:bg-white/10"
            >
              Back to Safety
            </button>
            <button
              type="submit"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-emerald to-emerald-600 hover:from-emerald-400 hover:to-emerald-700 text-white font-extrabold text-xs shadow-xl shadow-emerald-500/20 active:scale-[0.96] transition-all"
            >
              Submit Registration & Generate Bib
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
