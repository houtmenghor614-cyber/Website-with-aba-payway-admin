import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm";
import ErrorMessage from "../common/ErrorMessage";
import { createProduct } from "../../api/productApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function ProductCreateForm() {
  const navigate = useNavigate();
  const { notify } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (payload) => {
    setLoading(true);
    setError("");
    try {
      const product = await createProduct(payload);
      notify.success(`Product "${product.name}" created.`);
      navigate(`/admin/products/${product.id}/edit`);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <ErrorMessage message={error} />}
      <ProductForm onSubmit={submit} loading={loading} />
    </div>
  );
}
