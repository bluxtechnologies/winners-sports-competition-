"use client";

import { useState } from "react";
import { Video, Image as ImageIcon, Instagram, Sparkles, Filter } from "lucide-react";
import { store } from "@/services/store";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "football" | "marathon" | "video">("all");
  const media = store.getMedia();

  const filteredMedia = media.filter((item) => {
    if (filter === "football") return item.eventId === "e-football-001";
    if (filter === "marathon") return item.eventId === "e-marathon-002";
    if (filter === "video") return item.mediaType === "video" || item.mediaType === "highlight";
    return true;
  });

  return (
    <div className="container py-12 md:py-16 space-y-10">
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Volunteer Media Hub</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Photos, Videos & Highlights
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Sideline phone recordings, matchday atmospheres, goals, and runner highlights captured by student volunteers for Southern Delta University, Ozoro. Official channels on Instagram and TikTok.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
            filter === "all" ? "bg-brand-gold text-black shadow-md shadow-amber-500/20" : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          All Media ({media.length})
        </button>
        <button
          onClick={() => setFilter("football")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
            filter === "football" ? "bg-brand-gold text-black shadow-md shadow-amber-500/20" : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          Football (WFC)
        </button>
        <button
          onClick={() => setFilter("marathon")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
            filter === "marathon" ? "bg-brand-emerald text-white shadow-md shadow-emerald-500/20" : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          Marathon (WMC)
        </button>
        <button
          onClick={() => setFilter("video")}
          className={cn(
            "px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5",
            filter === "video" ? "bg-purple-600 text-white shadow-md shadow-purple-500/20" : "bg-white/5 text-muted-foreground hover:text-white"
          )}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Video Reels & Clips</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="athletic-card rounded-2xl overflow-hidden group border border-white/10 bg-card/60 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur">
                    {item.platform}
                  </span>
                  {item.mediaType === "video" && (
                    <span className="p-1 rounded bg-purple-600 text-white">
                      <Video className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-bold text-sm text-white group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0 text-[11px] text-muted-foreground flex items-center justify-between border-t border-white/5">
              <span>{item.mediaType.toUpperCase()}</span>
              {item.embedCode && (
                <a
                  href={item.embedCode}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-gold hover:underline font-bold"
                >
                  Watch Reel →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
