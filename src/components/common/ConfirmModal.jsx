import React from "react";
import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "danger",
  loading = false,
  onConfirm,
  onClose,
}) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
            tone === "danger" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
          }`}
        >
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h3 className="font-display font-bold text-lg text-ink-900">{title}</h3>
        {message && <p className="text-sm text-ink-500 mt-1.5">{message}</p>}
        <div className="flex gap-3 mt-6 w-full">
          <Button variant="outline" full onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === "danger" ? "danger" : "primary"}
            full
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
