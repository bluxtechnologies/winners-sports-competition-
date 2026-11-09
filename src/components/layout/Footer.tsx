import Link from "next/link";
import { Trophy, ShieldCheck, Heart, Instagram } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/40 text-muted-foreground text-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gold text-black">
                <Trophy className="h-5 w-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">WSC</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Winners Sports Competition (WSC) — Unified tournament platform for Southern Delta University, Ozoro. Hosting the Winners Football Competition (WFC) and Winners Marathon Challenge (WMC).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
              >
                <span className="font-bold text-xs">TikTok</span>
              </a>
            </div>
          </div>

          {/* Football Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Football (WFC)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/football" className="hover:text-white transition-colors">
                  16-Team Knockout Bracket
                </Link>
              </li>
              <li>
                <Link href="/football#fixtures" className="hover:text-white transition-colors">
                  Fixtures & Match Results
                </Link>
              </li>
              <li>
                <Link href="/football#rules" className="hover:text-white transition-colors">
                  Monkey Post Rules
                </Link>
              </li>
              <li>
                <Link href="/football#disciplinary" className="hover:text-white transition-colors">
                  Disciplinary Fines Register
                </Link>
              </li>
              <li>
                <Link href="/football/register" className="text-brand-gold hover:underline font-semibold">
                  Register 7-Player Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Marathon Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Marathon (WMC)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/marathon" className="hover:text-white transition-colors">
                  10K & 5K Campus Divisions
                </Link>
              </li>
              <li>
                <Link href="/marathon#route" className="hover:text-white transition-colors">
                  Campus Route & Aid Stations
                </Link>
              </li>
              <li>
                <Link href="/marathon#results" className="hover:text-white transition-colors">
                  Live Finish Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/marathon#safety" className="hover:text-white transition-colors">
                  Medical & Emergency Guidelines
                </Link>
              </li>
              <li>
                <Link href="/marathon/register" className="text-brand-emerald hover:underline font-semibold">
                  Register Runner (Bib Lookup)
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Bank Transfer Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Official Bank Verification
            </h4>
            <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs space-y-1.5">
              <div className="text-muted-foreground">Bank: <span className="text-white font-medium">{siteConfig.bankDetails.bankName}</span></div>
              <div className="text-muted-foreground">Account Name: <span className="text-white font-medium">{siteConfig.bankDetails.accountName}</span></div>
              <div className="text-muted-foreground">Account No: <span className="text-brand-gold font-mono font-bold tracking-wider">{siteConfig.bankDetails.accountNumber}</span></div>
              <div className="text-[11px] text-amber-300/80 pt-1 border-t border-white/10">
                Payment verification is done manually by Finance Officers. No cash on the pitch.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Winners Sports Competition. Southern Delta University, Ozoro.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">Constitution</Link>
            <Link href="/about#terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Protests & Contact</Link>
            <Link href="/admin/login" className="text-muted-foreground hover:text-brand-gold transition-colors inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
