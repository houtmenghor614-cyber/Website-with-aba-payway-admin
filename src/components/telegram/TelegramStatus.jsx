import React, { useEffect, useState } from "react";
import { Bot, Send } from "lucide-react";
import { getBotInfo } from "../../api/telegramApi";
import { getApiError } from "../../api/axios";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";

export default function TelegramStatus() {
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getBotInfo()
      .then((d) => setInfo(d.bot || d))
      .catch((err) => setError(getApiError(err)));
  }, []);

  if (error) return <ErrorMessage message={error} />;
  if (!info) return <Loader text="Connecting to bot..." />;

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-white p-5">
      <span className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
        <Bot className="w-6 h-6" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-ink-800">
          @{info.username || "bot"} <span className="ml-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Online</span>
        </p>
        <p className="text-xs text-ink-400 mt-0.5">{info.first_name || "Telegram bot"}{info.id ? ` · id ${info.id}` : ""}</p>
      </div>
      <span className="hidden sm:flex items-center gap-1.5 text-xs text-ink-400">
        <Send className="w-3.5 h-3.5" />
        Alerts: orders, payments, stock
      </span>
    </div>
  );
}
