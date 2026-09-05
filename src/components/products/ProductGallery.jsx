import React from "react";
import { Star, Trash2 } from "lucide-react";
import { imageOrDefault } from "../../utils/constants";
import ConfirmModal from "../common/ConfirmModal";
import Button from "../common/Button";

export default function ProductGallery({ images = [], onSetMain, onDelete }) {
  const [toDelete, setToDelete] = React.useState(null);
  const [busy, setBusy] = React.useState(false);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {images.map((img) => (
          <div key={img.id} className="group relative rounded-xl overflow-hidden border border-ink-100 aspect-square">
            <img src={imageOrDefault(img.image_path)} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-ink-900/0 group-hover:bg-ink-900/50 transition flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              {!img.is_main && (
                <Button variant="ghost" size="xs" onClick={() => onSetMain?.(img.id)} aria-label="Set main" className="bg-white/20 text-white hover:bg-white/40">
                  <Star className="w-4 h-4" />
                </Button>
              )}
              <Button variant="ghost" size="xs" onClick={() => setToDelete(img)} aria-label="Delete" className="bg-white/20 text-white hover:bg-rose-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {img.is_main && (
              <span className="absolute top-1.5 left-1.5 bg-amber-400 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                <Star className="w-3 h-3" /> Main
              </span>
            )}
          </div>
        ))}
        {images.length === 0 && (
          <p className="col-span-full text-sm text-ink-400 py-8 text-center">No images yet.</p>
        )}
      </div>

      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete this image?"
        message="This cannot be undone."
        confirmLabel="Delete"
        loading={busy}
        onConfirm={() => {
          if (!toDelete) return;
          setBusy(true);
          Promise.resolve(onDelete?.(toDelete.id)).finally(() => {
            setBusy(false);
            setToDelete(null);
          });
        }}
      />
    </div>
  );
}
