import React from "react";

export default function Spinner({ size = "md", light = false, className = "" }) {
  const dims = {
    xs: "w-3.5 h-3.5 border-2",
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-9 h-9 border-[3px]",
  };
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-current border-t-transparent ${light ? "text-white" : "text-primary-600"} ${dims[size] || dims.md} ${className}`}
    />
  );
}
