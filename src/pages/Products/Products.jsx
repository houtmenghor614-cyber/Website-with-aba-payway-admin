import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PackagePlus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import Pagination from "../../components/common/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import ProductTable from "../../components/products/ProductTable";
import ProductFilter from "../../components/products/ProductFilter";
import useProducts from "../../hooks/useProducts";
import { getCategories } from "../../api/categoryApi";
import { deleteProduct } from "../../api/productApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";
import useDebounce from "../../hooks/useDebounce";

export default function Products() {
  const { notify } = useAdmin();
  const { items, total, loading, params, setFilters, setPage, reload } = useProducts();
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 350);
  const [categories, setCategories] = useState([]);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setFilters({ search: debounced || undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const filteredItems = params.stock_only
    ? items.filter((p) => Number(p.stock) <= Number(p.low_stock_threshold || 0))
    : items;

  const confirmDelete = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteProduct(toDelete.id);
      notify.success(`Product "${toDelete.name}" deleted.`);
      reload();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  const pages = Math.max(1, Math.ceil(total / (params.page_size || 12)));

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle={`${total} products in catalogue`}
        actions={
          <Link to="/admin/products/new" className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-primary-700">
            <PackagePlus className="w-4 h-4" /> New product
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search name or SKU..." className="w-64" />
        <ProductFilter categories={categories} value={{}} onApply={(next) => setFilters(next)} />
      </div>

      <ProductTable products={filteredItems} loading={loading} onDelete={(p) => setToDelete(p)} />
      <Pagination page={params.page} pages={pages} onPageChange={setPage} className="mt-5" />

      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete product?"
        message={`"${toDelete?.name}" will be permanently deleted.`}
        confirmLabel="Delete product"
        loading={busy}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
