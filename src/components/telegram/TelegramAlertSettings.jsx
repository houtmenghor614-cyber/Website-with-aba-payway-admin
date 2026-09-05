import React from "react";
import { getStorage, setStorage } from "../../utils/storage";
import { useAdmin } from "../../context/AdminContext";

const EVENTS = [
  { key: "new_order", label: "New order placed", desc: "Sent when a customer checks out." },
  { key: "payment_success", label: "Payment confirmed", desc: "When auto-check/webhook confirms a payment." },
  { key: "payment_failed", label: "Payment failed", desc: "When the gateway reports a failure." },
  { key: "order_status", label: "Order status changes", desc: "When an admin updates an order." },
  { key: "low_stock", label: "Low stock alerts", desc: "When a product reaches its threshold." },
  { key: "new_user", label: "New registrations", desc: "When a new customer registers." },
];

export default function TelegramAlertSettings() {
  const { notify } = useAdmin();
  const [enabled, setEnabled] = React.useState(
    () => getStorage("telegram_alerts") || Object.fromEntries(EVENTS.map((e) => [e.key, true]))
  );

  const toggle = (key) => {
    const next = { ...enabled, [key]: !enabled[key] };
    setEnabled(next);
    setStorage("telegram_alerts", next);
    notify.success("Alert settings saved locally.");
  };

  return (
    <div className="rounded-2xl border border-ink-100 bg-white divide-y divide-ink-50">
      <div className="p-5">
        <h3 className="font-bold text-ink-800">Alert events</h3>
        <p className="text-xs text-ink-400 mt-1">Toggle which events notify your Telegram chat.</p>
      </div>
      {EVENTS.map((e) => (
        <label key={e.key} className="flex items-center justify-between gap-4 px-5 py-3 cursor-pointer">
          <span>
            <span className="block text-sm font-semibold text-ink-800">{e.label}</span>
            <span className="block text-xs text-ink-400">{e.desc}</span>
          </span>
          <input
            type="checkbox"
            checked={Boolean(enabled[e.key])}
            onChange={() => toggle(e.key)}
            className="accent-primary-600 w-5 h-5"
          />
        </label>
      ))}
    </div>
  );
}
