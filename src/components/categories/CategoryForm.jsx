import React, { useState } from "react";
import Input from "../common/Input";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import CategoryImageUpload from "./CategoryImageUpload";

export default function CategoryForm({ initial, onSubmit, loading = false }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    description: initial?.description || "",
    image: initial?.image || "",
    sort_order: initial?.sort_order || 0,
    is_active: initial ? Boolean(initial.is_active) : true,
  });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    onSubmit({
      name: form.name.trim(),
      description: form.description || "",
      image: form.image || null,
      sort_order: Number(form.sort_order || 0),
      is_active: Boolean(form.is_active),
    });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-ink-100 p-5 space-y-4">
      <Input label="Name" value={form.name} onChange={(e) => { setForm((p) => ({ ...p, name: e.target.value })); setError(""); }} error={error} placeholder="Men T-Shirts" />
      <Textarea label="Description" rows={3} value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Sort order" type="number" value={form.sort_order} onChange={(e) => setForm((p) => ({ ...p, sort_order: e.target.value }))} />
        <label className="flex items-end gap-2 pb-2 text-sm font-bold text-ink-700">
          <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} className="accent-primary-600 w-4 h-4" />
          Active
        </label>
      </div>
      <CategoryImageUpload
        value={form.image}
        onChange={(path) => setForm((p) => ({ ...p, image: path }))}
      />
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>{initial ? "Save changes" : "Create category"}</Button>
      </div>
    </form>
  );
}
