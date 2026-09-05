import React, { useState } from "react";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export default function CouponForm({ initial, onSubmit, loading = false }) {
  const [form, setForm] = useState({
    code: initial?.code || "",
    discount_type: initial?.discount_type || "percentage",
    discount_value: initial?.discount_value || "",
    min_order_amount: initial?.min_order_amount || 0,
    max_discount: initial?.max_discount || "",
    usage_limit: initial?.usage_limit || 0,
    expires_at: initial?.expires_at?.slice(0, 10) || "",
    is_active: initial ? Boolean(initial.is_active) : true,
  });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return setError("Code is required.");
    if (!Number(form.discount_value) || Number(form.discount_value) <= 0)
      return setError("Value must be greater than zero.");
    onSubmit({
      code: form.code.trim().toUpperCase(),
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_amount: Number(form.min_order_amount || 0),
      max_discount: form.max_discount === "" ? null : Number(form.max_discount),
      usage_limit: Number(form.usage_limit || 0),
      expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      is_active: Boolean(form.is_active),
    });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-ink-100 p-5 space-y-4">
      {error && <p className="text-sm text-rose-600">{error}</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Code" value={form.code} onChange={(e) => { setForm((p) => ({ ...p, code: e.target.value })); setError(""); }} placeholder="SUMMER20" />
        <Select label="Type" value={form.discount_type} onChange={(e) => setForm((p) => ({ ...p, discount_type: e.target.value }))} options={[{ value: "percentage", label: "Percentage (%)" }, { value: "fixed", label: "Fixed amount ($)" }]} />
        <Input label={form.discount_type === "percentage" ? "Percent off" : "Amount off"} type="number" step="0.01" min="0" value={form.discount_value} onChange={(e) => setForm((p) => ({ ...p, discount_value: e.target.value }))} />
        <Input label="Min order amount" type="number" step="0.01" min="0" value={form.min_order_amount} onChange={(e) => setForm((p) => ({ ...p, min_order_amount: e.target.value }))} />
        <Input label="Max discount (optional)" type="number" step="0.01" min="0" value={form.max_discount} onChange={(e) => setForm((p) => ({ ...p, max_discount: e.target.value }))} hint="Only for percentage coupons." />
        <Input label="Usage limit (0 = unlimited)" type="number" min="0" value={form.usage_limit} onChange={(e) => setForm((p) => ({ ...p, usage_limit: e.target.value }))} />
        <Input label="Expires on" type="date" value={form.expires_at} onChange={(e) => setForm((p) => ({ ...p, expires_at: e.target.value }))} />
        <label className="flex items-end gap-2 pb-2.5 text-sm font-bold text-ink-700">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="accent-primary-600 w-4 h-4" />
          Active
        </label>
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>{initial ? "Save changes" : "Create coupon"}</Button>
      </div>
    </form>
  );
}
