import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { imageOrDefault } from "../../utils/constants";

export default function StockAdjustment({ product, open, onClose, onSubmit, busy = false }) {
  const [quantity, setQuantity] = useState("");
  const [movementType, setMovementType] = useState("adjust");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty === 0) {
      setError("Quantity must be a non-zero number.");
      return;
    }
    onSubmit(qty, movementType, note.trim());
  };

  return (
    <Modal open={open} onClose={onClose} title="Adjust stock" size="sm">
      {product && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl bg-ink-50 p-3">
            <img src={imageOrDefault(product.main_image)} alt="" className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <p className="font-bold text-ink-800 text-sm">{product.name}</p>
              <p className="text-xs text-ink-400">Current stock: {product.stock}</p>
            </div>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <Input label="Quantity change" type="number" value={quantity} onChange={(e) => { setQuantity(e.target.value); setError(""); }} placeholder="+10 or -5" hint="Use a positive number to add stock, negative to remove." />
            {error && <p className="text-sm text-rose-600">{error}</p>}
            <Select
              label="Movement type"
              value={movementType}
              onChange={(e) => setMovementType(e.target.value)}
              options={[
                { value: "adjust", label: "Adjustment" },
                { value: "in", label: "Stock in" },
                { value: "out", label: "Stock out" },
              ]}
            />
            <Input label="Note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Supplier restock..." />
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" loading={busy}>Apply</Button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}
