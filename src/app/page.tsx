import { listProducts } from "@/lib/store";
import RoutineManager from "./routine-manager";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await listProducts();
  return (
    <div className="flex flex-1 flex-col items-center px-4 py-10 sm:py-16">
      <main className="w-full max-w-2xl">
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
            <span aria-hidden>✷</span> skincode
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Build your skincare routine
          </h1>
          <p className="mt-2 text-zinc-500">
            Track every product in your AM and PM routine, organized by step.
          </p>
        </header>
        <RoutineManager initialProducts={products} />
      </main>
    </div>
  );
}
