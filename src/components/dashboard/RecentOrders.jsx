import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Package } from "lucide-react";
import { getOrders } from "../../api/orderApi";
import OrderStatus from "../orders/OrderStatusBadge";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";

export default function RecentOrders({ limit = 6 }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders({ page: 1, page_size: limit })
      .then((d) => setOrders(d.items || []))
      .catch(() => setOrders([]));
  }, [limit]);

  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100">
        <p className="font-display font-bold text-ink-800 flex items-center gap-2">
          <Package className="w-4 h-4 text-primary-600" />
          Recent orders
        </p>
        <Link to="/admin/orders" className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-ink-50">
        {orders.length === 0 && <p className="px-5 py-8 text-center text-sm text-ink-400">No orders yet</p>}
        {orders.map((order) => (
          <Link key={order.id} to={`/admin/orders/${order.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-ink-50 transition">
            <span className="font-bold text-ink-800 text-sm truncate">#{order.order_number}</span>
            <span className="text-xs text-ink-400 ml-auto">{formatDate(order.created_at)}</span>
            <OrderStatus status={order.status} compact />
            <span className="text-sm font-extrabold text-ink-900 w-20 text-right">
              {formatCurrency(order.total)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
