import React, { useState } from "react";
import { Check, KeyRound } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { changePassword } from "../../api/userApi";
import { getApiError } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useAdmin } from "../../context/AdminContext";

export default function SecuritySettings() {
  const { logout } = useAuth();
  const { notify } = useAdmin();
  const [form, setForm] = useState({ old_password: "", new_password: "", confirm: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (form.new_password.length < 6) return setError("New password must be at least 6 characters.");
    if (form.confirm !== form.new_password) return setError("Passwords do not match.");
    setBusy(true);
    setError("");
    try {
      await changePassword({ old_password: form.old_password, new_password: form.new_password });
      setDone(true);
      notify.success("Password changed. Please sign in again.");
      setTimeout(logout, 1200);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
          <Check className="w-6 h-6" />
        </div>
        <p className="font-bold text-ink-800">Password updated</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-4">
        <KeyRound className="w-4 h-4 text-primary-600" /> Security
      </h3>
      {error && <div className="mb-3"><ErrorMessage message={error} /></div>}
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <Input label="Current password" type="password" value={form.old_password} onChange={(e) => setForm((p) => ({ ...p, old_password: e.target.value }))} />
        <Input label="New password" type="password" value={form.new_password} onChange={(e) => setForm((p) => ({ ...p, new_password: e.target.value }))} />
        <Input label="Confirm new password" type="password" value={form.confirm} onChange={(e) => setForm((p) => ({ ...p, confirm: e.target.value }))} />
        <Button type="submit" loading={busy}>Update password</Button>
      </form>
    </div>
  );
}
