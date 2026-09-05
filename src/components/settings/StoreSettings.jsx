import React, { useEffect, useRef, useState } from "react";
import { ImagePlus, Save, Store, Truck, Upload, X } from "lucide-react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { assetUrl } from "../../utils/constants";
import { uploadImage } from "../../api/uploadApi";
import { getStoreAdminSettings, saveStoreSettings } from "../../api/settingApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

const EMPTY = {
  store_name: "T-Shirt Cambodia",
  logo_path: "",
  delivery_fee: "2.00",
  delivery_free_threshold: "30.00",
  delivery_image_path: "",
  delivery_note: "",
};

export default function StoreSettings() {
  const { notify } = useAdmin();
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const logoRef = useRef(null);
  const deliveryRef = useRef(null);

  useEffect(() => {
    getStoreAdminSettings()
      .then((data) =>
        setForm({
          store_name: data.store_name || EMPTY.store_name,
          logo_path: data.logo_path || "",
          delivery_fee: String(data.delivery_fee ?? EMPTY.delivery_fee),
          delivery_free_threshold: String(data.delivery_free_threshold ?? EMPTY.delivery_free_threshold),
          delivery_image_path: data.delivery_image_path || "",
          delivery_note: data.delivery_note || "",
        })
      )
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const uploadFor = async (field, folder, file) => {
    if (!file) return;
    try {
      const res = await uploadImage(folder, file);
      setForm((prev) => ({ ...prev, [field]: res.path }));
      notify.success("Image uploaded.");
    } catch (err) {
      notify.error(getApiError(err, "Upload failed."));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const saved = await saveStoreSettings({
        store_name: form.store_name.trim() || EMPTY.store_name,
        logo_path: form.logo_path || "",
        delivery_fee: Number(form.delivery_fee || 0),
        delivery_free_threshold: Number(form.delivery_free_threshold || 0),
        delivery_image_path: form.delivery_image_path || "",
        delivery_note: form.delivery_note || "",
      });
      setForm((prev) => ({
        ...prev,
        delivery_fee: String(saved.delivery_fee),
        delivery_free_threshold: String(saved.delivery_free_threshold),
      }));
      notify.success("Store settings saved. Refresh the storefront to see changes.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-400 py-8">Loading settings...</p>;

  const imageBox = (src, onClear) => (
    <div className="relative w-28 h-20 rounded-xl overflow-hidden border border-ink-200 bg-ink-50">
      <img src={assetUrl(src)} alt="" className="w-full h-full object-contain bg-white" />
      <button type="button" onClick={onClear} className="absolute top-1 right-1 p-0.5 bg-white rounded text-rose-500 shadow" aria-label="Remove image">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      {error && <ErrorMessage message={error} />}

      <section className="rounded-2xl border border-ink-100 bg-white p-5 space-y-4">
        <h3 className="flex items-center gap-2 font-bold text-ink-800">
          <Store className="w-4 h-4 text-primary-600" /> Store identity
        </h3>
        <div className="grid sm:grid-cols-2 gap-4 items-start">
          <Input label="Store name" value={form.store_name} onChange={(e) => setForm((p) => ({ ...p, store_name: e.target.value }))} />
          <div>
            <p className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">Storefront logo</p>
            <div className="flex items-center gap-3">
              {form.logo_path && imageBox(form.logo_path, () => setForm((p) => ({ ...p, logo_path: "" })))}
              <input ref={logoRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => uploadFor("logo_path", "settings", e.target.files?.[0])} />
              <Button type="button" variant="outline" size="sm" onClick={() => logoRef.current?.click()} icon={Upload}>
                {form.logo_path ? "Change logo" : "Upload logo"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-ink-100 bg-white p-5 space-y-4">
        <h3 className="flex items-center gap-2 font-bold text-ink-800">
          <Truck className="w-4 h-4 text-primary-600" /> Delivery settings
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Delivery fee (USD)" type="number" step="0.01" min="0" value={form.delivery_fee}
            onChange={(e) => setForm((p) => ({ ...p, delivery_fee: e.target.value }))} hint="Charged when the order is under the free-delivery threshold." />
          <Input label="Free delivery over (USD)" type="number" step="0.01" min="0" value={form.delivery_free_threshold}
            onChange={(e) => setForm((p) => ({ ...p, delivery_free_threshold: e.target.value }))} hint="Orders at or above this amount ship free." />
        </div>
        <Textarea label="Delivery note" rows={2} value={form.delivery_note}
          onChange={(e) => setForm((p) => ({ ...p, delivery_note: e.target.value }))} />
        <div>
          <p className="text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">Delivery image (storefront)</p>
          <div className="flex items-center gap-3">
            {form.delivery_image_path && imageBox(form.delivery_image_path, () => setForm((p) => ({ ...p, delivery_image_path: "" })))}
            <input ref={deliveryRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => uploadFor("delivery_image_path", "settings", e.target.files?.[0])} />
            <Button type="button" variant="outline" size="sm" onClick={() => deliveryRef.current?.click()} icon={ImagePlus}>
              {form.delivery_image_path ? "Change delivery image" : "Upload delivery image"}
            </Button>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Button type="submit" loading={saving} icon={Save}>Save settings</Button>
      </div>
    </form>
  );
}
