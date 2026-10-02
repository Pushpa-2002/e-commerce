"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  categories: string[];
  category: string;
  search: string;
  maxPrice: number;
  sort: "asc" | "desc";
}

export default function ProductFilters({
  categories,
  category,
  search,
  maxPrice,
  sort,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for the search box (debounced URL writes)
  const [searchInput, setSearchInput] = useState(search);

  // Sync input → URL (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      if (searchInput !== search) update("search", searchInput);
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  // Sync URL → input (back/forward support)
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  /** Update a single query param and reset page to 1. */
  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") params.set(key, value);
    else params.delete(key);

    params.delete("page"); // filters change → go back to page 1

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  function clearAll() {
    router.push(pathname);
    setSearchInput("");
  }

  const hasFilters = category !== "all" || search !== "" || maxPrice < 1000;

  return (
    <div className="mb-8 rounded-lg border bg-white p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div>
          <label className="block text-xs font-medium text-gray-500">
            Search
          </label>
          <input
            type="text"
            value={searchInput}
            placeholder="Search products…"
            onChange={(e) => setSearchInput(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:border-black focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-gray-500">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => update("category", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm capitalize focus:border-black focus:outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-xs font-medium text-gray-500">
            Max price: <span className="font-semibold">${maxPrice}</span>
          </label>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxPrice}
            onChange={(e) => update("maxPrice", e.target.value)}
            className="mt-3 w-full accent-black"
          />
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-medium text-gray-500">
            Sort by price
          </label>
          <select
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:border-black focus:outline-none"
          >
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>
      </div>

      {hasFilters && (
        <div className="mt-4 flex items-center justify-between border-t pt-3">
          <p className="text-xs text-gray-500">
            Filters are reflected in the URL — you can share this page.
          </p>
          <button
            onClick={clearAll}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
