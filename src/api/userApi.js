import api from "./axios";

export async function getMe() {
  const { data } = await api.get("/users/me");
  return data;
}

export async function updateMe(payload) {
  const { data } = await api.patch("/users/me", payload);
  return data;
}

export async function changePassword(payload) {
  const { data } = await api.post("/users/me/change-password", payload);
  return data;
}

export async function linkTelegram(chatId) {
  const { data } = await api.post("/users/me/telegram-link", { chat_id: chatId });
  return data;
}
