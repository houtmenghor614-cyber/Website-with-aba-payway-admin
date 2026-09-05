import api from "./axios";

/** Product list. include_inactive lets admins see archived/hidden rows. */
export async function getProducts(params = {}) {
  const { data } = await api.get("/products", {
    params: { include_inactive: true, ...params },
  });
  return data;
}

export async function getProduct(idOrSlug) {
  const { data } = await api.get(`/products/${idOrSlug}`);
  return data;
}

export async function createProduct(payload) {
  const { data } = await api.post("/products", payload);
  return data;
}

export async function updateProduct(productId, payload) {
  const { data } = await api.patch(`/products/${productId}`, payload);
  return data;
}

export async function deleteProduct(productId) {
  await api.delete(`/products/${productId}`);
  return true;
}
