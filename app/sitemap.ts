import type { MetadataRoute } from "next";
import { fetchProducts } from "@/lib/productApi";

const BASE_URL = "https://e-commerce-gdxv.vercel.app";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    try {
        const products = await fetchProducts();

        const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
            url: `${BASE_URL}/products/${p.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        }));

        return [...staticRoutes, ...productRoutes];
    } catch (error) {
        return staticRoutes;
    }
}