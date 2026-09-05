import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function windowNums(page, pages, radius = 1) {
  const start = Math.max(1, page - radius);
  const end = Math.min(pages, page + radius);
  const nums = [];
  for (let i = start; i <= end; i += 1) nums.push(i);
  return { nums, showStart: start > 2, showEnd: end < pages - 1 };
}

export default function Pagination({ page = 1, pages = 1, onPageChange, className = "" }) {
  if (pages <= 1) return null;
  const { nums, showStart, showEnd } = windowNums(page, pages);
  const item = (active) =>
    `w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition ${
      active ? "bg-primary-600 text-white" : "text-ink-500 hover:bg-ink-100"
    }`;
  return (
    <nav className={`flex items-center justify-center gap-1 ${className}`} aria-label="Pagination">
      <button type="button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous" className={item(false)}>
        <ChevronLeft className="w-4 h-4" />
      </button>
      {showStart && (
        <>
          <button type="button" onClick={() => onPageChange(1)} className={item(false)}>1</button>
          <span className="px-1 text-ink-400">...</span>
        </>
      )}
      {nums.map((n) => (
        <button key={n} type="button" onClick={() => onPageChange(n)} className={item(n === page)}>
          {n}
        </button>
      ))}
      {showEnd && (
        <>
          <span className="px-1 text-ink-400">...</span>
          <button type="button" onClick={() => onPageChange(pages)} className={item(false)}>{pages}</button>
        </>
      )}
      <button type="button" disabled={page >= pages} onClick={() => onPageChange(page + 1)} aria-label="Next" className={item(false)}>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
