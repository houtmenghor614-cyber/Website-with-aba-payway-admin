import React, { useId } from "react";

export default function Select({
  label,
  options = [],
  error,
  placeholder = "Select...",
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
      <select
        id={id}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition focus:ring-4 ${
          error
            ? "border-rose-400 focus:ring-rose-100"
            : "border-ink-200 focus:border-primary-500 focus:ring-primary-100"
        } ${className}`}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => {
          const value = typeof option === "object" ? option.value : option;
          const labelText = typeof option === "object" ? option.label : option;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
}
