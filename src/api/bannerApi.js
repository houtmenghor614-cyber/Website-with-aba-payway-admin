import api from "./axios";

export async function getBanners(params = {}) {
  const { data } = await api.get("/banners", { params });
  return data;
}

export async function createBanner(payload) {
  const { data } = await api.post("/banners", payload);
  return data;
}

export async function updateBanner(bannerId, payload) {
  const { data } = await api.patch(`/banners/${bannerId}`, payload);
  return data;
}

export async function deleteBanner(bannerId) {
  await api.delete(`/banners/${bannerId}`);
  return true;
}
