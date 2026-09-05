import React, { useId } from "react";

export default function Input({
  label,
  error,
  hint,
  icon: Icon,
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
      <div className="relative">
        {Icon && (
          <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
        )}
        <input
          id={id}
          className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition placeholder:text-ink-300 focus:ring-4 ${
            Icon ? "pl-9" : ""
          } ${
            error
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
              : "border-ink-200 focus:border-primary-500 focus:ring-primary-100"
          } ${className}`}
          {...rest}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-400">{hint}</p>
      ) : null}
    </div>
  );
}
