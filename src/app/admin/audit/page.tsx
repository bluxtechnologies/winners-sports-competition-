"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { AuditLog } from "@/types";
import { ShieldAlert, Search, Filter, Clock } from "lucide-react";
import { formatDateTime } from "@/lib/utils";

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>(store.getAuditLogs());
  const [search, setSearch] = useState("");

  const filtered = logs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.adminName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            System Activity Audit Trail
          </h1>
          <p className="text-xs text-muted-foreground">
            Complete cryptographic audit trail of all administrative operations, payment approvals, score submissions, and card penalties
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action or details..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-brand-gold"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="border border-white/10 rounded-2xl overflow-hidden bg-card/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-muted-foreground uppercase font-bold text-[10px]">
              <tr>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Entity</th>
                <th className="p-3.5">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3.5 font-mono text-muted-foreground whitespace-nowrap text-[11px]">
                    {formatDateTime(log.createdAt)}
                  </td>
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    {log.adminName}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-brand-gold whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="p-3.5 uppercase text-[10px] text-muted-foreground whitespace-nowrap">
                    {log.entityType} ({log.entityId.slice(0, 10)})
                  </td>
                  <td className="p-3.5 text-white/90 leading-relaxed max-w-md">
                    {log.details}
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
