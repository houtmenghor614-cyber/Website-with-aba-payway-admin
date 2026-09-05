import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import CouponForm from "../../components/coupons/CouponForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import { createCoupon } from "../../api/couponApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function CreateCoupon() {
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (payload) => {
    setBusy(true);
    setError("");
    try {
      await createCoupon(payload);
      notify.success("Coupon created.");
      navigate("/admin/coupons");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Create coupon" />
      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}
      <CouponForm onSubmit={submit} loading={busy} />
    </div>
  );
}
