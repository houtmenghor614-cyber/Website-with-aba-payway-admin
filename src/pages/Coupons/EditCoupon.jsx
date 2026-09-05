import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import CouponForm from "../../components/coupons/CouponForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getCoupons, updateCoupon } from "../../api/couponApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function EditCoupon() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCoupons()
      .then((rows) => {
        const found = (rows || []).find((c) => Number(c.id) === Number(id));
        if (found) setCoupon(found);
        else setError("Coupon not found.");
      })
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (payload) => {
    setBusy(true);
    setError("");
    try {
      await updateCoupon(id, payload);
      notify.success("Coupon updated.");
      navigate("/admin/coupons");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Loader text="Loading coupon..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader title="Edit coupon" subtitle={coupon?.code} />
      <CouponForm initial={coupon} onSubmit={submit} loading={busy} />
    </div>
  );
}
