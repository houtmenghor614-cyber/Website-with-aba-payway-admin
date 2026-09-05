import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FolderPlus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import CategoryTable from "../../components/categories/CategoryTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import Loader from "../../components/common/Loader";
import { getCategories, deleteCategory } from "../../api/categoryApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Categories() {
  const { notify } = useAdmin();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setCategories(await getCategories());
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteCategory(toDelete.id);
      notify.success("Category deleted.");
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
      setToDelete(null);
    }
  };

  return (
    <div>
      <PageHeader
        title="Categories"
        subtitle="Organise your catalogue"
        actions={
          <Link to="/admin/categories/new" className="inline-flex items-center gap-2 bg-primary-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-primary-700">
            <FolderPlus className="w-4 h-4" /> New category
          </Link>
        }
      />
      {loading ? (
        <Loader text="Loading categories..." />
      ) : (
        <CategoryTable categories={categories} onDelete={(c) => setToDelete(c)} />
      )}
      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete category?"
        message={`"${toDelete?.name}" will be removed.`}
        loading={busy}
        onConfirm={remove}
      />
    </div>
  );
}
