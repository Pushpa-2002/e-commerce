import ProductCard from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/productApi";

export default async function OnSaleProducts() {
  const products = await fetchProducts();
  const onSale = [...products].sort((a, b) => a.price - b.price).slice(0, 4);

  return (
    <section className="p-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">On Sale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {onSale.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
