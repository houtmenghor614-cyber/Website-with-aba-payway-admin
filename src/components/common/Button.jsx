import React from "react";
import Spinner from "./Spinner";

const sizes = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

const variants = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-pop",
  outline: "border border-ink-300 bg-white text-ink-700 hover:border-primary-400 hover:text-primary-700",
  ghost: "text-ink-600 hover:bg-ink-100",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
  success: "bg-emerald-600 text-white hover:bg-emerald-700",
  subtle: "bg-ink-900 text-white hover:bg-ink-800",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  full = false,
  disabled = false,
  className = "",
  ...rest
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-lg transition focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-200 disabled:opacity-60 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${full ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {loading ? (
        <Spinner size="xs" light={variant === "primary" || variant === "danger" || variant === "success" || variant === "subtle"} />
      ) : Icon ? (
        <Icon className="w-4 h-4" />
      ) : null}
      {children}
    </button>
  );
}
