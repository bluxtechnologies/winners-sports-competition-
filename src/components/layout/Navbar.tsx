"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Trophy, 
  Menu, 
  X, 
  ArrowRight,
  UserPlus
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      {/* Top Banner Notice */}
      <div className="bg-muted/70 border-b border-border py-1.5 px-4 text-xs text-center text-muted-foreground font-medium flex items-center justify-center gap-2">
        <span className="font-semibold text-foreground">WFC First Edition:</span>
        <span>16-Team Knockout Competition at Southern Delta University, Ozoro.</span>
        <Link 
          href="/football" 
          className="text-primary hover:underline inline-flex items-center gap-1 ml-1 font-semibold"
        >
          View Tournament Bracket <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[6px] p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-[6px] bg-primary text-primary-foreground font-bold text-sm">
            <Trophy className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-base text-foreground">WSC</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[6px] bg-muted text-muted-foreground border border-border">
                SDU Ozoro
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Winners Sports Competition
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {siteConfig.nav.public.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-[6px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                isActive(item.href)
                  ? "text-primary bg-primary/10 font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Guest Public Actions */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
            href="/football/join"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <UserPlus className="w-3.5 h-3.5 text-primary" />
            <span>Join Team</span>
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <span>Register Now</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-2">
          {siteConfig.nav.public.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2 text-xs font-medium rounded-[6px]",
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            <Link
              href="/football/join"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-[6px] border border-border text-foreground hover:bg-muted"
            >
              <UserPlus className="w-4 h-4 text-primary" />
              <span>Join Team with Invite Code</span>
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-center rounded-[6px] bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
export { Navbar };
