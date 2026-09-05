import React from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import ProductEditForm from "../../components/products/ProductEditForm";

export default function EditProduct() {
  const { id } = useParams();
  return (
    <div>
      <PageHeader title="Edit product" subtitle={`Product #${id}`} />
      <ProductEditForm productId={id} />
    </div>
  );
}
