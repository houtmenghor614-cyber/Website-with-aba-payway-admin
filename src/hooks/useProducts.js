import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "../api/productApi";

export default function useProducts(initial = {}) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [params, setParams] = useState({ page: 1, page_size: 12, ...initial });
  const seq = useRef(0);

  const load = useCallback(async (next) => {
    const current = ++seq.current;
    setLoading(true);
    setError("");
    try {
      const data = await getProducts(next);
      if (current === seq.current) {
        setItems(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (err) {
      if (current === seq.current)
        setError(err?.response?.data?.message || "Could not load products.");
    } finally {
      if (current === seq.current) setLoading(false);
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
