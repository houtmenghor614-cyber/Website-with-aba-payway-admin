import { useMemo } from "react";

export default function usePagination(total = 0, pageSize = 12, page = 1, onPageChange) {
  const pages = useMemo(
    () => Math.max(1, Math.ceil((total || 0) / pageSize)),
    [total, pageSize]
  );

  const go = (next) => {
    const clamped = Math.min(pages, Math.max(1, Number(next) || 1));
    onPageChange?.(clamped);
  };

  return { page, pages, pageSize, total, goToPage: go };
}
