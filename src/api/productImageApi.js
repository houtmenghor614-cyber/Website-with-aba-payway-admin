import api from "./axios";

/** Upload a product image (multipart). */
export async function uploadProductImage(productId, file, { isMain = false, altText = "", sortOrder = 0 }) {
  const form = new FormData();
  form.append("file", file);
  form.append("is_main", String(isMain));
  form.append("alt_text", altText);
  form.append("sort_order", String(sortOrder));
  const { data } = await api.post(`/products/${productId}/images`, form);
  return data;
}

export async function setProductMainImage(imageId) {
  const { data } = await api.put(`/product-images/${imageId}/main`);
  return data;
}

export async function deleteProductImage(imageId) {
  await api.delete(`/product-images/${imageId}`);
  return true;
}

export async function getProductImages(productId) {
  const { data } = await api.get(`/products/${productId}`);
  return data.images || [];
}
