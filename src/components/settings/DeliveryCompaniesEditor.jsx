import React, { useEffect, useRef, useState } from "react";
import { Save, Truck, Upload, X } from "lucide-react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { assetUrl } from "../../utils/constants";
import { uploadImage } from "../../api/uploadApi";
import { getStoreAdminSettings, saveStoreSettings } from "../../api/settingApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

const DEFAULTS = [
  { id: "grabexpress", name: "GrabExpress", price: 2, image_path: "", note: "Fastest option - 1 day inside Phnom Penh." },
  { id: "jt-express", name: "J&T Express", price: 2.5, image_path: "", note: "Nationwide courier - 2-3 days." },
  { id: "ninja-van", name: "Ninja Van", price: 3, image_path: "", note: "Standard nationwide delivery." },
];

export default function DeliveryCompaniesEditor() {
  const { notify } = useAdmin();
  const [companies, setCompanies] = useState(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRefs = useRef({});

  useEffect(() => {
    getStoreAdminSettings()
      .then((data) => {
        const list = Array.isArray(data.delivery_companies) && data.delivery_companies.length
          ? data.delivery_companies
          : DEFAULTS;
        setCompanies(list.map((c, i) => ({
          id: c.id || `carrier-${i}`,
          name: c.name || DEFAULTS[i]?.name || `Carrier ${i + 1}`,
          price: Number(c.price ?? DEFAULTS[i]?.price ?? 0),
          image_path: c.image_path || "",
          note: c.note || "",
        })));
      })
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const setField = (index, key, value) =>
    setCompanies((prev) => prev.map((c, i) => (i === index ? { ...c, [key]: value } : c)));

  const onUpload = async (index, file) => {
    if (!file) return;
    try {
      const res = await uploadImage("settings", file);
      setField(index, "image_path", res.path);
      notify.success("Carrier image uploaded.");
    } catch (err) {
      notify.error(getApiError(err, "Upload failed."));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = companies.map((c) => ({
        id: c.id,
        name: c.name.trim() || "Carrier",
        price: Number(c.price || 0),
        image_path: c.image_path || "",
        note: c.note || "",
      }));
      const saved = await saveStoreSettings({ delivery_companies: payload });
      setCompanies(saved.delivery_companies || payload);
      notify.success("Delivery companies saved.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-400 py-8">Loading delivery companies...</p>;

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink-100 bg-white p-5 space-y-4">
      <h3 className="flex items-center gap-2 font-bold text-ink-800">
        <Truck className="w-4 h-4 text-primary-600" /> Delivery companies
      </h3>
      <p className="text-xs text-ink-400 -mt-2">
        Customers pick one of these at checkout. You control the name, price and image for each.
      </p>

      {error && <ErrorMessage message={error} />}

      <div className="space-y-4">
        {companies.map((company, index) => (
          <div key={company.id || index} className="rounded-xl border border-ink-100 p-4 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {company.image_path ? (
                <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-ink-200 bg-white">
                  <img src={assetUrl(company.image_path)} alt={company.name} className="w-full h-full object-contain" />
                  <button type="button" onClick={() => setField(index, "image_path", "")}
                    className="absolute top-0.5 right-0.5 p-0.5 bg-white rounded text-rose-500 shadow" aria-label="Remove image">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <span className="w-24 h-16 rounded-lg border border-dashed border-ink-200 flex items-center justify-center text-ink-300">
                  <Truck className="w-6 h-6" />
                </span>
              )}
              <div className="flex-1 min-w-[220px] grid sm:grid-cols-2 gap-3">
                <Input label="Company name" value={company.name}
                  onChange={(e) => setField(index, "name", e.target.value)} />
                <Input label="Delivery price (USD)" type="number" step="0.01" min="0"
                  value={company.price}
                  onChange={(e) => setField(index, "price", e.target.value)} />
                <div className="sm:col-span-2">
                  <Textarea label="Note (optional)" rows={1} value={company.note}
                    onChange={(e) => setField(index, "note", e.target.value)} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                ref={(el) => { fileRefs.current[index] = el; }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onUpload(index, e.target.files?.[0])}
              />
              <Button type="button" variant="outline" size="sm"
                onClick={() => fileRefs.current[index]?.click()} icon={Upload}>
                {company.image_path ? "Change image" : "Upload image"}
              </Button>
              <span className="text-xs text-ink-400">Shown on the storefront checkout.</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={saving} icon={Save}>Save companies</Button>
      </div>
    </form>
  );
}
