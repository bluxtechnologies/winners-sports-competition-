"use client";

import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  CreditCard, 
  Users, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Clock,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { store } from "@/services/store";
import { formatNaira, formatDate, formatDateTime } from "@/lib/utils";

export default function AdminDashboardPage() {
  const events = store.getEvents();
  const teams = store.getTeams();
  const matches = store.getMatches();
  const participants = store.getParticipants();
  const payments = store.getPayments();
  const auditLogs = store.getAuditLogs();

  const verifiedPayments = payments.filter((p) => p.status === "verified");
  const pendingPayments = payments.filter((p) => p.status === "pending_verification");
  const totalRevenue = verifiedPayments.reduce((acc, p) => acc + p.amount, 0);

  const completedMatches = matches.filter((m) => m.status === "completed").length;
  const yellowCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-muted-foreground">
            Southern Delta University, Ozoro • Winners Sports Competition Engine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/payments"
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 text-brand-gold border border-brand-gold/30 text-xs font-bold hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Verify Transfers ({pendingPayments.length})</span>
          </Link>
          <Link
            href="/admin/football"
            className="px-3.5 py-2 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-md shadow-amber-500/20 hover:bg-amber-400 transition-colors flex items-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Manage Matches</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Verified Income */}
        <div className="athletic-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">Verified Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-brand-emerald">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-mono font-extrabold text-white">
              {formatNaira(totalRevenue)}
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1">
              {verifiedPayments.length} transactions cleared
            </p>
          </div>
        </div>

        {/* Football Teams */}
        <div className="athletic-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">WFC Football</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-brand-gold">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-mono font-extrabold text-white">
              {teams.length} / 16
            </div>
            <p className="text-[11px] text-amber-300 font-semibold mt-1">
              Full 16-team knockout capacity
            </p>
          </div>
        </div>

        {/* Marathon Runners */}
        <div className="athletic-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">WMC Marathon</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-brand-emerald">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-mono font-extrabold text-white">
              {participants.length}
            </div>
            <p className="text-[11px] text-muted-foreground font-semibold mt-1">
              Runners registered across 10K & 5K
            </p>
          </div>
        </div>

        {/* Matches Completed */}
        <div className="athletic-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase">Matches Played</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-mono font-extrabold text-white">
              {completedMatches} / 16
            </div>
            <p className="text-[11px] text-purple-300 font-semibold mt-1">
              Quarter & Semi-finals completed
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Pending Action Alerts & Financial Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Quick Operations & Pending Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Operations Matrix */}
          <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4">
            <h3 className="font-extrabold text-base text-white">Quick Administrative Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link
                href="/admin/football"
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-gold/40 hover:bg-amber-500/5 space-y-2 transition-all block"
              >
                <Trophy className="w-5 h-5 text-brand-gold" />
                <div className="font-bold text-white">Record Match</div>
                <div className="text-[11px] text-muted-foreground">Scores & fines</div>
              </Link>

              <Link
                href="/admin/payments"
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-gold/40 hover:bg-amber-500/5 space-y-2 transition-all block"
              >
                <CreditCard className="w-5 h-5 text-brand-emerald" />
                <div className="font-bold text-white">Bank Transfers</div>
                <div className="text-[11px] text-muted-foreground">Verify payments</div>
              </Link>

              <Link
                href="/admin/marathon"
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-gold/40 hover:bg-amber-500/5 space-y-2 transition-all block"
              >
                <Timer className="w-5 h-5 text-purple-400" />
                <div className="font-bold text-white">Runner Check-in</div>
                <div className="text-[11px] text-muted-foreground">Bibs & timing</div>
              </Link>

              <Link
                href="/admin/reports"
                className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-brand-gold/40 hover:bg-amber-500/5 space-y-2 transition-all block"
              >
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <div className="font-bold text-white">Financial Closeout</div>
                <div className="text-[11px] text-muted-foreground">Budget & ledger</div>
              </Link>
            </div>
          </div>

          {/* Disciplinary Summary */}
          <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">Tournament Disciplinary Summary</h3>
              <Link href="/admin/football" className="text-xs text-brand-gold hover:underline font-bold">
                View in Football Console →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1">
                <span className="text-muted-foreground">Yellow Cards (₦1,000 fine)</span>
                <div className="text-2xl font-mono font-bold text-amber-400">
                  {yellowCards.length} Cards
                </div>
                <div className="text-[11px] text-muted-foreground">₦{yellowCards.length * 1000} assessed</div>
              </div>

              <div className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-1">
                <span className="text-muted-foreground">Red Cards (₦3,000 fine + Ban)</span>
                <div className="text-2xl font-mono font-bold text-red-400">
                  {redCards.length} Cards
                </div>
                <div className="text-[11px] text-muted-foreground">₦{redCards.length * 3000} assessed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Audit Log */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-white">Recent Audit Trail</h3>
              <Link href="/admin/audit" className="text-xs text-brand-gold hover:underline font-semibold">
                Full Log
              </Link>
            </div>

            <div className="space-y-3 text-xs">
              {auditLogs.slice(0, 5).map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.02] space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span className="font-bold text-brand-gold">{log.action}</span>
                    <span>{formatDateTime(log.createdAt)}</span>
                  </div>
                  <p className="text-white text-xs leading-relaxed">{log.details}</p>
                  <div className="text-[10px] text-muted-foreground">By: {log.adminName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
