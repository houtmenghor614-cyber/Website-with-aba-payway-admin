import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { getProduct } from "../../api/productApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";
import Loader from "../../components/common/Loader";
import ErrorMessage from "../../components/common/ErrorMessage";
import StatusBadge from "../../components/common/StatusBadge";
import ProductGallery from "../../components/products/ProductGallery";
import ProductImageUpload from "../../components/products/ProductImageUpload";
import { deleteProductImage, setProductMainImage } from "../../api/productImageApi";
import formatCurrency from "../../utils/formatCurrency";
import { imageOrDefault } from "../../utils/constants";

export default function ProductDetails() {
  const { id } = useParams();
  const { notify } = useAdmin();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setProduct(await getProduct(id));
    } catch (err) {
      setError(getApiError(err, "Product not found."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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

  if (loading) return <Loader full text="Loading product..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return null;

  return (
    <div>
      <Link to="/admin/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-500 hover:text-primary-600 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink-900">{product.name}</h1>
          <p className="text-sm text-ink-500 mt-1">
            SKU {product.sku || "—"} · {formatCurrency(product.price)}
            {product.old_price ? ` · was ${formatCurrency(product.old_price)}` : ""}
          </p>
        </div>
        <Link to={`/admin/products/${id}/edit`} className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary-700">
          <Pencil className="w-4 h-4" /> Edit
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-ink-100 p-5">
          <img src={imageOrDefault(product.main_image)} alt="" className="w-full aspect-square object-cover rounded-xl bg-ink-50" />
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-xs text-ink-400">Stock</p>
              <p className={`font-bold ${product.stock <= (product.low_stock_threshold || 0) ? "text-rose-600" : "text-ink-800"}`}>{product.stock}</p>
            </div>
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-xs text-ink-400">Sold</p>
              <p className="font-bold text-ink-800">{product.sold || 0}</p>
            </div>
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-xs text-ink-400">Category</p>
              <p className="font-bold text-ink-800">{product.category?.name || "—"}</p>
            </div>
            <div className="bg-ink-50 rounded-xl p-3">
              <p className="text-xs text-ink-400">Status</p>
              <StatusBadge label={product.is_active ? "Active" : "Hidden"} badge={product.is_active ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"} />
            </div>
          </div>
          {product.description && (
            <p className="mt-4 text-sm text-ink-600 leading-6">{product.description}</p>
          )}
        </div>

        <div className="lg:col-span-2 space-y-5">
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-3">Gallery</h2>
            <ProductGallery images={product.images || []} onSetMain={setMain} onDelete={removeImage} />
          </section>
          <section className="bg-white rounded-2xl border border-ink-100 p-5">
            <h2 className="font-display font-bold text-ink-900 mb-3">Upload image</h2>
            <ProductImageUpload productId={product.id} onUploaded={load} />
          </section>
        </div>
      </div>
    </div>
  );
}
