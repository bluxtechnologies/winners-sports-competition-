"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";
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
    <div className="container max-w-4xl py-12 space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span>Support & Enquiries</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Contact & Operations Support
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Reach the Winners Sports Competition Organizing Committee, sign up as a volunteer media operator, or review formal match protest procedures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Cards */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-4 rounded-[6px] border border-border bg-card space-y-2 shadow-subtle text-xs">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Headquarters</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              SDU Main Sports Complex Pavilion<br />
              Southern Delta University<br />
              Ozoro, Delta State
            </p>
          </div>

          <div className="p-4 rounded-[6px] border border-border bg-card space-y-2 shadow-subtle text-xs">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <span>Official Email</span>
            </div>
            <p className="font-mono text-muted-foreground break-all">
              {siteConfig.officialEmail}
            </p>
          </div>

          <div className="p-4 rounded-[6px] border border-border bg-card space-y-2 shadow-subtle text-xs">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>Phone / WhatsApp</span>
            </div>
            <p className="font-mono text-muted-foreground">
              {siteConfig.officialPhone}
            </p>
          </div>

          {/* Protest Reminder Card */}
          <div className="p-4 rounded-[6px] border border-amber-300 bg-amber-50/70 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Match Protests</span>
            </div>
            <p className="text-amber-800 leading-relaxed text-[11px]">
              Must be submitted in writing by the team captain to the Match Coordinator within <strong>30 minutes</strong> after full time.
            </p>
          </div>
        </div>

        {/* Interactive Form */}
        <div className="md:col-span-2 p-6 rounded-[6px] border border-border bg-card shadow-subtle space-y-5">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-[6px] bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground text-base">Message Dispatched</h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                Thank you for contacting the WSC Organizing Committee. A committee officer will review your submission promptly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormSubmitted(false);
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
                className="text-xs font-semibold text-primary hover:underline pt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <h3 className="font-semibold text-foreground text-sm">Send Committee Message / Volunteer Application</h3>
                <p className="text-muted-foreground text-xs pt-0.5">All inquiries are routed directly to the tournament secretariat.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-medium text-foreground">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 rounded-[6px] bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-medium text-foreground">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@student.sdu.edu.ng"
                    className="w-full px-3 py-2 rounded-[6px] bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">Inquiry Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-[6px] bg-background border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  <option value="enquiry">General Tournament Enquiry</option>
                  <option value="volunteer">Volunteer Media / Phone Camera Operator</option>
                  <option value="protest">Official Match Protest Submission</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-medium text-foreground">Message Details *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detail your request or volunteer interest..."
                  className="w-full px-3 py-2 rounded-[6px] bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
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
