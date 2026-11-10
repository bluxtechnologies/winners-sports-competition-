"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { AuditLog } from "@/types";
import { Search } from "lucide-react";
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            System Activity Audit Trail
          </h1>
          <p className="text-xs text-muted-foreground">
            Audit trail of administrative operations, payment approvals, score submissions, and card penalties
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search action or details..."
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="rounded-[6px] border border-border bg-card overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-muted-foreground font-medium">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Administrator</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Entity</th>
                <th className="py-2.5 px-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-muted/20">
                  <td className="py-2.5 px-3 font-mono text-muted-foreground whitespace-nowrap text-[11px]">
                    {formatDateTime(log.createdAt)}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">
                    {log.adminName}
                  </td>
                  <td className="py-2.5 px-3 font-mono font-medium text-primary whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 uppercase text-[10px] text-muted-foreground whitespace-nowrap">
                    {log.entityType} ({log.entityId.slice(0, 10)})
                  </td>
                  <td className="py-2.5 px-3 text-muted-foreground max-w-md">
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
