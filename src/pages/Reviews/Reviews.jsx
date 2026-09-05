import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";
import ReviewTable from "../../components/reviews/ReviewTable";
import ReviewDetails from "../../components/reviews/ReviewDetails";
import { getReviews, setReviewApproved, deleteReview } from "../../api/reviewApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Reviews() {
  const { notify } = useAdmin();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getReviews({ page, page_size: pageSize });
      setReviews(data.items || []);
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

  const approve = async (review) => {
    try {
      await setReviewApproved(review.id, true);
      notify.success("Review approved.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteReview(toDelete.id);
      notify.success("Review deleted.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div>
      <PageHeader title="Reviews" subtitle={`${total} reviews`} />
      <ReviewTable reviews={reviews} loading={loading} onView={setView} onToggle={approve} onDelete={(r) => setToDelete(r)} />
      <Pagination page={page} pages={pages} onPageChange={setPage} className="mt-5" />

      <Modal open={Boolean(view)} onClose={() => setView(null)} title="Review details" size="md">
        <ReviewDetails review={view} />
      </Modal>
      <ConfirmModal open={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Delete review?" loading={busy} onConfirm={remove} />
    </div>
  );
}
