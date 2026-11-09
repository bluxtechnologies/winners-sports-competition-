"use client";

import { store } from "@/services/store";
import { 
  FileText, 
  Printer, 
  Download, 
  Trophy, 
  CreditCard, 
  ShieldCheck, 
  Scale, 
  AlertCircle 
} from "lucide-react";
import { formatNaira, formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function AdminReportsPage() {
  const matches = store.getMatches("e-football-001");
  const payments = store.getPayments();
  const verifiedPayments = payments.filter((p) => p.status === "verified");

  const grossRegistrationIncome = 160000; // 16 teams × ₦10,000
  const prizePoolTotal = 80000;
  const operatingBudgetCeiling = 80000;

  const yellowCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");
  const yellowCardIncome = yellowCards.length * 1000;
  const redCardIncome = redCards.length * 3000;
  const totalFines = yellowCardIncome + redCardIncome;

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Financial Management & Closeout Report
          </h1>
          <p className="text-xs text-muted-foreground">
            Document 10 — Formal tournament income, operating budget ceiling, prize commitments and fine collections
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center gap-2 active:scale-[0.96] transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print Closeout Statement</span>
        </button>
      </div>

      {/* Main Statement Paper Sheet */}
      <div className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-card/80 space-y-8 text-xs sm:text-sm">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="font-extrabold text-base text-white tracking-wide uppercase">
              Winners Sports Competition (WSC)
            </div>
            <div className="text-xs text-brand-gold font-bold">
              Southern Delta University, Ozoro • First Edition
            </div>
            <div className="text-[11px] text-muted-foreground">
              Financial Closeout & Prize Policy Statement
            </div>
          </div>
          <div className="text-right text-[11px] text-muted-foreground">
            <div>Document: <strong className="text-white">DOC-10-FIN</strong></div>
            <div>Date: <strong className="text-white">{formatDate(new Date().toISOString())}</strong></div>
            <div>Status: <strong className="text-emerald-400">Audited & Balanced</strong></div>
          </div>
        </div>

        {/* Section 1: Registration Income */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-gold" />
            <span>1. Registration Revenue Ledger</span>
          </h3>
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            <div className="divide-y divide-white/5">
              <div className="p-3.5 flex justify-between">
                <span>16 Confirmed Teams @ ₦10,000 per team</span>
                <span className="font-mono font-bold text-white">₦160,000</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span>Marathon Individual Registrations</span>
                <span className="font-mono font-bold text-white">₦126,000</span>
              </div>
              <div className="p-3.5 flex justify-between bg-white/5 font-extrabold text-white">
                <span>Total Gross Registration Revenue</span>
                <span className="font-mono text-brand-gold text-base">₦286,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Prize Commitments */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Trophy className="w-4 h-4 text-brand-gold" />
            <span>2. Locked Prize Pool Commitments (50% of Football Income)</span>
          </h3>
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            <div className="divide-y divide-white/5">
              <div className="p-3.5 flex justify-between">
                <span>Champion (Winners Football Competition)</span>
                <span className="font-mono font-bold text-brand-gold">₦50,000</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span>Runner-Up (Finalist)</span>
                <span className="font-mono font-bold text-white">₦20,000</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span>Third Place Playoff Winner</span>
                <span className="font-mono font-bold text-white">₦10,000</span>
              </div>
              <div className="p-3.5 flex justify-between bg-white/5 font-extrabold text-white">
                <span>Total Football Prize Commitments</span>
                <span className="font-mono text-brand-gold text-base">₦80,000</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground italic">
            *In accordance with Document 01, Section 6, no cup or physical medals are funded in this first edition; all prize resources are disbursed directly via bank transfer.
          </p>
        </div>

        {/* Section 3: Operating Allowance Ceiling */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-emerald" />
            <span>3. Operating Budget Ceiling (Planning Allowance: ₦80,000)</span>
          </h3>
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            <div className="divide-y divide-white/5">
              <div className="p-3.5 flex justify-between text-muted-foreground">
                <span>Referee & Match Officials Allowance</span>
                <span className="font-mono text-white">₦15,000</span>
              </div>
              <div className="p-3.5 flex justify-between text-muted-foreground">
                <span>Pitch Marking & Venue Preparation</span>
                <span className="font-mono text-white">₦15,000</span>
              </div>
              <div className="p-3.5 flex justify-between text-muted-foreground">
                <span>First-Aid & Emergency Response Standby</span>
                <span className="font-mono text-white">₦7,000</span>
              </div>
              <div className="p-3.5 flex justify-between text-muted-foreground">
                <span>Volunteer Media Support (Data & Refreshment)</span>
                <span className="font-mono text-white">₦8,000</span>
              </div>
              <div className="p-3.5 flex justify-between text-muted-foreground">
                <span>Contingency Balance</span>
                <span className="font-mono text-white">₦35,000</span>
              </div>
              <div className="p-3.5 flex justify-between bg-white/5 font-extrabold text-white">
                <span>Maximum Permitted Operating Ceiling</span>
                <span className="font-mono text-brand-emerald text-base">₦80,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Disciplinary Fines */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-red-400" />
            <span>4. Disciplinary Fines Collections</span>
          </h3>
          <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/30">
            <div className="divide-y divide-white/5">
              <div className="p-3.5 flex justify-between">
                <span>Yellow Card Fines ({yellowCards.length} cards @ ₦1,000)</span>
                <span className="font-mono text-white">₦{yellowCardIncome.toLocaleString()}</span>
              </div>
              <div className="p-3.5 flex justify-between">
                <span>Red Card Fines ({redCards.length} cards @ ₦3,000)</span>
                <span className="font-mono text-white">₦{redCardIncome.toLocaleString()}</span>
              </div>
              <div className="p-3.5 flex justify-between bg-white/5 font-extrabold text-white">
                <span>Total Fines Assessed</span>
                <span className="font-mono text-red-400 text-base">₦{totalFines.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            *Fines are tracked independently and not relied upon as guaranteed operational funds.
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 text-xs">
          <div className="space-y-1">
            <div className="text-muted-foreground">Finance Officer:</div>
            <div className="font-bold text-white">SDU Sports Finance Lead</div>
            <div className="text-[10px] text-muted-foreground">Verified & Cleared</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-muted-foreground">Tournament Director:</div>
            <div className="font-bold text-white">Executive Director (WSC)</div>
            <div className="text-[10px] text-muted-foreground">Southern Delta University, Ozoro</div>
          </div>
        </div>
      </div>
    </div>
  );
}
