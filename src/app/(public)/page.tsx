import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  UserPlus
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { formatNaira } from "@/lib/utils";
import { MatchScorecard } from "@/components/shared/MatchScorecard";

export default function HomePage() {
  const events = store.getEvents();
  const footballEvent = events.find((e) => e.categoryId === "football");
  const marathonEvent = events.find((e) => e.categoryId === "marathon");
  const matches = store.getMatches();
  const recentMatches = matches.slice(0, 4);

  // Dynamic tournament parameters from footballEvent
  const maxTeams = footballEvent?.maxTeams ?? 16;
  const squadSize = footballEvent?.squadSize ?? 7;
  const playersOnPitch = footballEvent?.playersOnPitch ?? 5;
  const prizePoolTotal = footballEvent?.prizePoolTotal ?? 80000;
  const halfDuration = footballEvent?.halfDurationMinutes ?? 20;
  const gracePeriod = footballEvent?.gracePeriodMinutes ?? 15;

  return (
    <div className="space-y-16 pb-20">
      {/* Enterprise Hero Section */}
      <section className="border-b border-border bg-background pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="container max-w-5xl mx-auto space-y-8">
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-[6px] bg-primary inline-block" />
            <span>Southern Delta University, Ozoro • Unified Sports Management Platform</span>
          </div>

          {/* Hero Headline & Subheading */}
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
              Winners Sports Competition
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              The official collegiate sports event infrastructure for Southern Delta University. A unified platform coordinating the <strong>Winners Football Competition (WFC)</strong> and the <strong>Winners Marathon Challenge (WMC)</strong> with shared participant verification, bank payment audits, live results, and official match officiating.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/football"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs transition-colors"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Explore Football (WFC)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>

            <Link
              href="/football/join"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground font-medium text-xs transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5 text-primary" />
              <span>Join Team with Invite Code</span>
            </Link>

            <Link
              href="/marathon"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground font-medium text-xs transition-colors"
            >
              <Timer className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Marathon Challenge (WMC)</span>
            </Link>
          </div>

          {/* Dynamic Key Tournament Parameters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-6 border-t border-border">
            <div className="p-3.5 rounded-[6px] border border-border bg-card">
              <div className="text-xl font-bold font-mono text-foreground">{maxTeams} Teams</div>
              <div className="text-xs text-muted-foreground mt-0.5">Tournament Draw</div>
            </div>
            <div className="p-3.5 rounded-[6px] border border-border bg-card">
              <div className="text-xl font-bold font-mono text-foreground">{squadSize} Players Roster</div>
              <div className="text-xs text-muted-foreground mt-0.5">({playersOnPitch} on Pitch)</div>
            </div>
            <div className="p-3.5 rounded-[6px] border border-border bg-card">
              <div className="text-xl font-bold font-mono text-primary">{formatNaira(prizePoolTotal)}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total Cash Prize Pool</div>
            </div>
            <div className="p-3.5 rounded-[6px] border border-border bg-card">
              <div className="text-xl font-bold font-mono text-foreground">{halfDuration} + {halfDuration} Min</div>
              <div className="text-xs text-muted-foreground mt-0.5">Regulation Match Duration</div>
            </div>
            <div className="p-3.5 rounded-[6px] border border-border bg-card col-span-2 sm:col-span-1">
              <div className="text-xl font-bold font-mono text-foreground">{gracePeriod} Mins</div>
              <div className="text-xs text-muted-foreground mt-0.5">Walkover Grace Period</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Categories Overview */}
      <section className="container max-w-5xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">
            Competition Categories
          </h2>
          <p className="text-xs text-muted-foreground">
            Southern Delta University collegiate competitions operating under unified platform governance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Football Category Card */}
          <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 flex flex-col justify-between shadow-subtle">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-primary/10 text-primary border border-primary/20">
                  <Trophy className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                  Registration Open
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  5-A-Side Knockout
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  Winners Football Competition (WFC)
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Single-elimination Monkey Post football competition featuring {maxTeams} registered student squads. {halfDuration}-minute halves, small goalposts with no fixed goalkeeper, and official phone video review capabilities.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground text-xs">{maxTeams} Teams</div>
                  <div className="text-[10px] text-muted-foreground">{squadSize} Squad</div>
                </div>
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-primary text-xs">{formatNaira(prizePoolTotal)}</div>
                  <div className="text-[10px] text-muted-foreground">Prize Pool</div>
                </div>
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground text-xs">{halfDuration}+{halfDuration}m</div>
                  <div className="text-[10px] text-muted-foreground">Duration</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <Link
                href="/football"
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
              >
                <span>View Tournament Bracket</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/football/join"
                  className="text-xs font-medium px-3 py-1.5 rounded-[6px] border border-border text-foreground hover:bg-muted"
                >
                  Join via Code
                </Link>
                <Link
                  href="/football/register"
                  className="text-xs font-semibold px-3 py-1.5 rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Register Team
                </Link>
              </div>
            </div>
          </div>

          {/* Marathon Category Card */}
          <div className="rounded-[6px] border border-border bg-card p-6 space-y-5 flex flex-col justify-between shadow-subtle">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-muted text-foreground border border-border">
                  <Timer className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                  Registration Open
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Campus Road Running
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  Winners Marathon Challenge (WMC)
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Campus-wide endurance road running competition featuring the 10K Campus Elite division and 5K Campus Fun Run. Official numbered bib credentials, checkpoint tracking, and on-site medical first aid.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-xs">
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground text-xs">10K & 5K</div>
                  <div className="text-[10px] text-muted-foreground">Divisions</div>
                </div>
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground text-xs">₦50,000</div>
                  <div className="text-[10px] text-muted-foreground">Podium Pool</div>
                </div>
                <div className="p-2 rounded-[6px] bg-muted/40 border border-border">
                  <div className="font-semibold text-foreground text-xs">Dec 8</div>
                  <div className="text-[10px] text-muted-foreground">Race Day</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
              <Link
                href="/marathon"
                className="text-xs font-semibold text-foreground hover:underline flex items-center gap-1"
              >
                <span>View Route & Divisions</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <Link
                href="/marathon/register"
                className="text-xs font-semibold px-3 py-1.5 rounded-[6px] bg-foreground text-background hover:bg-foreground/90"
              >
                Register Runner
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Match Results */}
      <section className="container max-w-5xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Recent Fixtures & Officiating Records
            </h2>
            <p className="text-xs text-muted-foreground">
              Official scores verified by SDU match coordinators and referee reports
            </p>
          </div>
          <Link
            href="/football"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>View All Matches</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentMatches.map((match) => (
            <MatchScorecard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Shared Platform Architecture Highlight */}
      <section className="container max-w-5xl">
        <div className="rounded-[6px] border border-border bg-muted/30 p-6 space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              Unified Sports Event Architecture
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              WSC operates a single shared core across all sports divisions. Participant records, manual bank payment audits, disciplinary registers, and event scheduling share one unified data model and administrative governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-[6px] bg-background border border-border space-y-1">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Captain Account System</span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Captains register their team and generate unique invitation codes for teammates to join without friction.
              </p>
            </div>

            <div className="p-3 rounded-[6px] bg-background border border-border space-y-1">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Audited Bank Payments</span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Registration fees verified against bank statements with full administrative sign-off and audit trails.
              </p>
            </div>

            <div className="p-3 rounded-[6px] bg-background border border-border space-y-1">
              <div className="font-semibold text-foreground flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Dynamic Configuration</span>
              </div>
              <p className="text-muted-foreground text-[11px]">
                Prizes, roster limits, duration, and fines are configured via the admin console and update in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
