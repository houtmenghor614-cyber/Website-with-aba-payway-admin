import React from "react";
import { Eye } from "lucide-react";
import { assetUrl } from "../../utils/constants";

export default function BannerPreview({ banner }) {
  const src = banner?.image ? assetUrl(banner.image) : null;
  return (
    <div>
      <p className="flex items-center gap-1.5 text-xs font-bold text-ink-500 uppercase tracking-wide mb-2">
        <Eye className="w-3.5 h-3.5" /> Preview
      </p>
      <div className="relative rounded-2xl overflow-hidden border border-ink-100 bg-ink-900 text-white">
        {src ? (
          <img src={src} alt="Banner preview" className="w-full h-40 object-cover" />
        ) : (
          <div className="h-40 flex items-center justify-center text-xs text-ink-300">No image selected</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 to-transparent" />
        <div className="absolute inset-0 p-4 flex flex-col justify-center">
          <h3 className="font-display font-extrabold text-lg">{banner?.title || "Banner title"}</h3>
          {banner?.subtitle && <p className="text-sm text-white/80">{banner.subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
