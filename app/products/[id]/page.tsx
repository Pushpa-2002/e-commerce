import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ChevronRight,
  Heart,
  Package,
  RotateCcw,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { fetchProductById, fetchProducts } from "@/lib/productApi";
import type { Product } from "@/lib/api/types";
import AddToCartButton from "@/components/products/AddToCart";
import ProductCard from "@/components/products/ProductCard";

interface PageProps {
  params: Promise<{ id: string }>;
}
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const product = await fetchProductById(id);
    return {
      title: product.title,
      description: product.description.slice(0, 160),
      openGraph: { images: [product.image] },
    };
  } catch {
    return { title: "Product not found" };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  let product: Product | undefined;
  try {
    product = await fetchProductById(id);
  } catch {
    notFound();
  }

  if (!product) notFound();

  // Related products (same category, excluding this one)
  let related: Product[] = [];
  try {
    const all = await fetchProducts();
    related = all
      .filter((p) => p.category === product!.category && p.id !== product!.id)
      .slice(0, 4);
  } catch {
    related = [];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.image,
    description: product.description,
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count,
    },
  };

  const rounded = Math.round(product.rating.rate);

  return (
    <article className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-ink-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/products" className="hover:text-brand">
          Products
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate capitalize text-ink">{product.category}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-linear-to-br from-brand-tint via-surface to-brand-soft/40 p-12">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
            />

            <button
              type="button"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 text-ink-soft backdrop-blur transition-colors hover:border-brand hover:text-brand"
              aria-label="Add to wishlist"
            >
              <Heart className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Free shipping" },
              { icon: RotateCcw, label: "30-day returns" },
              { icon: ShieldCheck, label: "Secure checkout" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-4 text-center"
              >
                <b.icon className="h-5 w-5 text-brand" />
                <span className="text-[11px] font-medium text-ink-soft">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center rounded-full bg-brand-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-ink">
            {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-0.5 text-star">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < rounded ? "fill-star" : "fill-none"}`}
                />
              ))}
            </div>
            <span className="font-medium text-ink">
              {product.rating.rate.toFixed(1)}
            </span>
            <span className="text-ink-muted">
              · {product.rating.count} reviews
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-semibold tracking-tight text-ink">
              ${product.price.toFixed(2)}
            </span>
            <span className="rounded-md bg-success-soft px-2 py-0.5 text-xs font-semibold text-success">
              In stock
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="sm:flex-1">
              <AddToCartButton product={product} />
            </div>
            <button
              type="button"
              className="rounded-xl border border-line bg-surface px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Buy now
            </button>
          </div>

          <dl className="mt-8 divide-y divide-line-soft rounded-2xl border border-line bg-surface text-sm">
            {[
              {
                icon: Package,
                label: "Ships within",
                value: "1–2 business days",
              },
              { icon: Truck, label: "Delivery", value: "Free over $50" },
              {
                icon: RotateCcw,
                label: "Returns",
                value: "30 days, no questions",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-5 py-4"
              >
                <dt className="flex items-center gap-3 text-ink-soft">
                  <row.icon className="h-4 w-4 text-brand" />
                  {row.label}
                </dt>
                <dd className="font-medium text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <header className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                You may also like
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                More in {product.category}
              </h2>
            </div>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="text-sm font-medium text-ink-soft hover:text-brand"
            >
              View all →
            </Link>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
