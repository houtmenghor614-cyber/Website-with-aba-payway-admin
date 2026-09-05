import api from "./axios";

export async function getOrder(orderId) {
  const { data } = await api.get(`/admin/orders/${orderId}`);
  return data;
}

export async function getOrders(params = {}) {
  const { data } = await api.get("/admin/orders", { params });
  return data;
}

export async function changeStatus(orderId, status, note = "") {
  const { data } = await api.patch(`/admin/orders/${orderId}/status`, {
    status,
    note,
  });
  return data;
}

export async function cancelOrder(orderId) {
  const { data } = await api.post(`/orders/${orderId}/cancel`);
  return data;
}
