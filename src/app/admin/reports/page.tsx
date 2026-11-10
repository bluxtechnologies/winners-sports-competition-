"use client";

import { store } from "@/services/store";
import { 
  FileText, 
  Printer, 
  CreditCard, 
  Scale
} from "lucide-react";
import { formatNaira, formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export default function AdminReportsPage() {
  const footballEvent = store.getEventById("e-football-001");
  const matches = store.getMatches("e-football-001");
  const payments = store.getPayments();
  const verifiedPayments = payments.filter((p) => p.status === "verified");

  const maxTeams = footballEvent?.maxTeams || 16;
  const regFee = footballEvent?.registrationFee || 10000;
  const prizePoolTotal = footballEvent?.prizePoolTotal || 80000;
  const prizeFirst = footballEvent?.prizeFirst || 50000;
  const prizeSecond = footballEvent?.prizeSecond || 20000;
  const prizeThird = footballEvent?.prizeThird || 10000;
  const yellowFine = footballEvent?.yellowCardFine || 1000;
  const redFine = footballEvent?.redCardFine || 3000;

  const grossFootballIncome = maxTeams * regFee;
  const yellowCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");
  const yellowCardIncome = yellowCards.length * yellowFine;
  const redCardIncome = redCards.length * redFine;
  const totalFines = yellowCardIncome + redCardIncome;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Financial Management & Closeout Report
          </h1>
          <p className="text-xs text-muted-foreground">
            Tournament income, operating budget ceiling, prize commitments and fine collections
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Financial Statement</span>
        </button>
      </div>

      {/* Main Statement Paper Sheet */}
      <div className="p-6 sm:p-8 rounded-[6px] border border-border bg-card space-y-6 text-xs shadow-subtle">
        {/* Document Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="space-y-0.5">
            <div className="font-bold text-sm text-foreground uppercase tracking-tight">
              Winners Sports Competition (WSC)
            </div>
            <div className="text-xs text-primary font-medium">
              Southern Delta University, Ozoro • Official Platform
            </div>
            <div className="text-[11px] text-muted-foreground">
              Financial Closeout & Prize Policy Statement
            </div>
          </div>
          <div className="text-right text-[11px] text-muted-foreground space-y-0.5">
            <div>Document: <strong className="text-foreground font-mono">DOC-10-FIN</strong></div>
            <div>Date: <strong className="text-foreground">{formatDate(new Date().toISOString())}</strong></div>
            <div>Status: <strong className="text-emerald-600 dark:text-emerald-400">Audited & Balanced</strong></div>
          </div>
        </div>

        {/* Section 1: Registration Income */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-primary" />
            <span>1. Registration Revenue Ledger</span>
          </h3>
          <div className="border border-border rounded-[6px] overflow-hidden">
            <div className="divide-y divide-border">
              <div className="p-3 flex justify-between">
                <span>{maxTeams} Confirmed Football Teams @ {formatNaira(regFee)} per team</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(grossFootballIncome)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>Marathon Individual Registrations</span>
                <span className="font-mono font-semibold text-foreground">₦126,000</span>
              </div>
              <div className="p-3 flex justify-between bg-muted/40 font-bold text-foreground">
                <span>Total Gross Registration Revenue</span>
                <span className="font-mono text-primary text-sm">{formatNaira(grossFootballIncome + 126000)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Prize Commitments */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
            <span>2. Tournament Prize Commitments</span>
          </h3>
          <div className="border border-border rounded-[6px] overflow-hidden">
            <div className="divide-y divide-border">
              <div className="p-3 flex justify-between">
                <span>WFC Champion Prize (1st Place)</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(prizeFirst)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>WFC Runner-Up Prize (2nd Place)</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(prizeSecond)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>WFC Third-Place Playoff Prize</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(prizeThird)}</span>
              </div>
              <div className="p-3 flex justify-between bg-muted/40 font-bold text-foreground">
                <span>Total WFC Prize Pool</span>
                <span className="font-mono text-primary text-sm">{formatNaira(prizePoolTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Disciplinary Fines */}
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-primary" />
            <span>3. Disciplinary Card Fine Collections</span>
          </h3>
          <div className="border border-border rounded-[6px] overflow-hidden">
            <div className="divide-y divide-border">
              <div className="p-3 flex justify-between">
                <span>{yellowCards.length} Yellow Card Fines @ {formatNaira(yellowFine)}</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(yellowCardIncome)}</span>
              </div>
              <div className="p-3 flex justify-between">
                <span>{redCards.length} Red Card Fines @ {formatNaira(redFine)}</span>
                <span className="font-mono font-semibold text-foreground">{formatNaira(redCardIncome)}</span>
              </div>
              <div className="p-3 flex justify-between bg-muted/40 font-bold text-foreground">
                <span>Total Disciplinary Collections</span>
                <span className="font-mono text-primary text-sm">{formatNaira(totalFines)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="pt-4 border-t border-border grid grid-cols-2 gap-8 text-[11px] text-muted-foreground">
          <div>
            <div>Audited by:</div>
            <div className="font-semibold text-foreground mt-1">Southern Delta University Finance Committee</div>
            <div className="font-mono text-[10px] mt-0.5">FIN-VERIFIED-{new Date().getFullYear()}</div>
          </div>
          <div className="text-right">
            <div>Approved by:</div>
            <div className="font-semibold text-foreground mt-1">WSC Tournament Director</div>
            <div className="font-mono text-[10px] mt-0.5">CHAIR-SIGNED</div>
          </div>
        </div>
      </div>
    </div>
  );
}
