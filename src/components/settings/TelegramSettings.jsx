import React, { useEffect, useState } from "react";
import { Bot, CheckCircle2, XCircle } from "lucide-react";
import { getBotInfo } from "../../api/telegramApi";
import { getApiError } from "../../api/axios";
import Loader from "../common/Loader";

export default function TelegramSettingsPage() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getBotInfo()
      .then((d) => setInfo(d.bot || d))
      .catch((err) => setError(getApiError(err)));
  }, []);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <h3 className="font-bold text-ink-800 flex items-center gap-2 mb-4">
        <Bot className="w-4 h-4 text-primary-600" /> Telegram integration
      </h3>
      {error ? (
        <p className="flex items-center gap-2 text-sm text-rose-600"><XCircle className="w-4 h-4" />{error}</p>
      ) : !info ? (
        <Loader text="Checking bot..." />
      ) : (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> @{info.username || "bot"} is online
          </span>
        </div>
      )}
      <p className="mt-4 text-xs text-ink-400">
        Bot token and admin chat id are configured in backend/.env
        (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).
      </p>
    </div>
  );
}
