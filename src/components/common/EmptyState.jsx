import React from "react";
import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = Inbox,
  title = "No data",
  message = "There is nothing to show here yet.",
  action,
  compact = false,
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${compact ? "py-8" : "py-16"} px-4`}>
      <div className="w-16 h-16 rounded-2xl bg-ink-100 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-ink-400" />
      </div>
      <h3 className="font-bold text-ink-800">{title}</h3>
      <p className="text-sm text-ink-500 mt-1 max-w-sm">{message}</p>
      {action &&
        (action.onClick ? (
          <Button className="mt-5" onClick={action.onClick} icon={action.icon}>
            {action.label}
          </Button>
        ) : (
          <Button className="mt-5" onClick={() => {}} disabled>
            {action.label}
          </Button>
        ))}
    </div>
  );
}
