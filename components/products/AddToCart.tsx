"use client";

import type { Product } from "@/lib/api/types";
import { addItem } from "@/lib/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CustomButton } from "../ui/CustomButton";

export default function AddToCartButton({ product }: { product: Product }) {
  const dispatch = useDispatch();

  const quantity = useSelector(
    (state: any) =>
      state?.cart?.data?.find((i: any) => i.id === product.id)?.quantity ?? 0,
  );

  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quantity === 0) return;
    setJustAdded(true);
    const t = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(t);
  }, [quantity]);

  const label = justAdded
    ? "Added"
    : quantity > 0
      ? `In cart · ${quantity}`
      : "Add to cart";

  const styleClass = justAdded
    ? "bg-success! text-white! shadow-md shadow-success/30 scale-[1.02]"
    : quantity > 0
      ? "bg-brand-soft! text-brand-ink! border! border-brand-line! hover:border-brand! hover:shadow-sm"
      : "bg-brand! text-white! shadow-sm hover:bg-brand-hover! hover:shadow-md hover:shadow-brand/25 hover:-translate-y-0.5";

  return (
    <CustomButton
      onClick={() =>
        dispatch(
          addItem({
            id: product.id,
            name: product.title,
            price: product.price,
          }),
        )
      }
      aria-live="polite"
      className={`group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold tracking-wide
        transition-all duration-200 ease-out
        active:translate-y-0 active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2
        ${styleClass}`}
    >
      {justAdded ? (
        <svg
          className="h-4 w-4 animate-[bounce_0.6s_ease-out_1]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1.25" />
          <circle cx="18" cy="20" r="1.25" />
          <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6" />
        </svg>
      )}

      <span>{label}</span>

      {quantity === 0 && !justAdded && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-[300%]"
        />
      )}
    </CustomButton>
  );
}
