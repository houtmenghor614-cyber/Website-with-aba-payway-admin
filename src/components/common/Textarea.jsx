import React, { useId } from "react";

export default function Textarea({
  label,
  error,
  rows = 4,
  className = "",
  wrapperClass = "",
  ...rest
}) {
  const id = useId();
  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-ink-600 uppercase tracking-wide mb-1.5">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-ink-300 focus:ring-4 resize-y ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
            : "border-ink-200 focus:border-primary-500 focus:ring-primary-100"
        } ${className}`}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
