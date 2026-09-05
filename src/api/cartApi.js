import api from "./axios";

// Customer cart endpoints (kept for completeness in admin context).
export async function getUserCart(userId) {
  const { data } = await api.get("/cart");
  return data;
}
