"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Trophy, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Sparkles 
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@sdu.edu.ng");
  const [password, setPassword] = useState("••••••••");

  const handleRoleSelect = (roleName: string) => {
    // In production this sets Supabase auth session; for local prototype it navigates immediately
    router.push("/admin/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black via-slate-950 to-background">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold text-black shadow-xl shadow-amber-500/20 mx-auto">
            <Trophy className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            WSC Committee Portal
          </h1>
          <p className="text-xs text-muted-foreground">
            Southern Delta University, Ozoro • Tournament Administration
          </p>
        </div>

        {/* 1-Click Fast Role Selector for Demo & Development */}
        <div className="p-5 rounded-2xl border border-brand-gold/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-brand-gold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast Role Simulator (1-Click Login)</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleRoleSelect("super_admin")}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-gold hover:text-black font-semibold text-left transition-colors"
            >
              👑 Super Admin
            </button>
            <button
              onClick={() => handleRoleSelect("finance_manager")}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-gold hover:text-black font-semibold text-left transition-colors"
            >
              💰 Finance Officer
            </button>
            <button
              onClick={() => handleRoleSelect("football_manager")}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-gold hover:text-black font-semibold text-left transition-colors"
            >
              ⚽ Football Manager
            </button>
            <button
              onClick={() => handleRoleSelect("marathon_manager")}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-brand-gold hover:text-black font-semibold text-left transition-colors"
            >
              🏃 Marathon Manager
            </button>
          </div>
        </div>

        {/* Traditional Credentials Form */}
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-white flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 hover:from-amber-400 hover:to-amber-600 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-[0.96] transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

        <div className="text-center text-xs">
          <Link href="/" className="text-muted-foreground hover:text-white transition-colors">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
