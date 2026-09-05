import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import PaymentTable from "../../components/payments/PaymentTable";
import PaymentFilter from "../../components/payments/PaymentFilter";
import PaymentDetails from "../../components/payments/PaymentDetails";
import Modal from "../../components/common/Modal";
import usePayments from "../../hooks/usePayments";
import { syncPayment, manualCheck } from "../../api/paymentApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Payments() {
  const { notify } = useAdmin();
  const { items, total, loading, setFilters, reload } = usePayments();
  const [view, setView] = useState(null);
  const [syncingId, setSyncingId] = useState(null);

  const handleSync = async (paymentId) => {
    setSyncingId(paymentId);
    try {
      const updated = await syncPayment(paymentId);
      notify.success(`Payment ${updated.status}.`);
      reload();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setSyncingId(null);
    }
  };

  const handleManual = async (txId) => {
    try {
      const res = await manualCheck(txId);
      notify.success(`Status: ${res.status}`);
      reload();
    } catch (err) {
      notify.error(getApiError(err));
    }
  };

  return (
    <div>
      <PageHeader title="Payments" subtitle={`${total} payment records`} />
      <div className="bg-white rounded-2xl border border-ink-100 p-4 mb-4">
        <PaymentFilter onApply={(next) => setFilters(next)} onManualCheck={handleManual} />
      </div>
      <PaymentTable payments={items} loading={loading} onView={setView} onSync={handleSync} syncingId={syncingId} />
      <Modal open={Boolean(view)} onClose={() => setView(null)} title="Payment details" size="md">
        <PaymentDetails payment={view} />
      </Modal>
    </div>
  );
}
