import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { NewSkincareProduct, SkincareProduct } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "routine.json");

const SEED: SkincareProduct[] = [
  {
    id: "seed-cleanser",
    name: "Gentle Foaming Cleanser",
    brand: "CeraVe",
    step: "Cleanser",
    timeOfDay: "Both",
    createdAt: "2026-01-01T08:00:00.000Z",
  },
  {
    id: "seed-sunscreen",
    name: "Unseen Sunscreen SPF 40",
    brand: "Supergoop!",
    step: "Sunscreen",
    timeOfDay: "AM",
    createdAt: "2026-01-01T08:05:00.000Z",
  },
];

// Serialize writes so concurrent requests don't clobber the JSON file.
let writeChain: Promise<void> = Promise.resolve();

async function ensureFile(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    await readFile(DATA_FILE, "utf8");
  } catch {
    await writeFile(DATA_FILE, JSON.stringify(SEED, null, 2), "utf8");
  }
}

async function readAll(): Promise<SkincareProduct[]> {
  await ensureFile();
  const raw = await readFile(DATA_FILE, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SkincareProduct[]) : [];
  } catch {
    return [];
  }
}

async function persist(products: SkincareProduct[]): Promise<void> {
  writeChain = writeChain.then(() =>
    writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf8"),
  );
  await writeChain;
}

export async function listProducts(): Promise<SkincareProduct[]> {
  const products = await readAll();
  return [...products].sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function addProduct(
  input: NewSkincareProduct,
): Promise<SkincareProduct> {
  const products = await readAll();
  const product: SkincareProduct = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  products.push(product);
  await persist(products);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await readAll();
  const next = products.filter((p) => p.id !== id);
  if (next.length === products.length) {
    return false;
  }
  await persist(next);
  return true;
}
