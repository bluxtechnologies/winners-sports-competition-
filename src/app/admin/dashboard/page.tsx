"use client";

import Link from "next/link";
import { 
  Trophy, 
  Timer, 
  CreditCard, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Clock,
  ShieldCheck,
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

  const footballEvent = store.getEventById("e-football-001");
  const maxTeams = footballEvent?.maxTeams || 16;
  const prizePool = footballEvent?.prizePoolTotal || 80000;

  const verifiedPayments = payments.filter((p) => p.status === "verified");
  const pendingPayments = payments.filter((p) => p.status === "pending_verification");
  const totalRevenue = verifiedPayments.reduce((acc, p) => acc + p.amount, 0);

  const completedMatches = matches.filter((m) => m.status === "completed").length;
  const yellowCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "yellow_card");
  const redCards = matches.flatMap((m) => m.events || []).filter((e) => e.eventType === "red_card");

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Platform Overview
          </h1>
          <p className="text-xs text-muted-foreground">
            Southern Delta University, Ozoro • Winners Sports Competition Engine
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/payments"
            className="px-3 py-1.5 rounded-[6px] border border-border bg-background hover:bg-muted text-foreground text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5 text-primary" />
            <span>Verify Payments ({pendingPayments.length})</span>
          </Link>
          <Link
            href="/admin/football"
            className="px-3 py-1.5 rounded-[6px] bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Manage Matches</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Verified Income */}
        <div className="rounded-[6px] border border-border bg-card p-4 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Verified Revenue</span>
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">
              {formatNaira(totalRevenue)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {verifiedPayments.length} transactions audited
            </p>
          </div>
        </div>

        {/* Football Teams */}
        <div className="rounded-[6px] border border-border bg-card p-4 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">WFC Teams</span>
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">
              {teams.length} / {maxTeams}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {footballEvent?.squadSize || 7}-player rosters active
            </p>
          </div>
        </div>

        {/* Marathon Runners */}
        <div className="rounded-[6px] border border-border bg-card p-4 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">WMC Runners</span>
            <Timer className="w-4 h-4 text-primary" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">
              {participants.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              10K & 5K registered runners
            </p>
          </div>
        </div>

        {/* Matches Progress */}
        <div className="rounded-[6px] border border-border bg-card p-4 space-y-2 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Matches Concluded</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-mono font-bold text-foreground">
              {completedMatches} / {matches.length}
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {yellowCards.length} Yellow • {redCards.length} Red cards
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Actions & Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Operational Status */}
        <div className="lg:col-span-1 rounded-[6px] border border-border bg-card p-5 space-y-4 shadow-subtle text-xs">
          <div className="font-semibold text-foreground text-sm border-b border-border pb-2.5">
            Operational Highlights
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-[6px] bg-muted/30 border border-border space-y-1">
              <div className="font-semibold text-foreground">Pending Payment Verifications</div>
              <p className="text-muted-foreground text-[11px]">
                {pendingPayments.length} bank transfers are awaiting finance desk confirmation.
              </p>
              <Link href="/admin/payments" className="text-primary hover:underline font-medium text-[11px] inline-block mt-1">
                Review payment proofs &rarr;
              </Link>
            </div>

            <div className="p-3 rounded-[6px] bg-muted/30 border border-border space-y-1">
              <div className="font-semibold text-foreground">Dynamic Tournament Setup</div>
              <p className="text-muted-foreground text-[11px]">
                {maxTeams} Teams • {formatNaira(prizePool)} Pool • {footballEvent?.halfDurationMinutes || 20}m halves
              </p>
              <Link href="/admin/events" className="text-primary hover:underline font-medium text-[11px] inline-block mt-1">
                Edit parameters &rarr;
              </Link>
            </div>

            <div className="p-3 rounded-[6px] bg-muted/30 border border-border space-y-1">
              <div className="font-semibold text-foreground">Marathon Readiness</div>
              <p className="text-muted-foreground text-[11px]">
                Checkpoints, numbered bib allocation, and health centre emergency logistics.
              </p>
              <Link href="/admin/marathon" className="text-primary hover:underline font-medium text-[11px] inline-block mt-1">
                Manage race check-in &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Audit Logs Table */}
        <div className="lg:col-span-2 rounded-[6px] border border-border bg-card p-5 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Recent Audit Activity</h3>
              <p className="text-[11px] text-muted-foreground">Immutable administrative actions & match events</p>
            </div>
            <Link href="/admin/audit" className="text-xs text-primary hover:underline font-medium">
              View all
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] uppercase font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-2 px-2">Time</th>
                  <th className="py-2 px-2">Admin / Action</th>
                  <th className="py-2 px-2">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[11px]">
                {auditLogs.slice(0, 6).map((log) => (
                  <tr key={log.id} className="hover:bg-muted/20">
                    <td className="py-2 px-2 text-muted-foreground font-mono whitespace-nowrap">
                      {formatDateTime(log.createdAt)}
                    </td>
                    <td className="py-2 px-2 whitespace-nowrap">
                      <div className="font-medium text-foreground">{log.adminName}</div>
                      <div className="text-[10px] text-primary font-mono">{log.action}</div>
                    </td>
                    <td className="py-2 px-2 text-muted-foreground max-w-xs truncate">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
