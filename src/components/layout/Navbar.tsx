"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Trophy, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Flame
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/85 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-950/60 via-amber-900/40 to-emerald-950/60 border-b border-amber-500/20 py-1.5 px-4 text-xs text-center text-amber-200/90 font-medium flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
        <span>
          <strong>WFC First Edition:</strong> 16-Team Knockout underway at Southern Delta University, Ozoro. ₦80,000 in Prizes!
        </span>
        <Link 
          href="/football" 
          className="underline hover:text-white inline-flex items-center gap-1 ml-1 font-semibold"
        >
          View Bracket <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="container flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg p-1"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-gold via-amber-500 to-amber-700 text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Trophy className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-white">WSC</span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-gold/15 text-brand-gold border border-brand-gold/30">
                SDU Ozoro
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground font-medium hidden sm:block">
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
                "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                isActive(item.href)
                  ? "text-brand-gold bg-amber-500/10 font-semibold"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 border border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>Admin Portal</span>
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black shadow-md shadow-amber-500/20 active:scale-[0.96] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Calendar className="w-4 h-4" />
            <span>Register Now</span>
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close main navigation menu" : "Open main navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-background/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-accordion-down">
          {siteConfig.nav.public.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3 py-2.5 text-base font-medium rounded-lg transition-colors",
                isActive(item.href)
                  ? "text-brand-gold bg-amber-500/10 font-bold"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-lg border border-white/15 text-white hover:bg-white/5"
            >
              <ShieldCheck className="w-4 h-4 text-brand-emerald" />
              <span>Admin Portal Login</span>
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-sm font-bold px-4 py-3 rounded-lg bg-brand-gold text-black shadow-lg shadow-amber-500/25"
            >
              <Calendar className="w-4 h-4" />
              <span>Join Competition</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
