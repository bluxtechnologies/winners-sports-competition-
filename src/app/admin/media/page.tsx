"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { MediaAsset } from "@/types";
import { Image as ImageIcon, Video, Plus, CheckCircle2, Trash2 } from "lucide-react";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaAsset[]>(store.getMedia());
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState("");
  const [mediaType, setMediaType] = useState<MediaAsset["mediaType"]>("photo");
  const [platform, setPlatform] = useState<MediaAsset["platform"]>("instagram");
  const [isFeatured, setIsFeatured] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    const newMedia: MediaAsset = {
      id: `media-${Date.now()}`,
      eventId: "e-football-001",
      mediaType,
      title: title.trim(),
      caption: caption.trim() || undefined,
      url: url.trim(),
      platform,
      isFeatured,
      createdAt: new Date().toISOString(),
    };

    store.addMedia(newMedia);
    store.addAuditLog({
      adminUserId: "admin-media",
      adminName: "Media Coordinator",
      action: "ADD_MEDIA_ASSET",
      entityType: "media_asset",
      entityId: newMedia.id,
      details: `Added new ${mediaType} from ${platform}: "${title}"`,
    });

    setMedia([...store.getMedia()]);
    setTitle("");
    setCaption("");
    setUrl("");
    setNotification("New media asset published.");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-xl font-bold text-foreground">
          Media Assets & Student Coverage
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage matchday photography, video highlight reels, and social media coverage
        </p>
      </div>

      {notification && (
        <div className="p-3 rounded-[6px] border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Upload / Link Form */}
      <form onSubmit={handleAddMedia} className="p-5 rounded-[6px] border border-border bg-card space-y-4 text-xs shadow-subtle">
        <div className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-3.5 h-3.5 text-primary" />
          <span>Add Match Photo or Highlight Link</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-medium text-foreground block">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Round of 16 Deciding Penalty Kick Highlight"
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-foreground block">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground"
            >
              <option value="instagram">Instagram Reel</option>
              <option value="tiktok">TikTok Video</option>
              <option value="youtube">YouTube</option>
              <option value="local">Direct Sideline Upload</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-medium text-foreground block">Media URL / Embed Link *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium text-foreground block">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-[6px] border border-input bg-background text-foreground"
            >
              <option value="photo">Match Photo</option>
              <option value="video">Match Video</option>
              <option value="highlight">Highlight Clip</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-1.5 rounded-[6px] bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors"
          >
            Publish Media Asset
          </button>
        </div>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {media.map((item) => (
          <div key={item.id} className="rounded-[6px] border border-border bg-card overflow-hidden shadow-subtle text-xs">
            <div className="aspect-video bg-muted flex items-center justify-center relative border-b border-border">
              {item.url.startsWith("http") ? (
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground flex flex-col items-center gap-1">
                  <ImageIcon className="w-8 h-8" />
                  <span className="text-[10px] uppercase font-mono">{item.platform}</span>
                </div>
              )}
            </div>

            <div className="p-3.5 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-semibold text-primary">
                  {item.platform}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  {item.mediaType}
                </span>
              </div>
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
        ))}
      </div>
    </div>
  );
}
