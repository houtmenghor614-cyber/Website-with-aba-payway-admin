import React, { useCallback, useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import BannerTable from "../../components/banners/BannerTable";
import BannerForm from "../../components/banners/BannerForm";
import Loader from "../../components/common/Loader";
import { getBanners, createBanner, updateBanner, deleteBanner } from "../../api/bannerApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Banners() {
  const { notify } = useAdmin();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setBanners(await getBanners({}));
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (payload) => {
    setBusy(true);
    try {
      if (editing) {
        await updateBanner(editing.id, payload);
        notify.success("Banner updated.");
      } else {
        await createBanner(payload);
        notify.success("Banner created.");
      }
      setModal(false);
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    setBusy(true);
    try {
      await deleteBanner(toDelete.id);
      notify.success("Banner deleted.");
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
        title="Banners"
        subtitle="Home page promotions"
        actions={
          <Button onClick={() => { setEditing(null); setModal(true); }} icon={ImagePlus}>
            New banner
          </Button>
        }
      />
      {loading ? (
        <Loader text="Loading banners..." />
      ) : (
        <BannerTable banners={banners} onEdit={(b) => { setEditing(b); setModal(true); }} onDelete={(b) => setToDelete(b)} />
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit banner" : "New banner"} wide>
        <BannerForm initial={editing} onSubmit={submit} loading={busy} />
      </Modal>
      <ConfirmModal open={Boolean(toDelete)} onClose={() => setToDelete(null)} title="Delete banner?" message={`"${toDelete?.title || toDelete?.id}" will be removed.`} loading={busy} onConfirm={remove} />
    </div>
  );
}
