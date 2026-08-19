"use client";

import { useMemo, useState } from "react";
import {
  ROUTINE_STEPS,
  TIMES_OF_DAY,
  type RoutineStep,
  type SkincareProduct,
  type TimeOfDay,
} from "@/lib/types";

const TIME_BADGE: Record<TimeOfDay, string> = {
  AM: "bg-amber-100 text-amber-800",
  PM: "bg-indigo-100 text-indigo-800",
  Both: "bg-emerald-100 text-emerald-800",
};

export default function RoutineManager({
  initialProducts,
}: {
  initialProducts: SkincareProduct[];
}) {
  const [products, setProducts] = useState<SkincareProduct[]>(initialProducts);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [step, setStep] = useState<RoutineStep>(ROUTINE_STEPS[0]);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("AM");

  async function refresh() {
    const res = await fetch("/api/products");
    if (!res.ok) throw new Error("Failed to load routine.");
    const data = await res.json();
    setProducts(data.products ?? []);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, brand, step, timeOfDay }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Failed to add product.");
      }
      setName("");
      setBrand("");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove product.");
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error.");
    }
  }

  const grouped = useMemo(() => {
    return ROUTINE_STEPS.map((s) => ({
      step: s,
      items: products.filter((p) => p.step === s),
    })).filter((group) => group.items.length > 0);
  }, [products]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-3 rounded-2xl border border-rose-100 bg-white/70 p-5 shadow-sm sm:grid-cols-2"
      >
        <label className="flex flex-col gap-1 text-sm font-medium">
          Product name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Hydrating Serum"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Brand
          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            placeholder="The Ordinary"
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Step
          <select
            value={step}
            onChange={(e) => setStep(e.target.value as RoutineStep)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          >
            {ROUTINE_STEPS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Time of day
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
            className="rounded-lg border border-zinc-200 bg-white px-3 py-2 font-normal outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
          >
            {TIMES_OF_DAY.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="sm:col-span-2 mt-1 rounded-lg bg-rose-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-rose-600 disabled:opacity-60"
        >
          {submitting ? "Adding…" : "Add to routine"}
        </button>
      </form>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {grouped.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center text-zinc-400">
          No products yet. Add your first one above.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {grouped.map((group) => (
            <section key={group.step}>
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                {group.step}
              </h2>
              <ul className="flex flex-col gap-2">
                {group.items.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-zinc-500">{product.brand}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${TIME_BADGE[product.timeOfDay]}`}
                      >
                        {product.timeOfDay}
                      </span>
                      <button
                        onClick={() => handleDelete(product.id)}
                        aria-label={`Remove ${product.name}`}
                        className="rounded-md px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
