"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Trophy, 
  LayoutDashboard, 
  Calendar, 
  Timer, 
  CreditCard, 
  Image as ImageIcon, 
  FileText, 
  ShieldAlert, 
  LogOut, 
  Menu, 
  X,
  ExternalLink,
  ShieldCheck,
  Bell
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // If on login page, render clean full-width layout without admin sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Events Engine", href: "/admin/events", icon: Calendar },
    { label: "Football (WFC)", href: "/admin/football", icon: Trophy },
    { label: "Marathon (WMC)", href: "/admin/marathon", icon: Timer },
    { label: "Payment Verification", href: "/admin/payments", icon: CreditCard },
    { label: "Media & Assets", href: "/admin/media", icon: ImageIcon },
    { label: "Financial Reports", href: "/admin/reports", icon: FileText },
    { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-black/60 p-5 justify-between">
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-gold to-amber-600 text-black flex items-center justify-center font-black">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-white text-base">WSC Admin</span>
              </div>
              <p className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">
                SDU Ozoro Committee
              </p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    isActive
                      ? "bg-brand-gold text-black shadow-md shadow-amber-500/20 font-bold"
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-brand-emerald flex items-center justify-center font-bold text-[11px]">
                FA
              </div>
              <div>
                <div className="font-bold text-white text-xs">SDU Admin</div>
                <div className="text-[10px] text-muted-foreground">Finance & Operations</div>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              title="Open Public Site"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-red-400 px-2 py-1 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Role / Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-background/80 backdrop-blur px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-xs font-semibold text-muted-foreground hidden sm:block">
              Winners Sports Competition Management Console
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Events Engine Online</span>
            </div>
            <Link
              href="/"
              className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1 ml-2"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Mobile Nav Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden border-b border-white/10 bg-slate-950 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold",
                    isActive ? "bg-brand-gold text-black font-bold" : "text-muted-foreground hover:text-white"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Main Body */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
