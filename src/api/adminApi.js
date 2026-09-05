import api from "./axios";

/** Admin: dashboard summary. */
export async function getDashboard() {
  const { data } = await api.get("/admin/dashboard");
  return data; // { stats, sales_last_7_days }
}

/** Admin: paginated orders. */
export async function getAdminOrders(params = {}) {
  const { data } = await api.get("/admin/orders", { params });
  return data;
}

/** Admin: change order status. */
export async function updateOrderStatus(orderId, status, note = "") {
  const { data } = await api.patch(`/admin/orders/${orderId}/status`, {
    status,
    note,
  });
  return data;
}

/** Admin: payments list. */
export async function getAdminPayments(params = {}) {
  const { data } = await api.get("/admin/payments", { params });
  return data;
}

/** Admin: force a gateway sync for a payment. */
export async function syncPayment(paymentId) {
  const { data } = await api.post(`/admin/payments/${paymentId}/sync`);
  return data;
}

/** Admin: manual check by transaction id. */
export async function manualPaymentCheck(transactionId) {
  const { data } = await api.post("/payments/manual-check", {
    transaction_id: transactionId,
  });
  return data;
}

/** Admin: users list. */
export async function getAdminUsers(params = {}) {
  const { data } = await api.get("/admin/users", { params });
  return data;
}

/** Admin: toggle user active state. */
export async function toggleUserActive(userId) {
  const { data } = await api.post(`/admin/users/${userId}/toggle-active`);
  return data;
}

/** Admin: audit trail. */
export async function getAdminActivities(params = {}) {
  const { data } = await api.get("/admin/activities", { params });
  return data;
}
