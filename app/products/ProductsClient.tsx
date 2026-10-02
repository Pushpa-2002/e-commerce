"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { Product } from "@/lib/api/types";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "./ProductFilter";
import Pagination from "./Pagination";

interface Props {
  products: Product[];
  categories: string[];
}

const PER_PAGE = 8;

export default function ProductsClient({ products, categories }: Props) {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search") ?? "";
  const maxPrice = Number(searchParams.get("maxPrice") ?? 1000);
  const sort = searchParams.get("sort") === "desc" ? "desc" : "asc";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          p.price <= maxPrice &&
          p.title.toLowerCase().includes(search.toLowerCase()),
      ),
    [products, category, maxPrice, search],
  );

  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) =>
        sort === "desc" ? b.price - a.price : a.price - b.price,
      ),
    [filtered, sort],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const paginated = useMemo(
    () => sorted.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE),
    [sorted, safePage],
  );

  return (
    <>
      <ProductFilters
        categories={categories}
        category={category}
        search={search}
        maxPrice={maxPrice}
        sort={sort}
      />

      {paginated.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          <p className="text-lg font-medium">No products match your filters.</p>
          <p className="mt-1 text-sm">
            Try adjusting the search or price range.
          </p>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-gray-500">
            Showing {paginated.length} of {sorted.length} products
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paginated?.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <Pagination currentPage={safePage} totalPages={totalPages} />
        </>
      )}
    </>
  );
}
