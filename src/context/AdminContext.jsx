import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

export const AdminContext = createContext(null);

let idCounter = 0;

export function AdminProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (type, message, title = "") => {
      const id = ++idCounter;
      setToasts((list) => [...list, { id, type, message, title }]);
      timers.current[id] = setTimeout(() => dismiss(id), 4500);
      return id;
    },
    [dismiss]
  );

  const notify = useMemo(
    () => ({
      success: (message, title = "Success") => push("success", message, title),
      error: (message, title = "Error") => push("error", message, title),
      info: (message, title = "Notice") => push("info", message, title),
    }),
    [push]
  );

  const icons = {
    success: CheckCircle2,
    error: XCircle,
    info: Info,
  };
  const tones = {
    success: "text-emerald-600",
    error: "text-rose-600",
    info: "text-sky-600",
  };

  const toastArea = (
    <div className="fixed top-4 right-4 z-[100] space-y-2 w-80 max-w-[90vw]">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className="bg-white rounded-xl shadow-2xl border border-ink-100 px-4 py-3 flex items-start gap-3"
          >
            <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${tones[toast.type]}`} />
            <div className="flex-1 min-w-0">
              {toast.title && (
                <p className="text-sm font-bold text-ink-800">{toast.title}</p>
              )}
              <p className="text-xs text-ink-500 break-words">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss"
              className="text-ink-300 hover:text-ink-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );

  const value = useMemo(() => ({ notify, dismiss }), [notify, dismiss]);

  return (
    <AdminContext.Provider value={value}>
      {children}
      {toastArea}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
