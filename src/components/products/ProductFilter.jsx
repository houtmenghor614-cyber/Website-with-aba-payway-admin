import React from "react";
import Button from "../common/Button";
import Select from "../common/Select";

export default function ProductFilter({ categories = [], value = {}, onApply }) {
  const [local, setLocal] = React.useState(value);

  const set = (key, val) => setLocal((prev) => ({ ...prev, [key]: val }));

  const apply = (e) => {
    e.preventDefault();
    onApply({
      category_id: local.category_id || undefined,
      sort: local.sort || "-created_at",
      stock_only: local.stock_only,
    });
  };

  return (
    <form onSubmit={apply} className="flex flex-wrap items-end gap-3">
      <div className="w-48">
        <Select
          label="Category"
          placeholder="All categories"
          value={local.category_id || ""}
          onChange={(e) => set("category_id", e.target.value)}
          options={(categories || []).map((c) => ({ value: String(c.id), label: c.name }))}
        />
      </div>
      <div className="w-44">
        <Select
          label="Sort"
          value={local.sort || "-created_at"}
          onChange={(e) => set("sort", e.target.value)}
          options={[
            { value: "-created_at", label: "Newest" },
            { value: "-sold", label: "Best sellers" },
            { value: "-price", label: "Price: high to low" },
            { value: "price", label: "Price: low to high" },
            { value: "name", label: "Name A-Z" },
          ]}
        />
      </div>
      <label className="flex items-center gap-2 text-xs font-bold text-ink-600 pb-2.5">
        <input type="checkbox" checked={Boolean(local.stock_only)} onChange={(e) => set("stock_only", e.target.checked)} className="accent-primary-600" />
        Low stock only
      </label>
      <Button type="submit" size="sm">Apply</Button>
    </form>
  );
}
