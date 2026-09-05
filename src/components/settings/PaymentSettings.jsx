import React from "react";
import { CreditCard, QrCode, ShieldCheck } from "lucide-react";

const methods = [
  { icon: QrCode, name: "KHQR / ABA QR", desc: "Scan & pay via ABA Mobile or KHQR banks. Auto-checked by the backend." },
  { icon: CreditCard, name: "ABA PayWay", desc: "Hosted checkout page for cards and e-banking." },
  { icon: ShieldCheck, name: "Manual / COD", desc: "Mark orders paid manually when needed." },
];

export default function PaymentSettings() {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <h3 className="font-bold text-ink-800 mb-4">Payment methods</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {methods.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="rounded-xl border border-ink-100 p-4">
            <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </span>
            <p className="font-bold text-sm text-ink-800 mt-3">{name}</p>
            <p className="text-xs text-ink-500 mt-1 leading-5">{desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink-400">
        Gateway keys live in backend/.env (KHQRCC_PROFILE_ID, KHQRCC_API_KEY,
        ABA_*). Never expose them in the browser.
      </p>
    </div>
  );
}
