import api from "./axios";

export async function getReceipts(params = {}) {
  const { data } = await api.get("/admin/receipts", { params });
  return data;
}

export async function getReceipt(receiptId) {
  const { data } = await api.get(`/receipts/${receiptId}`);
  return data;
}
