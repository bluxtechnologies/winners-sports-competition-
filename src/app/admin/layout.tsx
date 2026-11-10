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
  UserCheck
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
    { label: "Events & Parameters", href: "/admin/events", icon: Calendar },
    { label: "Football Operations", href: "/admin/football", icon: Trophy },
    { label: "Marathon Operations", href: "/admin/marathon", icon: Timer },
    { label: "Payment Verification", href: "/admin/payments", icon: CreditCard },
    { label: "Media & Assets", href: "/admin/media", icon: ImageIcon },
    { label: "Financial Reports", href: "/admin/reports", icon: FileText },
    { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card p-4 justify-between">
        <div className="space-y-5">
          {/* Brand */}
          <div className="flex items-center gap-2.5 px-2">
            <div className="h-8 w-8 rounded-[6px] bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
              <Trophy className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground text-sm tracking-tight">WSC Admin</span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                SDU Ozoro Committee
              </p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-2.5 py-2 rounded-[6px] text-xs font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile */}
        <div className="pt-3 border-t border-border space-y-3">
          <div className="flex items-center justify-between text-xs px-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-[6px] bg-muted text-foreground flex items-center justify-center font-bold text-[10px] border border-border">
                FA
              </div>
              <div>
                <div className="font-semibold text-foreground text-[11px]">Finance Director</div>
                <div className="text-[10px] text-muted-foreground">Super Admin</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 pt-1 text-[11px]">
            <Link
              href="/"
              target="_blank"
              className="flex-1 px-2 py-1.5 rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public Portal</span>
            </Link>
            <Link
              href="/admin/login"
              className="px-2 py-1.5 rounded-[6px] hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center gap-1"
              title="Logout"
            >
              <LogOut className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-14 border-b border-border bg-card px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-1.5 rounded-[6px] text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="text-xs text-muted-foreground hidden sm:block">
              Winners Sports Competition Platform • Admin Console
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-muted/60 border border-border text-muted-foreground text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Session: <strong>Authenticated</strong></span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden border-b border-border bg-card p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-[6px] text-xs font-medium",
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
