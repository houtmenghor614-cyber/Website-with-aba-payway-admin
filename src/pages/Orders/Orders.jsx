import React from "react";
import PageHeader from "../../components/common/PageHeader";
import OrderTable from "../../components/orders/OrderTable";
import OrderFilter from "../../components/orders/OrderFilter";
import Pagination from "../../components/common/Pagination";
import useOrders from "../../hooks/useOrders";

export default function Orders() {
  const { items, total, loading, params, setFilters, setPage } = useOrders();

  const pages = Math.max(1, Math.ceil(total / (params.page_size || 12)));

  return (
    <div>
      <PageHeader title="Orders" subtitle={`${total} orders found`} />
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <OrderFilter value={{}} onApply={(next) => setFilters(next)} />
      </div>
      <OrderTable orders={items} loading={loading} />
      <Pagination page={params.page} pages={pages} onPageChange={setPage} className="mt-5" />
    </div>
  );
}

