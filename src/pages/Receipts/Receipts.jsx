import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import Pagination from "../../components/common/Pagination";
import ReceiptTable from "../../components/receipts/ReceiptTable";
import ReceiptDetails from "../../components/receipts/ReceiptDetails";
import ReceiptPreview from "../../components/receipts/ReceiptPreview";
import { getReceipts } from "../../api/receiptApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Receipts() {
  const { notify } = useAdmin();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReceipts({ page, page_size: pageSize });
      setReceipts(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [notify, page]);

  useEffect(() => {
    load();
  }, [load]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <PageHeader title="Receipts" subtitle={`${total} receipts issued`} />
      <ReceiptTable receipts={receipts} loading={loading} onView={setView} />
      <Pagination page={page} pages={pages} onPageChange={setPage} className="mt-5" />

      <Modal open={Boolean(view)} onClose={() => setView(null)} title="Receipt" size="md">
        <ReceiptPreview receipt={view} />
        <div className="mt-4 border-t border-ink-100 pt-4">
          <ReceiptDetails receipt={view} />
        </div>
      </Modal>
    </div>
  );
}
