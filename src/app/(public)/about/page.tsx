import { Trophy, ShieldCheck, Scale, Users, Award, BookOpen } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Governance & Constitution</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          About Winners Sports Competition
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          The official sports-event management organization for Southern Delta University, Ozoro. Operating with integrity, safety, transparent financials, and athletic excellence.
        </p>
      </div>

      {/* Host Institution & Mission */}
      <div className="p-8 rounded-3xl border border-white/10 bg-card/60 space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-brand-gold" />
          <span>Mission & Host Institution</span>
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Winners Sports Competition (WSC) was established to organize premier campus sports tournaments for current students of Southern Delta University, Ozoro. The first edition brings together 16 football teams in the Winners Football Competition (WFC) and hundreds of runners in the Winners Marathon Challenge (WMC).
        </p>
      </div>

      {/* Tournament Committee */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-gold" />
          <span>Tournament Committee (Document 02, Article 4)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Tournament Director</div>
            <div className="text-brand-gold font-medium">Executive Oversight</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Overall coordination, schedule approval, and final administrative authority.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Finance & Registration Officer</div>
            <div className="text-brand-gold font-medium">Accounts & Verifications</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Manual bank transfer verification, registration records, fine collections, and prize disbursement.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Match & Fixtures Coordinator</div>
            <div className="text-brand-gold font-medium">Operations & Pitches</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Draw administration, bracket progression, kickoff readiness, and official match reporting.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Referee Coordinator</div>
            <div className="text-brand-gold font-medium">Match Officials</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Appoints match officials and briefings on Monkey Post rules and phone video review protocols.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Disciplinary & Appeals Panel</div>
            <div className="text-brand-gold font-medium">Integrity & Sanctions</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Reviews written protests, assesses card fines, and manages sporting suspensions.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1">
            <div className="font-bold text-white text-sm">Media Coordinator</div>
            <div className="text-brand-gold font-medium">Volunteer Production</div>
            <p className="text-muted-foreground text-[11px] pt-1">
              Coordinates sideline phone camera operators and official Instagram/TikTok highlights.
            </p>
          </div>
        </div>
      </div>

      {/* Constitution & Key Locked Decisions */}
      <div id="terms" className="p-8 rounded-3xl border border-white/10 bg-card/60 space-y-6 text-xs sm:text-sm text-muted-foreground">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Scale className="w-5 h-5 text-brand-gold" />
          <span>Core Constitutional Commitments</span>
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1.5">
            <h4 className="font-bold text-white text-sm">Strict Financial Transparency</h4>
            <p className="leading-relaxed">
              50% of all team registration revenue (₦80,000 of ₦160,000) is guaranteed to the cash prize pool (₦50,000 champion, ₦20,000 runner-up, ₦10,000 3rd place). Card fines are not treated as guaranteed operational funds and referees do not collect cash on the pitch.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1.5">
            <h4 className="font-bold text-white text-sm">Student Integrity & No Dual Roster Representation</h4>
            <p className="leading-relaxed">
              Only verified current Southern Delta University students are eligible. No player may represent more than one team in the competition. Roster freeze occurs after the official random draw.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-1.5">
            <h4 className="font-bold text-white text-sm">Phone Video Review System</h4>
            <p className="leading-relaxed">
              To support referee decision-making without commercial VAR costs, matches are documented via designated sideline smartphones. Each captain is granted one formal appeal review per match.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
