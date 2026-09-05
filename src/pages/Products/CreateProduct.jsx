import React from "react";
import PageHeader from "../../components/common/PageHeader";
import ProductCreateForm from "../../components/products/ProductCreateForm";

export default function CreateProduct() {
  return (
    <div>
      <PageHeader title="New product" subtitle="Add a product to your catalogue" />
      <ProductCreateForm />
    </div>
  );
}
