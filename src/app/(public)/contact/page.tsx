"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, Video } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"enquiry" | "volunteer" | "protest">("enquiry");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="container py-12 md:py-16 max-w-4xl space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Contact & Operations Support
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Reach the Winners Sports Competition Organizing Committee, sign up as a volunteer media operator, or review formal match protest procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-5 rounded-2xl border border-white/10 bg-card/60 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>Headquarters</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SDU Main Sports Complex Pavilion<br />
              Southern Delta University<br />
              Ozoro, Delta State
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-card/60 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <Mail className="w-4 h-4 text-brand-gold" />
              <span>Official Email</span>
            </div>
            <p className="text-xs font-mono text-white">
              {siteConfig.officialEmail}
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-card/60 space-y-3">
            <div className="flex items-center gap-2.5 text-white font-bold text-sm">
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Phone / WhatsApp</span>
            </div>
            <p className="text-xs font-mono text-white">
              {siteConfig.officialPhone}
            </p>
          </div>

          {/* Protest Reminder Card */}
          <div className="p-5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4" />
              <span>Match Protests</span>
            </div>
            <p className="text-muted-foreground leading-relaxed text-[11px]">
              Must be submitted in writing by the team captain to the Match Coordinator within <strong>30 minutes</strong> after full time.
            </p>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-3xl border border-white/10 bg-card/60 space-y-6">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-brand-emerald flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg">Message Dispatched!</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto">
                Thank you for contacting the WSC Organizing Committee. A committee officer will review your submission promptly.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold text-brand-gold hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h3 className="font-extrabold text-white text-base">Send Committee Message / Volunteer Application</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-white">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-white">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.sdu.edu.ng"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white">Inquiry Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
                >
                  <option value="enquiry">General Tournament Enquiry</option>
                  <option value="volunteer">Volunteer Media / Phone Camera Operator</option>
                  <option value="protest">Official Match Protest Submission</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-white">Message Details *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your request or volunteer interest..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-brand-gold text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:bg-amber-400 active:scale-[0.96] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Committee</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
