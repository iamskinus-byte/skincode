import { NextResponse } from "next/server";
import { addProduct, listProducts } from "@/lib/store";
import { isRoutineStep, isTimeOfDay } from "@/lib/types";

export async function GET() {
  const products = await listProducts();
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const data = body as Record<string, unknown>;
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const brand = typeof data.brand === "string" ? data.brand.trim() : "";
  const { step, timeOfDay } = data;

  if (!name || !brand) {
    return NextResponse.json(
      { error: "Both 'name' and 'brand' are required." },
      { status: 400 },
    );
  }
  if (!isRoutineStep(step)) {
    return NextResponse.json(
      { error: "'step' is not a valid routine step." },
      { status: 400 },
    );
  }
  if (!isTimeOfDay(timeOfDay)) {
    return NextResponse.json(
      { error: "'timeOfDay' must be AM, PM, or Both." },
      { status: 400 },
    );
  }

  const product = await addProduct({ name, brand, step, timeOfDay });
  return NextResponse.json({ product }, { status: 201 });
}
