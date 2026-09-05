import React, { useState } from "react";
import { Check, Save, UserCog } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { updateMe } from "../../api/userApi";
import { getApiError } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useAdmin } from "../../context/AdminContext";

export default function ProfileSettings() {
  const { admin, updateAdmin } = useAuth();
  const { notify } = useAdmin();
  const [form, setForm] = useState({ full_name: admin?.full_name || "", phone: admin?.phone || "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const updated = await updateMe(form);
      updateAdmin(updated);
      setSaved(true);
      notify.success("Profile updated.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-4">
        <UserCog className="w-4 h-4 text-primary-600" /> Profile
      </h3>
      {error && <div className="mb-3"><ErrorMessage message={error} /></div>}
      {saved && (
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
          <Check className="w-4 h-4" /> Saved.
        </div>
      )}
      <form onSubmit={submit} className="space-y-4 max-w-lg">
        <Input label="Full name" value={form.full_name} onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))} />
        <Input label="Phone" value={form.phone || ""} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
        <Input label="Email (login)" value={admin?.email || ""} disabled hint="Email cannot be changed." />
        <Button type="submit" loading={busy} icon={Save}>Save profile</Button>
      </form>
    </div>
  );
}
