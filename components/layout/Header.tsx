"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "@/lib/theme";
import { useEffect, useState } from "react";
import { logout } from "@/lib/redux/slices/authSlice";

const NAV_LINKS = [{ href: "/products", label: "Products" }];

export default function Header() {
  const pathname = usePathname();
  const cartData = useSelector((state: any) => state?.cart?.data) ?? [];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = cartData.reduce(
    (sum: number, i: any) => sum + (i?.quantity ?? 0),
    0,
  );

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: any) => state?.auth?.isAuthenticated,
  );
  const linkBase =
    "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200";
  if (!mounted) return null;
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md ${theme.header.bar}`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className={`group flex items-center gap-2 text-xl font-extrabold tracking-tight ${theme.header.logo}`}
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-base shadow-sm transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-110 ${theme.header.logoMark}`}
          >
            S
          </span>
          Shop
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${linkBase} ${
                  isActive(link.href)
                    ? theme.header.linkActive
                    : theme.header.link
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li>
            <Link
              href="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              aria-current={isActive("/cart") ? "page" : undefined}
              className={`${linkBase} ${
                isActive("/cart") ? theme.header.linkActive : theme.header.link
              }`}
            >
              <svg
                className="h-5 w-5"
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
              <span className="hidden sm:inline">Cart</span>

              {mounted && count > 0 && (
                <span
                  className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold leading-none ${theme.header.cartBadge}`}
                >
                  {count}
                </span>
              )}
            </Link>
          </li>
          <li>
            {mounted && isAuthenticated ? (
              <button
                onClick={() => dispatch(logout())}
                className={`${linkBase} ${theme.header.link}`}
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className={`${linkBase} ${theme.header.link}`}
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
