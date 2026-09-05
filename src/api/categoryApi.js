import api from "./axios";

export async function getCategories() {
  const { data } = await api.get("/categories");
  return data;
}

export async function getCategory(id) {
  const { data } = await api.get(`/categories/${id}`);
  return data;
}

export async function getCategoryBySlug(slug) {
  const { data } = await api.get(`/categories/${slug}`);
  return data;
}

export async function createCategory(payload) {
  const { data } = await api.post("/categories", payload);
  return data;
}

export async function updateCategory(categoryId, payload) {
  const { data } = await api.patch(`/categories/${categoryId}`, payload);
  return data;
}

export async function deleteCategory(categoryId) {
  await api.delete(`/categories/${categoryId}`);
  return true;
}
