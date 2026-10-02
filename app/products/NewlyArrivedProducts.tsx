import ProductCard from "@/components/products/ProductCard";
import { fetchProducts } from "@/lib/productApi";

export default async function NewlyArrivedProducts() {
  const products = await fetchProducts();
  const newProduct = products.slice(-4).reverse();

  return (
    <section className="p-8">
      <h2 className="text-2xl font-bold mb-6">Newly Arrived</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {newProduct.map((prod) => (
          <ProductCard key={prod?.id} product={prod} />
        ))}
      </div>
    </section>
  );
}
