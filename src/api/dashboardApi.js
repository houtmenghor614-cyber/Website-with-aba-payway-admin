import api from "./axios";

/** Lightweight wrapper used by dashboard widgets. */
export async function getDashboardStats() {
  const { data } = await api.get("/admin/dashboard");
  return data.stats;
}

export async function getSalesSeries() {
  const { data } = await api.get("/admin/dashboard");
  return data.sales_last_7_days || [];
}
