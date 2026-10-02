"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  setQuantity,
  clearCart,
} from "@/lib/redux/slices/cartSlice";
import { fetchProducts } from "@/lib/productApi";
import type { Product } from "@/lib/api/types";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
export const dynamic = "force-dynamic";
export default function CartPage() {
  const dispatch = useDispatch();

  const cartItems: { id: number; quantity: number; price: number }[] =
    useSelector((state: any) => state?.cart?.data) ?? [];

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const detailedItems = cartItems
    .map((cart) => {
      const product = products.find((p) => p.id === cart.id);
      return product ? { ...product, quantity: cart.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const totalItems = detailedItems.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = detailedItems.reduce(
    (s, i) => s + i.price * i.quantity,
    0,
  );

  function handleCheckout() {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 5000);
  }
  return (
    <ProtectedRoute>
      {loading ? (
        <CartSkeleton />
      ) : cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-600">
                Shopping Bag
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                Your Cart
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {totalItems} {totalItems === 1 ? "item" : "items"} · $
                {totalPrice.toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => dispatch(clearCart())}
              className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Clear cart
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <ul className="space-y-3">
              {detailedItems.map((i) => (
                <li
                  key={i.id}
                  className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300"
                >
                  <Link
                    href={`/products/${i.id}`}
                    className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-zinc-50 ring-1 ring-zinc-100"
                  >
                    <Image
                      src={i.image}
                      alt={i.title}
                      fill
                      sizes="96px"
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link
                          href={`/products/${i.id}`}
                          className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900 transition-colors hover:text-orange-600"
                        >
                          {i.title}
                        </Link>
                        <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                          {i.category}
                        </p>
                      </div>

                      <button
                        onClick={() => dispatch(removeItem(i.id))}
                        className="shrink-0 rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove item"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      ${i.price.toFixed(2)} each
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50/50">
                        <button
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                id: i.id,
                                quantity: i.quantity - 1,
                              }),
                            )
                          }
                          disabled={i.quantity <= 1}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold tabular-nums">
                          {i.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              setQuantity({
                                id: i.id,
                                quantity: i.quantity + 1,
                              }),
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-600 transition-colors hover:bg-white hover:text-zinc-900"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Subtotal
                        </p>
                        <p className="text-base font-semibold tabular-nums text-zinc-900">
                          ${(i.price * i.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold tracking-tight">
                Order Summary
              </h2>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Subtotal</dt>
                  <dd className="font-medium tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-zinc-500">Shipping</dt>
                  <dd className="inline-flex items-center gap-1 font-medium text-green-600">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Free
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
                  <dt className="text-base font-semibold">Total</dt>
                  <dd className="text-xl font-semibold tracking-tight tabular-nums">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <button
                  onClick={handleCheckout}
                  className="w-full rounded-xl bg-zinc-900 py-3.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
                >
                  Proceed to Checkout
                </button>

                {showComingSoon && (
                  <p className="mt-3 rounded-lg bg-brand-soft px-3 py-2 text-center text-xs font-medium text-brand-ink">
                    Checkout coming soon — this is a demo.
                  </p>
                )}
              </div>

              <Link
                href="/products"
                className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900"
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                Continue shopping
              </Link>
            </aside>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}

function CartSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse px-4 py-12">
      <div className="h-8 w-48 rounded-lg bg-zinc-200" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4"
            >
              <div className="h-24 w-24 rounded-xl bg-zinc-100" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-zinc-100" />
                <div className="h-3 w-1/4 rounded bg-zinc-100" />
                <div className="h-3 w-1/3 rounded bg-zinc-100" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-64 rounded-2xl border border-zinc-100 bg-white" />
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-50 ring-1 ring-orange-200/50">
        <svg
          className="h-11 w-11 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold tracking-tight">
        Your cart is empty
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        Looks like you haven&apos;t added anything yet.
      </p>
      <Link
        href="/products"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-orange-600"
      >
        Browse products
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </Link>
    </div>
  );
}
