import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { pingTelegram } from "../../api/telegramApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function TelegramTestMessage() {
  const { notify } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const send = async () => {
    setBusy(true);
    setError("");
    try {
      const res = await pingTelegram();
      notify.success(res?.message || "Test message sent to admin chats.");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 space-y-3">
      <p className="font-bold text-ink-800 flex items-center gap-2">
        <MessageCircle className="w-4 h-4 text-primary-600" />
        Test message
      </p>
      <p className="text-sm text-ink-500">
        Send a test alert to the admin Telegram chat(s) configured on the
        backend (.env TELEGRAM_CHAT_ID).
      </p>
      {error && <ErrorMessage message={error} />}
      <Button onClick={send} loading={busy}>
        Send test message
      </Button>
    </div>
  );
}
