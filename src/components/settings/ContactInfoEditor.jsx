import React, { useEffect, useState } from "react";
import { Phone, Save } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { getStoreAdminSettings, saveStoreSettings } from "../../api/settingApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function ContactInfoEditor() {
  const { notify } = useAdmin();
  const [form, setForm] = useState({
    contact_phone: "",
    contact_email: "",
    contact_address: "",
    contact_telegram: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getStoreAdminSettings()
      .then((d) => setForm({
        contact_phone: d.contact_phone || "",
        contact_email: d.contact_email || "",
        contact_address: d.contact_address || "",
        contact_telegram: d.contact_telegram || "",
      }))
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveStoreSettings({
        contact_phone: form.contact_phone.trim(),
        contact_email: form.contact_email.trim(),
        contact_address: form.contact_address.trim(),
        contact_telegram: form.contact_telegram.trim(),
      });
      notify.success("Contact page saved.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-ink-400 py-8">Loading contact info...</p>;

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink-100 bg-white p-5 space-y-4">
      <h3 className="flex items-center gap-2 font-bold text-ink-800">
        <Phone className="w-4 h-4 text-primary-600" /> Contact page information
      </h3>
      {error && <ErrorMessage message={error} />}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Phone" value={form.contact_phone} onChange={(e) => setForm((p) => ({ ...p, contact_phone: e.target.value }))} />
        <Input label="Email" type="email" value={form.contact_email} onChange={(e) => setForm((p) => ({ ...p, contact_email: e.target.value }))} />
        <div className="sm:col-span-2">
          <Input label="Address" value={form.contact_address} onChange={(e) => setForm((p) => ({ ...p, contact_address: e.target.value }))} />
        </div>
        <Input label="Telegram username (no @)" value={form.contact_telegram} onChange={(e) => setForm((p) => ({ ...p, contact_telegram: e.target.value.replace(/^@/, "") }))} />
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={saving} icon={Save}>Save contact page</Button>
      </div>
    </form>
  );
}
