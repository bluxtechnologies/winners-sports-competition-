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
  ArrowRight
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { generateReferenceCode, formatNaira } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function MarathonRegistrationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [assignedBib, setAssignedBib] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [category, setCategory] = useState<"rc-10k" | "rc-5k">("rc-10k");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
      setError("Please complete all personal contact fields.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setError(null);
    if (!emergencyName.trim() || !emergencyPhone.trim() || !emergencyRelation.trim()) {
      setError("Safety requirement: Please provide an emergency contact name, phone, and relationship.");
      return false;
    }
    if (!healthAgreed) {
      setError("Please acknowledge the health and fitness safety declaration.");
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    setError(null);
    if (!payerName.trim() || !transferRef.trim()) {
      setError("Please enter the sender account name and official transfer reference code.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const refCode = generateReferenceCode("WMC");
      const regId = `reg-run-${Date.now()}`;
      const runnerId = `runner-${Date.now()}`;
      
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
        adminUserId: "system-portal",
        adminName: "Public Registration Desk",
        action: "MARATHON_RUNNER_REGISTERED",
        entityType: "Participant",
        entityId: runnerId,
        details: `Runner ${fullName.trim()} registered for ${newParticipant.raceCategoryName} with Bib #${bib}`,
      });

      setAssignedBib(bib);
      setSubmittedRef(refCode);
      setStep(4);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-xl py-12 space-y-6">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-4">
        <Link 
          href="/marathon" 
          className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Marathon Challenge
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Marathon Runner Registration
        </h1>
        <p className="text-xs text-muted-foreground">
          Register for the 10K Campus Elite or 5K Fun Run. Secure your numbered bib and official race kit.
        </p>
      </div>

      {/* Progress Steps (1 to 3) */}
      {step < 4 && (
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 1 ? "bg-primary/10 border-primary text-primary font-semibold" : step > 1 ? "bg-muted border-border text-foreground" : "border-border text-muted-foreground"
          )}>
            1. Division & Details
          </div>
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 2 ? "bg-primary/10 border-primary text-primary font-semibold" : step > 2 ? "bg-muted border-border text-foreground" : "border-border text-muted-foreground"
          )}>
            2. Medical & Safety
          </div>
          <div className={cn(
            "p-2.5 rounded-[6px] border text-center font-medium",
            step === 3 ? "bg-primary/10 border-primary text-primary font-semibold" : "border-border text-muted-foreground"
          )}>
            3. Fee & Submit
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-[6px] bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: Division & Personal Details */}
      {step === 1 && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle text-xs">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Select Division & Runner Information</h2>
            <p className="text-muted-foreground">Choose your distance category and enter contact details.</p>
          </div>

          {/* Division Selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCategory("rc-10k")}
              className={cn(
                "p-3 rounded-[6px] border text-left space-y-1 transition-colors",
                category === "rc-10k" ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <div className="font-bold text-foreground">10K Campus Elite</div>
              <div className="text-primary font-mono font-semibold">₦3,000</div>
              <div className="text-[11px] text-muted-foreground">Competitive Timed Road Race</div>
            </button>

            <button
              type="button"
              onClick={() => setCategory("rc-5k")}
              className={cn(
                "p-3 rounded-[6px] border text-left space-y-1 transition-colors",
                category === "rc-5k" ? "border-primary bg-primary/5 text-foreground" : "border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <div className="font-bold text-foreground">5K Campus Fun Run</div>
              <div className="text-foreground font-mono font-semibold">₦2,000</div>
              <div className="text-[11px] text-muted-foreground">Fitness & Community Run</div>
            </button>
          </div>

          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Osaro Igbinoba"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Email Address <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="runner@student.sdu.edu.ng"
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">T-Shirt Size</label>
                <select
                  value={tShirtSize}
                  onChange={(e) => setTShirtSize(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="S">Small (S)</option>
                  <option value="M">Medium (M)</option>
                  <option value="L">Large (L)</option>
                  <option value="XL">Extra Large (XL)</option>
                  <option value="2XL">Double XL (2XL)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90"
            >
              <span>Next: Safety & Medical</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Safety & Emergency Contact */}
      {step === 2 && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle text-xs">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Medical Safety & Emergency Protocol</h2>
            <p className="text-muted-foreground">Required for race safety and paramedic coordination.</p>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5 sm:col-span-1">
                <label className="font-medium text-foreground block">
                  Emergency Contact Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  placeholder="e.g. Dr. K. Igbinoba"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Relationship <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={emergencyRelation}
                  onChange={(e) => setEmergencyRelation(e.target.value)}
                  placeholder="e.g. Parent / Guardian"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">
                  Emergency Phone <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  placeholder="0803 765 4321"
                  className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-medium text-foreground block">
                Medical Notes / Allergies (Optional)
              </label>
              <textarea
                rows={2}
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                placeholder="e.g. Asthmatic (inhaler carried), penicillin allergy, previous knee surgery"
                className="w-full px-3 py-2 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={healthAgreed}
                onChange={(e) => setHealthAgreed(e.target.checked)}
                className="mt-0.5 rounded-[4px] border-border text-primary focus:ring-primary"
              />
              <span className="text-muted-foreground leading-relaxed">
                I declare that I am physically fit to participate in this road running competition, and I will heed advice from SDU campus health officials and course marshals during the race.
              </span>
            </label>
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90"
            >
              <span>Next: Bank Payment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Bank Transfer Payment */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle text-xs">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold text-foreground">Bank Transfer Payment</h2>
            <p className="text-muted-foreground">
              Registration Fee: <strong>{formatNaira(fee)}</strong> for {category === "rc-10k" ? "10K Elite" : "5K Fun Run"}.
            </p>
          </div>

          <div className="p-4 rounded-[6px] bg-muted/40 border border-border space-y-2">
            <div className="font-semibold text-foreground">SDU Winners Sports Bank Account:</div>
            <div className="grid grid-cols-2 gap-2 text-muted-foreground">
              <div>Bank: <strong className="text-foreground">{siteConfig.paymentAccount.bankName}</strong></div>
              <div>Account #: <strong className="text-foreground font-mono">{siteConfig.paymentAccount.accountNumber}</strong></div>
              <div className="col-span-2">Account Name: <strong className="text-foreground">{siteConfig.paymentAccount.accountName}</strong></div>
            </div>
          </div>

          <div className="space-y-3">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-medium text-foreground block">Transfer Date</label>
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
                  Transfer Reference / Session ID <span className="text-destructive">*</span>
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
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Registration & Get Bib"}
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Success State */}
      {step === 4 && (
        <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 shadow-subtle text-xs">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <div className="w-9 h-9 rounded-[6px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                Registration Confirmed
              </h2>
              <p className="text-muted-foreground">
                Your entry has been recorded in the Southern Delta University race roster.
              </p>
            </div>
          </div>

          {/* Assigned Bib Box */}
          <div className="p-5 rounded-[6px] bg-muted/40 border border-border text-center space-y-2">
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Your Official Race Bib Number
            </div>
            <div className="font-mono text-5xl font-bold tracking-tight text-primary">
              {assignedBib}
            </div>
            <div className="text-xs font-semibold text-foreground">
              {category === "rc-10k" ? "10K Campus Elite Challenge" : "5K Campus Fun Run"}
            </div>
            <p className="text-[11px] text-muted-foreground max-w-sm mx-auto">
              Please present this bib number and your student ID card at the SDU Sports Complex check-in desk on race morning (Dec 8) to collect your kit.
            </p>
          </div>

          <div className="pt-3 border-t border-border flex items-center justify-between">
            <Link
              href="/marathon"
              className="px-4 py-2 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90"
            >
              Return to Marathon Hub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
