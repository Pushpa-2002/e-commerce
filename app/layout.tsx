import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/lib/redux/store/StoreProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MiniCart from "@/components/cart/MiniCart";

export const metadata: Metadata = {
  title: { default: "Shop", template: "%s | Shop" },
  description: "E-commerce store built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-canvas! text-ink antialiased">
        <ReduxProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <MiniCart />
        </ReduxProvider>
      </body>
    </html>
  );
}
