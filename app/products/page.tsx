import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchCategories, fetchProducts } from "@/lib/productApi";
import ProductsClient from "./ProductsClient";
import Loading from "@/components/ui/Loading";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full catalog of products",
};

const PER_PAGE = 8;

interface PageProps {
  searchParams: {
    sort?: "asc" | "desc";
    page?: string;
  };
}
export const dynamic = "force-dynamic";
export default async function ProductsPage({ searchParams }: PageProps) {
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const sort = searchParams.sort === "desc" ? "desc" : "asc";
  const sorted = [...products].sort((a, b) =>
    sort === "desc" ? b.price - a.price : a.price - b.price,
  );

  const page = Math.max(1, Number(searchParams.page) || 1);
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-1 text-sm text-gray-500">
          {sorted.length} products available
        </p>
      </div>

      <Suspense fallback={<Loading message="Loading products…" />}>
        <ProductsClient products={paginated} categories={categories} />
      </Suspense>
    </div>
  );
}
