import React from "react";
import TelegramStatus from "./TelegramStatus";
import TelegramTestMessage from "./TelegramTestMessage";
import TelegramAlertSettings from "./TelegramAlertSettings";

export default function TelegramSettings() {
  return (
    <div className="space-y-5">
      <TelegramStatus />
      <TelegramTestMessage />
      <TelegramAlertSettings />
    </div>
  );
}
