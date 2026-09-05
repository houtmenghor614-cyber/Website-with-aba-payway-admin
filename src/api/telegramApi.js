import api from "./axios";

export async function getBotInfo() {
  const { data } = await api.get("/telegram/bot-info");
  return data;
}

export async function pingTelegram() {
  const { data } = await api.post("/telegram/ping");
  return data;
}

export async function broadcastTelegram(payload) {
  const { data } = await api.post("/telegram/broadcast", payload);
  return data;
}
