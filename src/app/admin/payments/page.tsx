"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Payment } from "@/types";
import { 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Filter, 
  Download, 
  FileText,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { formatNaira, formatDate, formatDateTime } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(store.getPayments());
  const [statusFilter, setStatusFilter] = useState<"all" | "pending_verification" | "verified" | "rejected">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const handleVerify = (paymentId: string) => {
    store.verifyPayment(paymentId, "Finance Officer (SDU)", true);
    setPayments([...store.getPayments()]);
    store.addAuditLog({
      adminUserId: "admin-finance",
      adminName: "Finance Officer",
      action: "VERIFY_PAYMENT",
      entityType: "payment",
      entityId: paymentId,
      details: `Approved payment ${paymentId}. Bank receipt verified.`,
    });
    setNotification("Payment verified successfully and team confirmed!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReject = (paymentId: string) => {
    const reason = prompt("Enter rejection reason (e.g., Transfer not found in bank statement, invalid amount):");
    if (reason) {
      store.verifyPayment(paymentId, "Finance Officer (SDU)", false, reason);
      setPayments([...store.getPayments()]);
      store.addAuditLog({
        adminUserId: "admin-finance",
        adminName: "Finance Officer",
        action: "REJECT_PAYMENT",
        entityType: "payment",
        entityId: paymentId,
        details: `Rejected payment ${paymentId}. Reason: ${reason}`,
      });
      setNotification("Payment marked as rejected.");
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filtered = payments.filter((p) => {
    const matchesFilter = statusFilter === "all" || p.status === statusFilter;
    const matchesQuery = p.payerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.transferReference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const verifiedTotal = payments.filter(p => p.status === "verified").reduce((acc, p) => acc + p.amount, 0);
  const pendingTotal = payments.filter(p => p.status === "pending_verification").reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Payment Verification & Revenue Ledger
          </h1>
          <p className="text-xs text-muted-foreground">
            Document 10 — Manual bank transfer verification, audit receipts, and financial ledger
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground uppercase font-bold">Total Cleared</div>
            <div className="font-mono text-xl font-extrabold text-brand-gold">
              {formatNaira(verifiedTotal)}
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
          <span>{notification}</span>
        </div>
      )}

      {/* Financial Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase">
            <span>Verified & Cleared</span>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {formatNaira(verifiedTotal)}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Directly accounted into {siteConfig.bankDetails.bankName}
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
            <span>Pending Verification</span>
            <AlertCircle className="w-4 h-4" />
          </div>
          <div className="text-3xl font-mono font-extrabold text-white">
            {formatNaira(pendingTotal)}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Submitted transfer references awaiting bank ledger check
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-bold uppercase">
            <span>Official Bank Account</span>
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="font-mono text-base font-bold text-white truncate">
            {siteConfig.bankDetails.accountNumber}
          </div>
          <p className="text-[11px] text-muted-foreground">
            {siteConfig.bankDetails.bankName} • {siteConfig.bankDetails.accountName}
          </p>
        </div>
      </div>

      {/* Controls: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              statusFilter === "all" ? "bg-white/20 text-white" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            All ({payments.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending_verification")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5",
              statusFilter === "pending_verification" ? "bg-amber-500 text-black" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            Pending Verification ({payments.filter(p => p.status === "pending_verification").length})
          </button>
          <button
            onClick={() => setStatusFilter("verified")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5",
              statusFilter === "verified" ? "bg-emerald-500 text-white" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            Verified ({payments.filter(p => p.status === "verified").length})
          </button>
          <button
            onClick={() => setStatusFilter("rejected")}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
              statusFilter === "rejected" ? "bg-red-500 text-white" : "bg-white/5 text-muted-foreground hover:text-white"
            )}
          >
            Rejected
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payer or reference..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-brand-gold"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-card/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5">Reference ID</th>
                <th className="p-3.5">Payer Name</th>
                <th className="p-3.5">Event</th>
                <th className="p-3.5">Transfer Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Verified By</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => {
                const isVerified = p.status === "verified";
                const isPending = p.status === "pending_verification";

                return (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-brand-gold">
                      {p.transferReference}
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      {p.payerName}
                    </td>
                    <td className="p-3.5 text-muted-foreground">
                      {p.eventId === "e-football-001" ? "WFC Football (₦10k)" : "WMC Marathon"}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-white/80">
                      {p.transferDate}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-white text-sm">
                      {formatNaira(p.amount)}
                    </td>
                    <td className="p-3.5">
                      <span className={cn(
                        "px-2.5 py-0.5 rounded text-[10px] font-bold uppercase",
                        isVerified ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        isPending ? "bg-amber-500/10 text-amber-300 border border-amber-500/20 animate-pulse" :
                        "bg-red-500/10 text-red-400 border border-red-500/20"
                      )}>
                        {p.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3.5 text-[11px] text-muted-foreground">
                      {p.verifiedByName || "-"}
                    </td>
                    <td className="p-3.5 text-right">
                      {isPending ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleVerify(p.id)}
                            className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(p.id)}
                            className="px-2.5 py-1 rounded-md bg-red-600/30 hover:bg-red-600 text-white font-bold text-[11px] transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-[11px]">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
