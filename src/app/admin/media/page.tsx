"use client";

import { useState } from "react";
import { store } from "@/services/store";
import { MediaAsset } from "@/types";
import { Image as ImageIcon, Video, Plus, CheckCircle2, Instagram, Trash2 } from "lucide-react";

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
    setNotification("New media asset published!");
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Media Assets & Volunteer Social Hub
        </h1>
        <p className="text-xs text-muted-foreground">
          Document 09 — Manage matchday photography, highlight reels, Instagram & TikTok student volunteer coverage
        </p>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
          <span>{notification}</span>
        </div>
      )}

      {/* Upload / Link Form */}
      <form onSubmit={handleAddMedia} className="p-6 rounded-3xl border border-white/10 bg-card/60 space-y-4 text-xs">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-brand-gold" />
          <span>Add Match Highlight or Photo</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-white">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Round of 16 Long-Distance Spot Kick Highlight"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-white">Platform</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white"
            >
              <option value="instagram">Instagram Reel</option>
              <option value="tiktok">TikTok Video</option>
              <option value="local">Direct Sideline Upload</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="font-bold text-white">Image or Video URL / Source Link *</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-white">Media Type</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-black border border-white/10 text-white"
            >
              <option value="highlight">Goal / Key Highlight</option>
              <option value="video">Full Matchday Video</option>
              <option value="photo">Match Photo</option>
            </select>
          </div>

          <div className="space-y-1 sm:col-span-3">
            <label className="font-bold text-white">Caption / Match Description</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Brief description of the play or celebration..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-brand-gold"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded text-brand-gold focus:ring-brand-gold"
            />
            <span className="text-white font-semibold">Feature on Homepage</span>
          </label>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-brand-gold text-black font-extrabold hover:bg-amber-400 active:scale-[0.96] transition-all"
          >
            Publish Asset
          </button>
        </div>
      </form>

      {/* Media Wall */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {media.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-white/10 bg-card/60 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white">
                  {item.platform}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-sm text-white line-clamp-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{item.caption}</p>
              </div>
            </div>
            <div className="p-4 pt-0 text-[11px] text-muted-foreground flex items-center justify-between border-t border-white/5">
              <span>{item.mediaType}</span>
              {item.isFeatured && (
                <span className="text-[10px] font-bold text-brand-gold bg-amber-500/10 px-2 py-0.5 rounded border border-brand-gold/30">
                  Featured
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
