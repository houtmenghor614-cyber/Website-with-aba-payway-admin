import React from "react";
import PageHeader from "../../components/common/PageHeader";
import SalesReport from "../../components/reports/SalesReport";
import OrderReport from "../../components/reports/OrderReport";
import ProductReport from "../../components/reports/ProductReport";
import CustomerReport from "../../components/reports/CustomerReport";
import PaymentReport from "../../components/reports/PaymentReport";

export default function Reports() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Business overview" />
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2"><SalesReport /></div>
        <PaymentReport />
      </div>
      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <OrderReport />
        <ProductReport />
      </div>
      <div className="mt-5"><CustomerReport /></div>
    </div>
  );
}
