import { useCallback, useEffect, useState } from "react";
import { getAdminPayments } from "../api/adminApi";

export default function usePayments(initial = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState({ limit: 50, ...initial });

  const load = useCallback(async (next) => {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminPayments(next);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      setError(err?.response?.data?.message || "Could not load payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const setFilters = useCallback((next) => {
    setParams((prev) => ({ ...prev, ...next }));
  }, []);

  const reload = useCallback(() => load(params), [load, params]);

  return { items, total, loading, error, params, setFilters, reload };
}
