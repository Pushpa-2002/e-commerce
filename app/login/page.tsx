"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/lib/redux/slices/authSlice";
import { apiFetch } from "@/lib/api/api";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const loginUser = (username: string, password: string) =>
        apiFetch<{ token: string }>("/auth/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
      const { token } = await loginUser(username, password);
      dispatch(login({ token: token, username: username }));
      router.push("/products");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4">
      <div className="rounded-2xl border border-line bg-surface p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Use the demo credentials to log in.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-medium text-ink-soft">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
              placeholder="mor_2314"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-ink-soft">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none"
              placeholder="83r5^_"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-hover disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 rounded-lg bg-brand-tint px-3 py-2 text-xs text-ink-soft">
          <p className="font-semibold text-ink">Demo credentials</p>
          <p className="mt-1">
            username: <code className="font-mono">mor_2314</code>
          </p>
          <p>
            password: <code className="font-mono">83r5^_</code>
          </p>
        </div>
      </div>
    </div>
  );
}
