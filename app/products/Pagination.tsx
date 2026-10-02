"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function hrefFor(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/products?${params.toString()}`;
  }

  /** Build a compact page window: 1 … 4 5 [6] 7 8 … 20 */
  const pages: (number | "…")[] = [];
  const WINDOW = 1;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - WINDOW && i <= currentPage + WINDOW)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…");
    }
  }

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={hrefFor(currentPage - 1)}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          ← Prev
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded border px-3 py-1.5 text-sm text-gray-300">
          ← Prev
        </span>
      )}

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`gap-${i}`} className="px-2 text-gray-400">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={hrefFor(p)}
            aria-current={p === currentPage ? "page" : undefined}
            className={`min-w-9 rounded border px-3 py-1.5 text-center text-sm ${
              p === currentPage ? "bg-black text-white" : "hover:bg-gray-100"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Next */}
      {currentPage < totalPages ? (
        <Link
          href={hrefFor(currentPage + 1)}
          className="rounded border px-3 py-1.5 text-sm hover:bg-gray-100"
        >
          Next →
        </Link>
      ) : (
        <span className="cursor-not-allowed rounded border px-3 py-1.5 text-sm text-gray-300">
          Next →
        </span>
      )}
    </nav>
  );
}
