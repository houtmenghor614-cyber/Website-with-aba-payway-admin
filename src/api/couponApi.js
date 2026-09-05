import api from "./axios";

export async function getCoupons() {
  const { data } = await api.get("/coupons");
  return data;
}

export async function createCoupon(payload) {
  const { data } = await api.post("/coupons", payload);
  return data;
}

export async function updateCoupon(couponId, payload) {
  const { data } = await api.patch(`/coupons/${couponId}`, payload);
  return data;
}

export async function deleteCoupon(couponId) {
  await api.delete(`/coupons/${couponId}`);
  return true;
}

export async function validateCoupon(code, subtotal = 0) {
  const { data } = await api.get("/coupons/check", {
    params: { code, subtotal },
  });
  return data;
}
