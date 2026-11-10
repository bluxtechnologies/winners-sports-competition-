import { Trophy, Scale, Users, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-primary" />
          <span>Governance & Constitution</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          About Winners Sports Competition
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          The official sports-event management organization for Southern Delta University, Ozoro. Dedicated to student athletic development, fair play, and transparent tournament governance.
        </p>
      </div>

      {/* Host Institution & Mission */}
      <div className="p-6 rounded-[6px] border border-border bg-card space-y-3 shadow-subtle text-xs">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Trophy className="w-4 h-4 text-primary" />
          <span>Mission & Institutional Governance</span>
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Winners Sports Competition (WSC) is an organized sports platform founded to deliver premier campus competitions for Southern Delta University, Ozoro. Operating on a unified sports-event engine, WSC coordinates the Winners Football Competition (WFC 5-a-side Monkey Post knockout) and the Winners Marathon Challenge (WMC 10K & 5K campus road races) under shared operational standards, bank audited financials, and dedicated officiating.
        </p>
      </div>

      {/* Tournament Committee */}
      <div className="space-y-3 text-xs">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <span>Tournament Advisory Committee</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Tournament Director</div>
            <div className="text-primary font-medium text-[11px]">Executive Oversight</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Overall coordination, schedule validation, and administrative governance.
            </p>
          </div>

          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Finance Officer</div>
            <div className="text-primary font-medium text-[11px]">Accounts & Audits</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Manual bank transfer verification, receipt reconciliations, and prize disbursement.
            </p>
          </div>

          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Fixtures Coordinator</div>
            <div className="text-primary font-medium text-[11px]">Operations & Pitches</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Draw administration, bracket progression, pitch readiness, and official match sheets.
            </p>
          </div>

          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Referee Coordinator</div>
            <div className="text-primary font-medium text-[11px]">Officiating & Fair Play</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Appoints referees and oversees Monkey Post rules and phone video review protocols.
            </p>
          </div>

          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Disciplinary Panel</div>
            <div className="text-primary font-medium text-[11px]">Sanctions & Inquiries</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Reviews match protests, maintains card fines register, and resolves disputes.
            </p>
          </div>

          <div className="p-3.5 rounded-[6px] border border-border bg-card space-y-1 shadow-subtle">
            <div className="font-semibold text-foreground text-xs">Media Coordinator</div>
            <div className="text-primary font-medium text-[11px]">Coverage & Volunteers</div>
            <p className="text-muted-foreground text-[11px] pt-0.5">
              Coordinates sideline recording volunteers, media highlights, and official coverage.
            </p>
          </div>
        </div>
      </div>

      {/* Core Operational Principles */}
      <div id="terms" className="p-6 rounded-[6px] border border-border bg-card space-y-4 text-xs shadow-subtle">
        <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Scale className="w-4 h-4 text-primary" />
          <span>Core Operational Principles</span>
        </h2>
        
        <div className="space-y-3">
          <div className="p-3 rounded-[6px] border border-border bg-muted/20 space-y-1">
            <h4 className="font-semibold text-foreground">1. Financial Transparency & Zero On-Pitch Cash Handling</h4>
            <p className="text-muted-foreground leading-relaxed">
              All registration fees and disciplinary card fines are remitted strictly via official bank transfers into the designated SDU Winners Sports account. Match referees and coordinators never collect or handle cash on the pitch.
            </p>
          </div>

          <div className="p-3 rounded-[6px] border border-border bg-muted/20 space-y-1">
            <h4 className="font-semibold text-foreground">2. Designated Phone Video Review Protocol</h4>
            <p className="text-muted-foreground leading-relaxed">
              To guarantee competitive fairness in Monkey Post matches without full VAR infrastructure, a designated official phone camera records goalmouth actions. The match coordinator and referee can review footage before confirming or overturning contentious calls.
            </p>
          </div>

          <div className="p-3 rounded-[6px] border border-border bg-muted/20 space-y-1">
            <h4 className="font-semibold text-foreground">3. Student Safety & First Aid Readiness</h4>
            <p className="text-muted-foreground leading-relaxed">
              Marathon operations are safeguarded with mandatory emergency contact registration, 2.5km hydration stations, and SDU University Health Centre medical personnel along the course circuit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
