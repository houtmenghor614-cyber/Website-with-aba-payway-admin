import { getDashboard, getAdminOrders, getAdminPayments, getAdminUsers } from "./adminApi";
import { getProducts } from "./productApi";

export async function getSalesReport() {
  return getDashboard();
}

export async function getOrdersReport(params = {}) {
  const { items, total } = await getAdminOrders({ page_size: 100, ...params });
  return { items, total };
}

export async function getCustomersReport(params = {}) {
  const { items, total } = await getAdminUsers({ page_size: 100, ...params });
  return { items, total };
}

export async function getPaymentsReport() {
  const { items } = await getAdminPayments({ limit: 500 });
  return items;
}

export async function getTopProducts(limit = 20) {
  const { items } = await getProducts({
    page_size: Math.min(limit, 100),
    sort: "-sold",
  });
  return items || [];
}

export async function getLowStockProducts() {
  const { items } = await getProducts({
    page_size: 100,
    sort: "-created_at",
  });
  return (items || []).filter((p) => Number(p.stock) <= Number(p.low_stock_threshold || 0));
}
