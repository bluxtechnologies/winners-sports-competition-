import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  ArrowRight, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Users, 
  Video, 
  Sparkles,
  Award
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { store } from "@/services/store";
import { formatNaira, formatDate } from "@/lib/utils";
import { MatchScorecard } from "@/components/shared/MatchScorecard";

export default function HomePage() {
  const events = store.getEvents();
  const footballEvent = events.find((e) => e.categoryId === "football");
  const marathonEvent = events.find((e) => e.categoryId === "marathon");
  const matches = store.getMatches();
  const recentMatches = matches.slice(0, 4);
  const mediaHighlights = store.getMedia().slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-white/10 bg-gradient-to-b from-black via-slate-950 to-background">
        {/* Glow ambient circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-gold/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-brand-emerald/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 space-y-8 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-amber-500/10 text-brand-gold text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Southern Delta University, Ozoro • Official Platform</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
            Where Champions <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-300 to-amber-500">Compete & Win</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The unified tournament management platform for Southern Delta University. One shared sports engine powering the <strong>Winners Football Competition (WFC)</strong> and the <strong>Winners Marathon Challenge (WMC)</strong>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/football"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 active:scale-[0.96] transition-all"
            >
              <Trophy className="w-4 h-4 stroke-[2.5]" />
              <span>Explore Football (WFC)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/marathon"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm backdrop-blur active:scale-[0.96] transition-all"
            >
              <Timer className="w-4 h-4 text-brand-emerald" />
              <span>Marathon Challenge (WMC)</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-10 border-t border-white/10 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">16</div>
              <div className="text-xs text-muted-foreground font-medium">Confirmed Football Teams</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-gold">₦80,000</div>
              <div className="text-xs text-muted-foreground font-medium">Football Cash Prizes</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-brand-emerald">10K & 5K</div>
              <div className="text-xs text-muted-foreground font-medium">Campus Road Races</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">100%</div>
              <div className="text-xs text-muted-foreground font-medium">SDU Student Verified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Categories Showcase */}
      <section className="container space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            Two Premier Categories, One Unified Platform
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Built on a shared events engine with separate specialized workflows for football squad knockouts and individual marathon timing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Football Category Card */}
          <div className="athletic-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-brand-gold border border-brand-gold/30">
                  <Trophy className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Knockout Stage Active
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                  Monkey Post 5-a-Side
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Winners Football Competition
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Single-elimination knockout between 16 student teams. 5 players on pitch with small goalposts and no fixed goalkeeper. 20-minute halves, phone-based video reviews and 15-minute walkover grace period.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">₦50,000</div>
                  <div className="text-[10px] text-muted-foreground">Champion</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">₦20,000</div>
                  <div className="text-[10px] text-muted-foreground">Runner-up</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">₦10,000</div>
                  <div className="text-[10px] text-muted-foreground">3rd Place</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <Link
                href="/football"
                className="text-xs font-bold text-brand-gold hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>View 16-Team Bracket</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/football/register"
                className="text-xs font-bold px-4 py-2 rounded-lg bg-brand-gold text-black hover:bg-amber-400 active:scale-[0.96] transition-all"
              >
                Team Registration
              </Link>
            </div>
          </div>

          {/* Marathon Category Card */}
          <div className="athletic-card rounded-3xl p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-brand-emerald border border-brand-emerald/30">
                  <Timer className="h-6 w-6 stroke-[2.5]" />
                </div>
                <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Registration Open
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-brand-emerald uppercase tracking-wider">
                  Campus Road Running
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Winners Marathon Challenge
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Campus-wide endurance challenge featuring the 10K Campus Elite (timed competition) and the 5K Campus Fun Run. Official numbered bibs, water & first-aid stations every 2.5km, and medical safety check-in.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">10K & 5K</div>
                  <div className="text-[10px] text-muted-foreground">Divisions</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">₦50,000</div>
                  <div className="text-[10px] text-muted-foreground">Podium Pool</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="font-bold text-white text-sm">Dec 8</div>
                  <div className="text-[10px] text-muted-foreground">Race Day</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <Link
                href="/marathon"
                className="text-xs font-bold text-brand-emerald hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>View Route & Divisions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/marathon/register"
                className="text-xs font-bold px-4 py-2 rounded-lg bg-brand-emerald text-white hover:bg-emerald-600 active:scale-[0.96] transition-all"
              >
                Runner Registration
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section className="container space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white uppercase tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-brand-gold animate-pulse" />
              <span>Latest Match Results & Fixtures</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Official scores and updates from Southern Delta University sports grounds
            </p>
          </div>
          <Link
            href="/football"
            className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1"
          >
            <span>View Complete 16 Matches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentMatches.map((match) => (
            <MatchScorecard key={match.id} match={match} />
          ))}
        </div>
      </section>

      {/* Volunteer Media / Social Proof Section */}
      <section className="container space-y-8">
        <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-r from-amber-950/20 via-black to-emerald-950/20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-gold">
                <Video className="w-4 h-4" />
                <span>Volunteer Coverage</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Matchday Highlights on Instagram & TikTok
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Coverage supported by student friends volunteering camera phones for match recordings, goal highlights, and captain interviews. Follow the official channels for live updates!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs shadow-lg shadow-pink-500/20 active:scale-[0.96] transition-all"
              >
                Follow on Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs active:scale-[0.96] transition-all"
              >
                Follow on TikTok
              </a>
            </div>
          </div>

          {/* Media highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {mediaHighlights.map((media) => (
              <div 
                key={media.id} 
                className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] group hover:border-brand-gold/40 transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-slate-900">
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur">
                    {media.platform}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-bold text-xs text-white line-clamp-1">
                    {media.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {media.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
