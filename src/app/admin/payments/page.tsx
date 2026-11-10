"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { Payment } from "@/types";
import { 
  CreditCard, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Download, 
  Check,
  AlertCircle
} from "lucide-react";
import { formatNaira, formatDate, formatDateTime } from "@/lib/utils";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Payment Verification & Revenue Ledger
          </h1>
          <p className="text-xs text-muted-foreground">
            Manual bank transfer verification, audit receipts, and financial ledger
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] text-muted-foreground uppercase font-semibold">Total Cleared</div>
            <div className="font-mono text-lg font-bold text-primary">
              {formatNaira(verifiedTotal)}
            </div>
          </div>
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-[6px] border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Financial Health Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-[6px] border border-border bg-card shadow-subtle space-y-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase">Verified Collections</div>
          <div className="font-mono text-2xl font-bold text-foreground">{formatNaira(verifiedTotal)}</div>
          <div className="text-[11px] text-muted-foreground">{payments.filter(p => p.status === "verified").length} transactions confirmed</div>
        </div>

        <div className="p-4 rounded-[6px] border border-border bg-card shadow-subtle space-y-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase">Pending Audit</div>
          <div className="font-mono text-2xl font-bold text-amber-600 dark:text-amber-400">{formatNaira(pendingTotal)}</div>
          <div className="text-[11px] text-muted-foreground">{payments.filter(p => p.status === "pending_verification").length} awaiting bank matching</div>
        </div>

        <div className="p-4 rounded-[6px] border border-border bg-card shadow-subtle space-y-1">
          <div className="text-[11px] font-semibold text-muted-foreground uppercase">Reconciliation Status</div>
          <div className="font-mono text-2xl font-bold text-foreground">100%</div>
          <div className="text-[11px] text-muted-foreground">All payments tracked with reference</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] font-medium transition-colors",
              statusFilter === "all" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
            )}
          >
            All ({payments.length})
          </button>
          <button
            onClick={() => setStatusFilter("pending_verification")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] font-medium transition-colors",
              statusFilter === "pending_verification" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
            )}
          >
            Pending ({payments.filter(p => p.status === "pending_verification").length})
          </button>
          <button
            onClick={() => setStatusFilter("verified")}
            className={cn(
              "px-3 py-1.5 rounded-[6px] font-medium transition-colors",
              statusFilter === "verified" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
            )}
          >
            Verified ({payments.filter(p => p.status === "verified").length})
          </button>
        </div>

        <div className="w-full sm:w-64 relative">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search payer or reference..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Payments Table */}
      <div className="rounded-[6px] border border-border bg-card overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Payer Name</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Reference / Session ID</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/20">
                  <td className="py-2.5 px-3 text-muted-foreground font-mono">
                    {formatDate(p.transferDate)}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-foreground">
                    {p.payerName}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-foreground">
                    {formatNaira(p.amount)}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-muted-foreground text-[11px]">
                    {p.transferReference}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={cn(
                      "px-2 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase border",
                      p.status === "verified" && "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
                      p.status === "pending_verification" && "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800",
                      p.status === "rejected" && "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-800"
                    )}>
                      {p.status === "pending_verification" ? "Pending" : p.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    {p.status === "pending_verification" ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleVerify(p.id)}
                          className="px-2.5 py-1 rounded-[6px] bg-primary text-primary-foreground font-medium text-xs hover:bg-primary/90 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(p.id)}
                          className="px-2.5 py-1 rounded-[6px] border border-border text-foreground hover:bg-muted font-medium text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">
                        {p.verifiedByName || "Audited"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
