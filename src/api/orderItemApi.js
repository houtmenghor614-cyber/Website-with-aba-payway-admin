import api from "./axios";

export async function getOrderItems(orderId) {
  const { data } = await api.get(`/order-items/order/${orderId}`);
  return data;
}

export async function getOrderItem(itemId) {
  const { data } = await api.get(`/order-items/order/${itemId}`);
  return data;
}
