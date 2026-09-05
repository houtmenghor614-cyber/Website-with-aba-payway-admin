import React, { useCallback, useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StockTable from "../../components/stock/StockTable";
import StockAdjustment from "../../components/stock/StockAdjustment";
import StockMovement from "../../components/stock/StockMovement";
import Modal from "../../components/common/Modal";
import LowStockAlert from "../../components/stock/LowStockAlert";
import { getStockProducts, getStockMovements, adjustStock } from "../../api/stockApi";
import { getApiError } from "../../api/axios";
import { useAdmin } from "../../context/AdminContext";

export default function Stock() {
  const { notify } = useAdmin();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adjusting, setAdjusting] = useState(null);
  const [historyProduct, setHistoryProduct] = useState(null);
  const [movements, setMovements] = useState([]);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getStockProducts({});
      setProducts(res.items || []);
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    load();
  }, [load]);

  const openHistory = async (product) => {
    setHistoryProduct(product);
    setMovements([]);
    try {
      const res = await getStockMovements({ product_id: product.id, page_size: 100 });
      setMovements(res.items || []);
    } catch (err) {
      notify.error(getApiError(err));
    }
  };

  const submitAdjust = async (quantity, movementType, note) => {
    setBusy(true);
    try {
      await adjustStock(adjusting.id, quantity, note, movementType);
      notify.success("Stock updated.");
      setAdjusting(null);
      await load();
    } catch (err) {
      notify.error(getApiError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader title="Stock management" subtitle="Monitor levels, adjust quantities and review movements" />
      <div className="mb-5"><LowStockAlert products={products} /></div>
      <StockTable
        products={products}
        loading={loading}
        onAdjust={setAdjusting}
        onHistory={openHistory}
      />

      <StockAdjustment product={adjusting} open={Boolean(adjusting)} onClose={() => setAdjusting(null)} onSubmit={submitAdjust} busy={busy} />

      <Modal open={Boolean(historyProduct)} onClose={() => setHistoryProduct(null)} title={`Stock history - ${historyProduct?.name || ""}`} wide>
        <StockMovement movements={movements} loading={false} />
      </Modal>
    </div>
  );
}
