import React, { useCallback, useEffect, useState } from "react";
import { BadgePercent } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import CouponTable from "../../components/coupons/CouponTable";
import CouponForm from "../../components/coupons/CouponForm";
import Loader from "../../components/common/Loader";
import { getCoupons, createCoupon, updateCoupon, deleteCoupon } from "../../api/couponApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Coupons() {
  const { notify } = useAdmin();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCoupons(await getCoupons());
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (payload) => {
    setBusy(true);
    try {
      if (editing) {
        await updateCoupon(editing.id, payload);
        notify.success("Coupon updated.");
      } else {
        await createCoupon(payload);
        notify.success("Coupon created.");
      }
      setModal(false);
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteCoupon(toDelete.id);
      notify.success("Coupon deleted.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Coupons"
        subtitle="Discount codes for your customers"
        actions={
          <Button onClick={() => { setEditing(null); setModal(true); }} icon={BadgePercent}>
            New coupon
          </Button>
        }
      />
      {loading ? (
        <Loader text="Loading coupons..." />
      ) : (
        <CouponTable coupons={coupons} onEdit={(c) => { setEditing(c); setModal(true); }} onDelete={(c) => setToDelete(c)} />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit coupon" : "New coupon"} size="md">
        <CouponForm initial={editing} onSubmit={submit} loading={busy} />
      </Modal>
      <ConfirmModal open={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Delete coupon?" message={`Code "${toDelete?.code}" will stop working.`} loading={busy} onConfirm={remove} />
    </div>
  );
}
