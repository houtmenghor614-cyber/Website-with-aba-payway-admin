import React from "react";
import { Link } from "react-router-dom";
import { Eye, Send } from "lucide-react";
import OrderStatusBadge from "./OrderStatusBadge";
import StatusBadge from "../common/StatusBadge";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import { initials, imageOrDefault } from "../../utils/constants";

export default function OrderTable({ orders = [], loading }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Delivery</th>
              <th>Placed</th>
              <th>Products bought</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={10} className="py-12 text-center text-ink-400">Loading orders...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={10} className="py-12 text-center text-ink-400">No orders found</td></tr>
            ) : (
              orders.map((order) => {
                const user = order.user || {};
                const address = order.address;
                return (
                  <tr key={order.id}>
                    <td><span className="font-bold text-ink-800">#{order.order_number}</span></td>
                    <td>
                      <div className="flex items-center gap-2.5 min-w-[180px]">
                        <span className="w-9 h-9 rounded-full bg-primary-50 text-primary-700 flex items-center justify-center text-xs font-extrabold shrink-0">
                          {initials(user.full_name || user.email)}
                        </span>
                        <div className="min-w-0">
                          <p className="font-bold text-ink-800 line-clamp-1">{user.full_name || "Customer"}</p>
                          <p className="text-xs text-ink-400 line-clamp-1">{user.email || `user #${order.user_id}`}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-ink-600">
                      {user.phone ? <span className="block text-xs">{user.phone}</span> : <span className="text-ink-300">—</span>}
                      {user.telegram_chat_id && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-600">
                          <Send className="w-3 h-3" /> Telegram linked
                        </span>
                      )}
                    </td>
                    <td className="text-ink-500 max-w-[200px]">
                      {address ? (
                        <span className="block text-xs line-clamp-2">
                          {address.address_line}, {address.city} {address.province}
                        </span>
                      ) : (
                        <span className="text-ink-300">—</span>
                      )}
                    </td>
                    <td className="text-ink-500">{formatDate(order.created_at)}</td>
                    <td>
                      <div className="min-w-[220px] max-w-[320px]">
                        {(order.items || []).slice(0, 3).map((item) => (
                          <div key={item.id} className="flex items-center gap-2 py-0.5">
                            {item.product_image ? (
                              <img
                                src={imageOrDefault(item.product_image)}
                                alt=""
                                className="w-7 h-7 rounded-md object-cover bg-ink-50 shrink-0"
                              />
                            ) : null}
                            <span className="text-xs text-ink-700 line-clamp-1 flex-1">
                              {item.product_name}
                            </span>
                            <span className="text-[10px] font-bold bg-ink-100 text-ink-600 rounded-full px-1.5 py-0.5 shrink-0">
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                        {(order.items || []).length === 0 && (
                          <span className="text-xs text-ink-300">—</span>
                        )}
                        {(order.items || []).length > 3 && (
                          <span className="text-[11px] font-semibold text-primary-600">
                            +{(order.items || []).length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="font-bold text-ink-900">{formatCurrency(order.total)}</td>
                    <td>
                      <StatusBadge
                        label={order.payment_status === "paid" ? "Paid" : "Unpaid"}
                        badge={order.payment_status === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}
                      />
                    </td>
                    <td><OrderStatusBadge status={order.status} /></td>
                    <td>
                      <div className="flex justify-end">
                        <Link to={`/admin/orders/${order.id}`} className="p-1.5 text-ink-400 hover:text-primary-600" aria-label="View order">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {!loading && orders.length > 0 && (
        <p className="px-4 py-3 text-xs text-ink-400 border-t border-ink-100">
          Showing {orders.length} of latest records
        </p>
      )}
    </div>
  );
}
