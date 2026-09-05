import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as notificationApi from "../api/notificationApi";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { token, isAuthenticated } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setUnread(0);
      return;
    }
    setLoading(true);
    try {
      const [rows, count] = await Promise.all([
        notificationApi.getNotifications({ limit: 30 }),
        notificationApi.getUnreadCount(),
      ]);
      setNotifications(rows || []);
      setUnread(count || 0);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    load().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const markAllRead = useCallback(async () => {
    await notificationApi.markAllRead();
    await load();
  }, [load]);

  const markRead = useCallback(
    async (ids) => {
      await notificationApi.markRead(ids);
      await load();
    },
    [load]
  );

  const value = useMemo(
    () => ({ notifications, unread, loading, load, markRead, markAllRead }),
    [notifications, unread, loading, load, markRead, markAllRead]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
