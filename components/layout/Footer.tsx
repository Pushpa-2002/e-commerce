"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { theme } from "@/lib/theme";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/products", label: "Products" },
  { href: "/cart", label: "Cart" },
];

export default function Footer() {
  const items: any[] = useSelector((state: any) => state?.cart?.data) ?? [];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const totalItems = items.reduce((s, i) => s + (i.quantity ?? 0), 0);
  const totalPrice = items.reduce(
    (s, i) => s + (i.price ?? 0) * (i.quantity ?? 0),
    0,
  );

  return (
    <footer className={`mt-16 border-t ${theme.footer.surface}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 text-sm">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3
              className={`flex items-center gap-2 text-lg font-extrabold ${theme.footer.brand}`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${theme.header.logoMark}`}
              >
                S
              </span>
              Shop
            </h3>
            <p className={`mt-3 max-w-xs leading-relaxed ${theme.footer.text}`}>
              Demo E-Commerce Shop. Quality products, simple shopping.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.footer.heading}`}
            >
              Links
            </h3>
            <ul className="mt-3 space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`transition-colors duration-200 ${theme.footer.link}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.footer.heading}`}
            >
              Contact
            </h3>
            <p className="mt-3">
              <a
                href="mailto:hello@example.com"
                className={`transition-colors duration-200 ${theme.footer.link}`}
              >
                hello@example.com
              </a>
            </p>
          </div>

          {/* Cart summary */}
          <div>
            <h3
              className={`text-xs font-bold uppercase tracking-wider ${theme.footer.heading}`}
            >
              Your cart
            </h3>
            <Link
              href="/cart"
              className={`mt-3 block rounded-xl border p-4 transition-colors duration-200 hover:border-violet-600! ${theme.footer.totalsCard}`}
            >
              {mounted && totalItems > 0 ? (
                <>
                  <p className="text-xs">
                    {totalItems} item{totalItems === 1 ? "" : "s"}
                  </p>
                  <p
                    className={`mt-1 text-xl font-extrabold tracking-tight ${theme.footer.totalsValue}`}
                  >
                    ${totalPrice.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-xs">No items in cart</p>
              )}
            </Link>
          </div>
        </div>

        <p
          className={`mt-10 border-t pt-6 text-center text-xs ${theme.footer.divider} ${theme.footer.copyright}`}
        >
          © {new Date().getFullYear()} Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
