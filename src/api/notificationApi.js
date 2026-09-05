import api from "./axios";

export async function getNotifications(params = {}) {
  const { data } = await api.get("/notifications", { params });
  return data;
}

export async function getUnreadCount() {
  const { data } = await api.get("/notifications/unread-count");
  return data;
}

export async function markRead(ids) {
  const { data } = await api.post("/notifications/mark-read", { ids });
  return data;
}

export async function markAllRead() {
  const { data } = await api.post("/notifications/mark-all-read");
  return data;
}

/** Broadcast to all customers over Telegram + in-app notifications. */
export async function broadcastNotification(payload) {
  const { data } = await api.post("/telegram/broadcast", payload);
  return data;
}
