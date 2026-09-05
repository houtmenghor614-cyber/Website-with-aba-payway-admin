import React from "react";

export default function PageHeader({
  title,
  subtitle,
  actions,
  children,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink-900">{title}</h1>
        {subtitle && <p className="text-sm text-ink-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      {children}
    </div>
  );
}
