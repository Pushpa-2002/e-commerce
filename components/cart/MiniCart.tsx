"use client";

import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "@/lib/theme";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const STORAGE_KEY = "minicart:collapsed";

export default function MiniCart() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Read saved state once on mount
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true);
    } catch {}
    setHydrated(true);
  }, []);

  // Save only after the saved value has been read
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
    } catch {}
  }, [collapsed, hydrated]);

  const items: CartItem[] =
    useSelector((state: any) => state?.cart?.data) ?? [];

  const totalItems = items.reduce((sum, i) => sum + (i.quantity ?? 0), 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + (i.price ?? 0) * (i.quantity ?? 0),
    0,
  );
  if (!mounted) return null;
  if (pathname === "/cart") return null;
  if (totalItems === 0) return null;

  const orderedItems = [...items].reverse();

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <aside
        aria-label="Mini cart"
        className={`fixed right-0 top-24 z-30 hidden max-h-[calc(100vh-8rem)] w-80 flex-col overflow-hidden
          rounded-l-2xl border border-r-0 shadow-xl
          transition-transform duration-300 ease-out lg:flex
          ${theme.miniCart.panel}
          ${collapsed ? "translate-x-[calc(100%-48px)]" : "translate-x-0"}`}
      >
        {/* Header */}
        <div
          className={`flex shrink-0 items-center justify-between px-4 py-3 ${theme.miniCart.header}`}
        >
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand cart" : "Collapse cart"}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 ${theme.miniCart.headerToggle}`}
          >
            {collapsed ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <ShoppingCart className={`h-4 w-4 ${theme.miniCart.headerTitle}`} />
            <span
              className={`text-sm font-semibold ${theme.miniCart.headerTitle}`}
            >
              Your Cart
            </span>
          </div>

          <span
            className={`rounded-full px-2 py-0.5 text-xs font-bold ${theme.miniCart.headerBadge}`}
          >
            {totalItems}
          </span>
        </div>

        {/* Items */}
        <ul
          className={`mini-cart-scroll min-h-0 flex-1 divide-y overflow-y-auto ${theme.miniCart.list}`}
        >
          {orderedItems.map((item) => (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-200 ${theme.miniCart.row}`}
            >
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${theme.miniCart.itemName}`}
                  title={item.name}
                >
                  {item.name}
                </p>
                <p className={`mt-0.5 text-xs ${theme.miniCart.itemMeta}`}>
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <span
                className={`shrink-0 rounded-md px-2 py-1 text-xs font-bold ${theme.miniCart.qty}`}
              >
                ×{item.quantity}
              </span>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className={`shrink-0 border-t px-4 py-4 ${theme.miniCart.footer}`}>
          <div className="mb-3 flex items-center justify-between">
            <span
              className={`text-xs font-medium uppercase tracking-wider ${theme.miniCart.totalLabel}`}
            >
              Total
            </span>
            <span
              className={`text-xl font-extrabold tracking-tight ${theme.miniCart.totalValue}`}
            >
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <Link
            href="/cart"
            className={`block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] ${theme.miniCart.cta}`}
          >
            View Cart
          </Link>
        </div>
      </aside>

      <Link
        href="/cart"
        aria-label={`View cart, ${totalItems} items, $${totalPrice.toFixed(2)}`}
        className={`fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 lg:hidden ${theme.miniCart.fab}`}
      >
        <ShoppingCart className="h-5 w-5" />
        <span>{totalItems}</span>
        <span className={theme.miniCart.fabDot}>·</span>
        <span>${totalPrice.toFixed(2)}</span>
      </Link>
    </>
  );
}
