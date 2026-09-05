import React, { useRef, useState } from "react";
import { ImagePlus, Loader2, Star } from "lucide-react";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { uploadProductImage } from "../../api/productImageApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function ProductImageUpload({ productId, onUploaded }) {
  const { notify } = useAdmin();
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [error, setError] = useState("");

  const pick = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      await uploadProductImage(productId, file, { isMain });
      notify.success("Image uploaded.");
      onUploaded?.();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {error && <ErrorMessage message={error} />}
      <label className="flex items-center gap-2 text-sm font-semibold text-ink-700 cursor-pointer">
        <input type="checkbox" checked={isMain} onChange={(e) => setIsMain(e.target.checked)} className="accent-primary-600" />
        Use as main image
      </label>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={pick} />
      <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={busy}>
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
        Choose image
      </Button>
      <p className="text-xs text-ink-400 flex items-center gap-1">
        <Star className="w-3 h-3" />
        JPG / PNG / WEBP up to 5 MB
      </p>
    </div>
  );
}
