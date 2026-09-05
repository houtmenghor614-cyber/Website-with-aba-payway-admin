import React, { useEffect, useState } from "react";
import { getOrdersReport } from "../../api/reportApi";
import StatusBadge from "../common/StatusBadge";
import { ORDER_STATUS } from "../../data/orderStatus";
import Loader from "../common/Loader";

export default function OrderReport() {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    getOrdersReport({ page_size: 100 })
      .then((d) => setOrders(d.items || []))
      .catch(() => setOrders([]));
  }, []);

  if (orders === null) return <Loader text="Loading orders report..." />;
  const counts = {};
  orders.forEach((o) => {
    counts[o.status] = (counts[o.status] || 0) + 1;
  });

  return (
    <div className="bg-white rounded-2xl border border-ink-100 p-5">
      <p className="font-display font-bold text-ink-800 mb-3">Orders by status</p>
      <div className="space-y-2">
        {Object.keys(ORDER_STATUS).map((status) => (
          <div key={status} className="flex items-center justify-between rounded-lg bg-ink-50 px-3 py-2">
            <StatusBadge label={ORDER_STATUS[status].label} badge={ORDER_STATUS[status].badge} icon={ORDER_STATUS[status].icon} />
            <span className="font-extrabold text-ink-800">{counts[status] || 0}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
