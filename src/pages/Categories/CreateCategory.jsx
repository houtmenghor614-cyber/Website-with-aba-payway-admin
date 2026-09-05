import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import CategoryForm from "../../components/categories/CategoryForm";
import ErrorMessage from "../../components/common/ErrorMessage";
import { createCategory } from "../../api/categoryApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function CreateCategory() {
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (payload) => {
    setBusy(true);
    setError("");
    try {
      const cat = await createCategory(payload);
      notify.success(`Category "${cat.name}" created.`);
      navigate("/admin/categories");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="New category" />
      {error && <div className="mb-4"><ErrorMessage message={error} /></div>}
      <CategoryForm onSubmit={submit} loading={busy} />
    </div>
  );
}
