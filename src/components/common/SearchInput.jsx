import React from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({ value = "", onChange, placeholder = "Search...", className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ink-200 bg-white pl-9 pr-8 py-2 text-sm outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
