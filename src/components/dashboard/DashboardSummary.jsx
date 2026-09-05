import React from "react";
import {
  CreditCard,
  Package,
  Shirt,
  TrendingUp,
  Users,
} from "lucide-react";
import useDashboard from "../../hooks/useDashboard";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import StatsCard from "./StatsCard";
import RevenueCard from "./RevenueCard";
import SalesChart from "./SalesChart";
import OrdersChart from "./OrdersChart";
import RecentOrders from "./RecentOrders";
import RecentUsers from "./RecentUsers";
import LowStockProducts from "./LowStockProducts";
import formatCurrency from "../../utils/formatCurrency";

export default function DashboardSummary() {
  const { data, loading, error, reload } = useDashboard();

  if (loading) return <Loader full text="Loading dashboard..." />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;
  if (!data) return null;

  const { stats, sales_last_7_days } = data;
  const series = sales_last_7_days || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <RevenueCard
          total={stats.total_revenue}
          today={stats.today_revenue}
          series={series}
        />
        <div className="grid grid-cols-2 gap-4 xl:col-span-2">
          <StatsCard icon={Package} label="Orders" value={stats.total_orders} hint={`${stats.pending_orders} awaiting payment`} tone="primary" />
          <StatsCard icon={Users} label="Customers" value={stats.total_users} tone="emerald" />
          <StatsCard icon={Shirt} label="Products" value={stats.total_products} hint={`${stats.low_stock_products} low stock`} tone="sky" />
          <StatsCard icon={CreditCard} label="Payments pending" value={stats.unpaid_payments} tone="amber" />
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <SalesChart series={series} />
        <OrdersChart series={series} />
      </div>

      <LowStockProducts />

      <div className="grid lg:grid-cols-2 gap-4">
        <RecentOrders />
        <RecentUsers />
      </div>

      <div className="flex items-center gap-2 text-xs text-ink-400">
        <TrendingUp className="w-4 h-4 text-emerald-500" />
        Revenue today: {formatCurrency(stats.today_revenue)} · Lifetime:{" "}
        {formatCurrency(stats.total_revenue)}
      </div>
    </div>
  );
}
