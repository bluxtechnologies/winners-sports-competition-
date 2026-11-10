"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Trophy, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sdu.edu.ng");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSelect = (roleName: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("wsc_admin_auth", "true");
      sessionStorage.setItem("wsc_admin_role", roleName);
    }
    router.push("/admin/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("wsc_admin_auth", "true");
      sessionStorage.setItem("wsc_admin_role", "super_admin");
    }
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] bg-primary text-primary-foreground font-bold mx-auto">
            <Trophy className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            WSC Administration Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Southern Delta University, Ozoro • Official Management Console
          </p>
        </div>

        {/* 1-Click Fast Role Simulator */}
        <div className="p-4 rounded-[6px] border border-border bg-card space-y-2.5 shadow-subtle">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Authorized Committee Access
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleRoleSelect("super_admin")}
              className="p-2 rounded-[6px] border border-border hover:bg-muted text-foreground font-medium text-left transition-colors"
            >
              Super Admin
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("finance_manager")}
              className="p-2 rounded-[6px] border border-border hover:bg-muted text-foreground font-medium text-left transition-colors"
            >
              Finance Officer
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("football_manager")}
              className="p-2 rounded-[6px] border border-border hover:bg-muted text-foreground font-medium text-left transition-colors"
            >
              Football Manager
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("marathon_manager")}
              className="p-2 rounded-[6px] border border-border hover:bg-muted text-foreground font-medium text-left transition-colors"
            >
              Marathon Manager
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="p-5 rounded-[6px] border border-border bg-card space-y-3.5 text-xs shadow-subtle">
          <div className="space-y-1">
            <label className="font-medium text-foreground block">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-foreground block">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sign In to Console</span>
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
