import React from "react";
import { Layers, Plus, Trash2, X } from "lucide-react";
import Button from "../common/Button";
import Input from "../common/Input";

const PRESETS = [
  { label: "Size", name: "Size", values: ["S", "M", "L", "XL", "XXL"] },
  { label: "Color", name: "Color", values: ["Black", "White", "Red", "Blue"] },
  { label: "RAM", name: "RAM", values: ["8GB", "16GB", "32GB"] },
  { label: "Storage", name: "Storage", values: ["256GB", "512GB", "1TB"] },
];

const empty = (name = "Option") => ({ name, values: [{ value: "", extra: 0 }] });

export default function ProductOptionsBuilder({ value = [], onChange }) {
  const options = Array.isArray(value) ? value : [];

  const set = (next) => onChange(next);

  const addGroup = (preset) => {
    const values = (preset ? preset.values : [""]).map((v, i) => ({
      value: typeof v === "string" ? v : v?.value || "",
      extra: typeof v === "string" ? 0 : Number(v?.extra) || 0,
    }));
    const names = options.map((g) => g.name);
    let name = preset ? preset.name : `Option ${options.length + 1}`;
    let counter = 2;
    while (names.includes(name)) {
      name = `${preset ? preset.name : "Option"} ${counter}`;
      counter += 1;
    }
    set([...options, { name, values: values.filter((x) => x.value || x.extra) }]);
  };

  const removeGroup = (index) => set(options.filter((_, i) => i !== index));

  const patchGroup = (index, next) =>
    set(options.map((g, i) => (i === index ? next : g)));

  const addValue = (index) =>
    patchGroup(index, { ...options[index], values: [...options[index].values, { value: "", extra: 0 }] });

  const patchValue = (gi, vi, field, val) => {
    const values = options[gi].values.map((v, i) => (i === vi ? { ...v, [field]: field === "extra" ? val : val } : v));
    patchGroup(gi, { ...options[gi], values });
  };

  const removeValue = (gi, vi) =>
    patchGroup(gi, { ...options[gi], values: options[gi].values.filter((_, i) => i !== vi) });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-primary-600" />
        <p className="text-xs font-bold text-ink-600 uppercase tracking-wide">
          Product options (size, color, RAM, storage...)
        </p>
      </div>
      <p className="text-xs text-ink-400 -mt-1">
        Customers choose these when buying. Optional price extra per value - for example
        512GB SSD = +$40. Leave empty for simple products.
      </p>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button key={p.name} type="button"
            onClick={() => addGroup(p)}
            className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-ink-200 text-ink-600 hover:border-primary-400 hover:text-primary-700">
            + {p.label}
          </button>
        ))}
        <button type="button" onClick={() => addGroup(null)}
          className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50">
          + Custom option
        </button>
      </div>

      {options.length === 0 && (
        <p className="text-sm text-ink-400 italic">No options yet - click a preset above or add a custom option.</p>
      )}

      {options.map((group, gi) => (
        <div key={gi} className="rounded-xl border border-ink-100 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-52">
              <Input label="Option name" value={group.name}
                onChange={(e) => patchGroup(gi, { ...group, name: e.target.value })} />
            </div>
            <button type="button" onClick={() => removeGroup(gi)}
              className="mt-5 p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg" aria-label="Remove option group">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {group.values.map((v, vi) => (
              <div key={vi} className="flex items-end gap-2">
                <Input placeholder="Value e.g. M"
                  value={v.value}
                  onChange={(e) => patchValue(gi, vi, "value", e.target.value)} />
                <Input type="number" step="0.01" min="0" placeholder="+$ extra"
                  value={v.extra}
                  onChange={(e) => patchValue(gi, vi, "extra", e.target.value)} />
                <button type="button" onClick={() => removeValue(gi, vi)}
                  className="mb-2 p-1.5 text-ink-400 hover:text-rose-500" aria-label="Remove value">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={() => addValue(gi)} icon={Plus}>
            Add value
          </Button>
        </div>
      ))}
    </div>
  );
}
