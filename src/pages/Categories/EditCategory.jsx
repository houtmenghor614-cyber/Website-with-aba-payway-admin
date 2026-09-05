import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import CategoryForm from "../../components/categories/CategoryForm";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getCategories, updateCategory } from "../../api/categoryApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getCategories()
      .then((rows) => {
        const found = (rows || []).find((c) => Number(c.id) === Number(id));
        if (found) setCategory(found);
        else setError("Category not found.");
      })
      .catch((err) => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, [id]);

  const submit = async (payload) => {
    setBusy(true);
    setError("");
    try {
      await updateCategory(id, payload);
      notify.success("Category updated.");
      navigate("/admin/categories");
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <Loader text="Loading category..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <PageHeader title="Edit category" subtitle={category?.name} />
      <CategoryForm initial={category} onSubmit={submit} loading={busy} />
    </div>
  );
}
