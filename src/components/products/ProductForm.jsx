import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/categoryApi";
import Input from "../common/Input";
import Select from "../common/Select";
import Textarea from "../common/Textarea";
import Button from "../common/Button";
import ProductOptionsBuilder from "./ProductOptionsBuilder";
import { isRequired, isNumber } from "../../utils/validation";

const empty = {
  name: "",
  description: "",
  price: "",
  old_price: "",
  cost: "",
  sku: "",
  barcode: "",
  stock: 0,
  low_stock_threshold: 5,
  category_id: "",
  is_active: true,
  is_featured: false,
};

export default function ProductForm({ initial, onSubmit, loading = false }) {
  const [form, setForm] = useState({ ...empty, ...(initial || {}) });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState(
    Array.isArray(initial?.options) ? initial.options : []
  );

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const set = (field) => (e) => {
    const value =
      field === "is_active" || field === "is_featured"
        ? e.target.checked
        : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!isRequired(form.name)) next.name = "Product name is required.";
    if (!isNumber(form.price) || Number(form.price) < 0) next.price = "Enter a valid price.";
    if (!isNumber(form.stock) || Number(form.stock) < 0) next.stock = "Stock must be 0 or more.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({
      name: form.name.trim(),
      description: form.description || "",
      price: Number(form.price),
      old_price: form.old_price === "" ? null : Number(form.old_price),
      cost: form.cost === "" ? null : Number(form.cost),
      sku: form.sku || null,
      barcode: form.barcode || null,
      stock: Number(form.stock),
      low_stock_threshold: Number(form.low_stock_threshold || 0),
      category_id: form.category_id ? Number(form.category_id) : null,
      is_active: Boolean(form.is_active),
      is_featured: Boolean(form.is_featured),
      options: options
        .filter((g) => g.name && g.name.trim())
        .map((g) => ({
          name: g.name.trim(),
          values: (g.values || [])
            .filter((v) => v.value && String(v.value).trim())
            .map((v) => ({
              value: String(v.value).trim(),
              extra: Number(v.extra) || 0,
            })),
        })),
    });
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl border border-ink-100 p-5 space-y-4">
      <Input label="Product name" value={form.name} onChange={set("name")} error={errors.name} placeholder="Classic Cotton Tee" />
      <Textarea label="Description" rows={4} value={form.description} onChange={set("description")} placeholder="Fabric, fit, print..." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input label="Price (USD)" type="number" step="0.01" min="0" value={form.price} onChange={set("price")} error={errors.price} placeholder="9.90" />
        <Input label="Old price" type="number" step="0.01" min="0" value={form.old_price || ""} onChange={set("old_price")} placeholder="12.00" />
        <Input label="Cost price" type="number" step="0.01" min="0" value={form.cost || ""} onChange={set("cost")} placeholder="5.00" />
        <Select label="Category" placeholder="No category" value={form.category_id || ""} onChange={set("category_id")} options={(categories || []).map((c) => ({ value: String(c.id), label: c.name }))} />
        <Input label="SKU" value={form.sku || ""} onChange={set("sku")} placeholder="TEE-001" />
        <Input label="Barcode" value={form.barcode || ""} onChange={set("barcode")} placeholder="4801234567890" />
        <Input label="Stock" type="number" min="0" value={form.stock} onChange={set("stock")} error={errors.stock} />
        <Input label="Low stock threshold" type="number" min="0" value={form.low_stock_threshold} onChange={set("low_stock_threshold")} />
      </div>
      <div className="rounded-xl bg-ink-50/60 p-4 space-y-3">
        <ProductOptionsBuilder value={options} onChange={setOptions} />
      </div>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-700 cursor-pointer">
          <input type="checkbox" checked={Boolean(form.is_active)} onChange={set("is_active")} className="accent-primary-600 w-4 h-4" />
          Active
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink-700 cursor-pointer">
          <input type="checkbox" checked={Boolean(form.is_featured)} onChange={set("is_featured")} className="accent-primary-600 w-4 h-4" />
          Featured
        </label>
      </div>
      <div className="flex justify-end gap-3 pt-2">
        <Button type="submit" loading={loading}>
          {initial ? "Save changes" : "Create product"}
        </Button>
      </div>
    </form>
  );
}
