import React from "react";
import PageHeader from "../../components/common/PageHeader";
import TelegramSettings from "../../components/telegram/TelegramSettings";

export default function Telegram() {
  return (
    <div>
      <PageHeader title="Telegram bot" subtitle="Monitor the bot and send test alerts" />
      <div className="max-w-3xl">
        <TelegramSettings />
      </div>
    </div>
  );
}
