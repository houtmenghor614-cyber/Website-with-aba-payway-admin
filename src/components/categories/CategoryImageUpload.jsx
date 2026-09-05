import React, { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import Button from "../common/Button";
import { uploadImage } from "../../api/uploadApi";
import { assetUrl } from "../../utils/constants";
import { useAdmin } from "../../context/AdminContext";

export default function CategoryImageUpload({ value, onChange }) {
  const { notify } = useAdmin();
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await uploadImage("category", file);
      onChange?.(res.path);
      notify.success("Image uploaded.");
    } catch {
      notify.error("Upload failed.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-3">
      {value ? (
        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-ink-200">
          <img src={assetUrl(value)} alt="Category" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onChange?.("")} aria-label="Remove image" className="absolute top-1 right-1 p-0.5 bg-white rounded text-rose-500 shadow">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-ink-200 flex items-center justify-center text-ink-300">
          <ImagePlus className="w-6 h-6" />
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={pick} />
      <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => ref.current?.click()}>
        {busy ? "Uploading..." : value ? "Change image" : "Upload image"}
      </Button>
    </div>
  );
}
