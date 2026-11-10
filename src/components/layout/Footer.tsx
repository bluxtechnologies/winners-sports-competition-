import Link from "next/link";
import { Trophy } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/30 text-muted-foreground text-xs">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-primary text-primary-foreground font-bold">
                <Trophy className="h-4 w-4" />
              </div>
              <span className="font-bold text-foreground text-sm tracking-tight">WSC</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Winners Sports Competition (WSC) — Sports event management platform for Southern Delta University, Ozoro. Powering the Winners Football Competition (WFC) and Winners Marathon Challenge (WMC).
            </p>
            <div className="pt-2 text-[11px] text-muted-foreground">
              Host: {siteConfig.hostInstitution}
            </div>
          </div>

          {/* Football Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Football (WFC)
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/football" className="hover:text-foreground transition-colors">
                  16-Team Knockout Bracket
                </Link>
              </li>
              <li>
                <Link href="/football#fixtures" className="hover:text-foreground transition-colors">
                  Fixtures & Match Results
                </Link>
              </li>
              <li>
                <Link href="/football#rules" className="hover:text-foreground transition-colors">
                  Monkey Post Rules & Fines
                </Link>
              </li>
              <li>
                <Link href="/football/register" className="text-primary hover:underline font-medium">
                  Register Team (Captain)
                </Link>
              </li>
              <li>
                <Link href="/football/join" className="text-primary hover:underline font-medium">
                  Join Team with Invite Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Marathon Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Marathon (WMC)
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/marathon" className="hover:text-foreground transition-colors">
                  10K & 5K Campus Divisions
                </Link>
              </li>
              <li>
                <Link href="/marathon#route" className="hover:text-foreground transition-colors">
                  Campus Route & Water Stations
                </Link>
              </li>
              <li>
                <Link href="/marathon#results" className="hover:text-foreground transition-colors">
                  Race Results & Bib Lookup
                </Link>
              </li>
              <li>
                <Link href="/marathon#safety" className="hover:text-foreground transition-colors">
                  Safety & Emergency Guidelines
                </Link>
              </li>
              <li>
                <Link href="/marathon/register" className="text-primary hover:underline font-medium">
                  Individual Runner Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Tournament Information */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Tournament Information
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/events" className="hover:text-foreground transition-colors">
                  Event Directory
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-foreground transition-colors">
                  Tournament Media Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About WSC Organisation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Committee
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-muted-foreground text-[11px]">
          <div>
            © {new Date().getFullYear()} Winners Sports Competition (WSC). All rights reserved.
          </div>
          <div>
            Built for Southern Delta University, Ozoro
          </div>
        </div>
      </div>
    </footer>
  );
}
