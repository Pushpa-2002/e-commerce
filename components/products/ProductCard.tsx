import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/api/types";
import { theme } from "@/lib/theme";
import AddToCartButton from "./AddToCart";

function StarRating({ rate, count }: { rate: number; count: number }) {
  const rounded = Math.round(rate);
  return (
    <div className="flex items-center gap-1.5 text-xs">
      <div className="flex text-sm leading-none" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < rounded ? theme.star.filled : theme.star.empty}
          >
            ★
          </span>
        ))}
      </div>
      <span className={`font-semibold ${theme.text.rating}`}>
        {rate.toFixed(1)}
      </span>
      <span className={theme.text.ratingCount}>({count})</span>
      <span className="sr-only">{`Rated ${rate.toFixed(1)} out of 5`}</span>
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const isTopRated = product.rating.rate >= 4.5;

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${theme.card.surface}`}
    >
      <Link
        href={`/products/${product.id}`}
        className={`relative block aspect-square overflow-hidden p-6 ${theme.card.imageWrap}`}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur ${theme.badge.category}`}
        >
          {product.category}
        </span>

        {isTopRated && (
          <span
            className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm ${theme.badge.topRated}`}
          >
            Top rated
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.id}`}>
          <h3
            className={`line-clamp-2 min-h-10 text-sm font-semibold leading-snug transition-colors ${theme.text.title}`}
          >
            {product.title}
          </h3>
        </Link>

        <div className="mt-2">
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        </div>

        <div className="mt-auto pt-4">
          <p
            className={`text-xl font-extrabold tracking-tight ${theme.text.price}`}
          >
            ${product.price.toFixed(2)}
          </p>

          <div className="mt-3">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </article>
  );
}
