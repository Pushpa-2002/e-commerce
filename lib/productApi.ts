import { apiFetch } from "./api/api";
import { Product } from "./api/types";

export const fetchProducts = () => apiFetch<Product[]>("/products");

export const fetchProductById = (id: string | number) =>
  apiFetch<Product>(`/products/${id}`);

export const fetchCategories = () => apiFetch<string[]>("/products/categories");

export const createProduct = (payload: Partial<Product>) =>
  apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const updateProduct = (id: number, payload: Partial<Product>) =>
  apiFetch<Product>(`/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteProduct = (id: number) =>
  apiFetch<Product>(`/products/${id}`, { method: "DELETE" });

export const login = (username: string, password: string) =>
  apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
