import api from "./axios";

export async function getPayments(params = {}) {
  const { data } = await api.get("/admin/payments", { params });
  return data;
}

export async function getPayment(paymentId) {
  const { data } = await api.get(`/admin/payments/${paymentId}`);
  return data;
}

export async function syncPayment(paymentId) {
  const { data } = await api.post(`/admin/payments/${paymentId}/sync`);
  return data;
}

export async function manualCheck(transactionId) {
  const { data } = await api.post("/payments/manual-check", {
    transaction_id: transactionId,
  });
  return data;
}
