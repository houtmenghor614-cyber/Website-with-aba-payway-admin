import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "lg",
  wide = false,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const key = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const width = wide ? "max-w-4xl" : { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" }[size] || "max-w-2xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
      />
      <div className={`relative w-full ${width} bg-white rounded-2xl shadow-2xl flex flex-col max-h-[92vh]`}>
        {(title || subtitle) && (
          <div className="flex items-start justify-between px-5 py-4 border-b border-ink-100">
            <div>
              {title && <h3 className="font-display font-bold text-lg text-ink-900">{title}</h3>}
              {subtitle && <p className="text-xs text-ink-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 -mr-1.5 rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        <div className="px-5 py-4 overflow-y-auto">{children}</div>
        {footer && <div className="px-5 py-4 border-t border-ink-100">{footer}</div>}
      </div>
    </div>
  );
}
