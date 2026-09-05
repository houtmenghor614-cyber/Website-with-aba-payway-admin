import api from "./axios";

export async function getWishlist() {
  const { data } = await api.get("/wishlist");
  return data;
}

export async function toggleWishlist(productId) {
  const { data } = await api.post("/wishlist/toggle", { product_id: productId });
  return data;
}
