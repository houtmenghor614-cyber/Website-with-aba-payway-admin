import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ message = "Something went wrong.", onRetry, className = "" }) {
  if (!message) return null;
  return (
    <div className={`flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 ${className}`}>
      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-rose-700">{message}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 text-xs font-bold text-rose-700 underline underline-offset-2"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
