import React, { useEffect, useRef, useState } from "react";
import { FileText, Save, Upload, X } from "lucide-react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { assetUrl } from "../../utils/constants";
import { uploadImage } from "../../api/uploadApi";
import { getStoreAdminSettings, saveStoreSettings } from "../../api/settingApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function AboutContentEditor() {
  const { notify } = useAdmin();
  const [form, setForm] = useState({ about_title: "", about_body: "", about_image_path: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  useEffect(() => {
    getStoreAdminSettings()
      .then((d) => setForm({
        about_title: d.about_title || "",
        about_body: d.about_body || "",
        about_image_path: d.about_image_path || "",
      }))
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const upload = async (file) => {
    if (!file) return;
    try {
      const res = await uploadImage("settings", file);
      setForm((p) => ({ ...p, about_image_path: res.path }));
      notify.success("About image uploaded.");
    } catch (err) {
      notify.error(getApiError(err, "Upload failed."));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveStoreSettings({
        about_title: form.about_title.trim(),
        about_body: form.about_body,
        about_image_path: form.about_image_path || "",
      });
      notify.success("About page saved.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-400 py-8">Loading about content...</p>;

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink-100 bg-white p-5 space-y-4">
      <h3 className="flex items-center gap-2 font-bold text-ink-800">
        <FileText className="w-4 h-4 text-primary-600" /> About page content
      </h3>
      {error && <ErrorMessage message={error} />}
      <Input label="Page title" value={form.about_title} onChange={(e) => setForm((p) => ({ ...p, about_title: e.target.value }))} />
      <Textarea label="Story" rows={8} value={form.about_body} onChange={(e) => setForm((p) => ({ ...p, about_body: e.target.value }))} />
      <div>
        <p className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">About image</p>
        <div className="flex items-center gap-3">
          {form.about_image_path ? (
            <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-ink-200 bg-ink-50">
              <img src={assetUrl(form.about_image_path)} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => setForm((p) => ({ ...p, about_image_path: "" }))}
                className="absolute top-1 right-1 p-0.5 bg-white rounded text-rose-500 shadow" aria-label="Remove image">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="w-32 h-24 rounded-xl border border-dashed border-ink-200 flex items-center justify-center text-ink-300">
              <FileText className="w-6 h-6" />
            </span>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => upload(e.target.files?.[0])} />
          <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} icon={Upload}>
            {form.about_image_path ? "Change image" : "Upload image"}
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={saving} icon={Save}>Save about page</Button>
      </div>
    </form>
  );
}
