import { useCallback, useEffect, useState } from "react";
import { getOrders } from "../api/orderApi";

export default function useOrders(initial = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState({ page: 1, page_size: 12, ...initial });

  const load = useCallback(async (next) => {
    setLoading(true);
    setError("");
    try {
      const data = await getOrders(next);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load orders.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setFilters = useCallback((next) => {
    setParams((prev) => ({ ...prev, ...next, page: 1 }));
  }, []);

  const setPage = useCallback((page) => {
    setParams((prev) => ({ ...prev, page }));
  }, []);

  const reload = useCallback(() => load(params), [load, params]);

  return { items, total, loading, error, params, setFilters, setPage, reload };
}
