import React, { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import ProductForm from "./ProductForm";
import ProductGallery from "./ProductGallery";
import ProductImageUpload from "./ProductImageUpload";
import Loader from "../common/Loader";
import ErrorMessage from "../common/ErrorMessage";
import { getProduct, updateProduct } from "../../api/productApi";
import { deleteProductImage, setProductMainImage } from "../../api/productImageApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function ProductEditForm({ productId }) {
  const { notify } = useAdmin();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setProduct(await getProduct(productId));
    } catch (err) {
      setError(getApiError(err, "Product not found."));
    }
  };

  useEffect(() => {
    load().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const submit = async (payload) => {
    setSaving(true);
    setError("");
    try {
      await updateProduct(productId, payload);
      notify.success("Product details saved.");
      await load();
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setSaving(false);
    }
  };

  const setMain = async (imageId) => {
    try {
      await setProductMainImage(imageId);
      notify.success("Main image updated.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    }
  };

  const removeImage = async (imageId) => {
    try {
      await deleteProductImage(imageId);
      notify.success("Image deleted.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    }
  };

  if (loading) return <Loader text="Loading product..." />;
  if (error && !product) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div className="space-y-5">
      {error && product && <ErrorMessage message={error} />}

      {/* Images manager - upload + gallery */}
      <section className="bg-white rounded-2xl border border-ink-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-ink-900 flex items-center gap-2">
            <ImagePlus className="w-5 h-5 text-primary-600" />
            Product images
          </h2>
          <span className="text-xs text-ink-400">{product.images?.length || 0} image(s)</span>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <ProductGallery
              images={product.images || []}
              onSetMain={setMain}
              onDelete={removeImage}
            />
          </div>
          <div className="bg-ink-50 rounded-xl p-4">
            <ProductImageUpload productId={product.id} onUploaded={load} />
          </div>
        </div>
      </section>

      {/* Details form */}
      <ProductForm initial={product} onSubmit={submit} loading={saving} />
    </div>
  );
}
