import api from "./axios";

/** Products carrying stock info (admin list). */
export async function getStockProducts(params = {}) {
  const { data } = await api.get("/products", {
    params: { include_inactive: true, page_size: 100, ...params },
  });
  return data;
}

/** Movements for a product (or all with product_id filter). */
export async function getStockMovements(params = {}) {
  const { data } = await api.get("/admin/stock-movements", { params });
  return data;
}

/** Adjust a product's stock level. */
export async function adjustStock(productId, quantity, note = "", movementType = "adjust") {
  const { data } = await api.post(`/admin/stock/products/${productId}/adjust`, {
    quantity,
    note,
    movement_type: movementType,
  });
  return data;
}
