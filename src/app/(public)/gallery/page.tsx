"use client";

import { useState } from "react";
import { Video, Image as ImageIcon } from "lucide-react";
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
    <div className="container max-w-5xl py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] border border-border bg-muted text-foreground text-xs font-medium">
          <ImageIcon className="w-3.5 h-3.5 text-primary" />
          <span>Tournament Media Gallery</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
          Photos, Videos & Highlights
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Sideline recordings, matchday photographs, goals, and runner highlights captured by student volunteers for Southern Delta University, Ozoro.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors",
            filter === "all" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
          )}
        >
          All Media ({media.length})
        </button>
        <button
          onClick={() => setFilter("football")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors",
            filter === "football" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
          )}
        >
          Football (WFC)
        </button>
        <button
          onClick={() => setFilter("marathon")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors",
            filter === "marathon" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
          )}
        >
          Marathon (WMC)
        </button>
        <button
          onClick={() => setFilter("video")}
          className={cn(
            "px-3 py-1.5 rounded-[6px] text-xs font-medium transition-colors flex items-center gap-1.5",
            filter === "video" ? "bg-primary text-primary-foreground font-semibold" : "border border-border text-foreground hover:bg-muted"
          )}
        >
          <Video className="w-3.5 h-3.5" />
          <span>Videos & Reels</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMedia.map((item) => (
          <div
            key={item.id}
            className="rounded-[6px] overflow-hidden border border-border bg-card shadow-subtle flex flex-col justify-between text-xs"
          >
            <div>
              <div className="aspect-video relative overflow-hidden bg-muted border-b border-border">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 rounded-[4px] text-[10px] font-semibold uppercase tracking-wider bg-background/90 text-foreground border border-border">
                    {item.platform}
                  </span>
                  {item.mediaType === "video" && (
                    <span className="p-1 rounded-[4px] bg-primary text-primary-foreground">
                      <Video className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3.5 space-y-1">
                <h4 className="font-semibold text-foreground text-xs line-clamp-1">
                  {item.title}
                </h4>
                {item.caption && (
                  <p className="text-[11px] text-muted-foreground line-clamp-2">
                    {item.caption}
                  </p>
                )}
              </div>
            </div>

            <div className="px-3.5 pb-3 pt-1 text-[10px] text-muted-foreground border-t border-border/50">
              {item.isFeatured ? "Featured Highlight" : "Community Submission"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
