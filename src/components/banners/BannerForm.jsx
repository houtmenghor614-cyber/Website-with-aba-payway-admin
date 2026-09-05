import React, { useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import BannerPreview from "./BannerPreview";
import { uploadImage } from "../../api/uploadApi";
import { useAdmin } from "../../context/AdminContext";

export default function BannerForm({ initial, onSubmit, loading = false }) {
  const { notify } = useAdmin();
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title || "",
    subtitle: initial?.subtitle || "",
    image: initial?.image || "",
    link: initial?.link || "",
    position: initial?.position || "home",
    sort_order: initial?.sort_order || 0,
    is_active: initial ? Boolean(initial.is_active) : true,
  });
  const [error, setError] = useState("");

  const set = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: field === "is_active" ? e.target.checked : e.target.value }));

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await uploadImage("banner", file);
      setForm((p) => ({ ...p, image: res.path }));
      notify.success("Image uploaded.");
    } catch {
      notify.error("Upload failed.");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.image) return setError("Please upload a banner image.");
    onSubmit({
      title: form.title,
      subtitle: form.subtitle || null,
      image: form.image,
      link: form.link || null,
      position: form.position || "home",
      sort_order: Number(form.sort_order || 0),
      is_active: Boolean(form.is_active),
    });
  };

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-ink-100 p-5 space-y-4">
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <Input label="Title" value={form.title} onChange={set("title")} placeholder="Summer sale" />
        <Input label="Subtitle" value={form.subtitle} onChange={set("subtitle")} placeholder="Up to 20% off" />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Position" value={form.position} onChange={set("position")} placeholder="home" />
          <Input label="Sort order" type="number" value={form.sort_order} onChange={set("sort_order")} />
        </div>
        <Input label="Link (optional)" value={form.link || ""} onChange={set("link")} placeholder="/products" />
        <label className="flex items-center gap-2 text-sm font-bold text-ink-700">
          <input type="checkbox" checked={form.is_active} onChange={set("is_active")} className="accent-primary-600 w-4 h-4" />
          Active
        </label>
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} />
          <Button type="button" variant="outline" disabled={busy} onClick={() => fileRef.current?.click()} icon={ImagePlus}>
            {busy ? "Uploading..." : form.image ? "Change image" : "Upload image"}
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <BannerPreview banner={form} />
        <div className="flex justify-end">
          <Button type="submit" loading={loading}>{initial ? "Save changes" : "Create banner"}</Button>
        </div>
      </div>
    </form>
  );
}
