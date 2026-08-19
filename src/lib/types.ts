export const ROUTINE_STEPS = [
  "Cleanser",
  "Toner",
  "Serum",
  "Moisturizer",
  "Sunscreen",
  "Exfoliant",
  "Mask",
  "Eye Cream",
] as const;

export type RoutineStep = (typeof ROUTINE_STEPS)[number];

export const TIMES_OF_DAY = ["AM", "PM", "Both"] as const;

export type TimeOfDay = (typeof TIMES_OF_DAY)[number];

export interface SkincareProduct {
  id: string;
  name: string;
  brand: string;
  step: RoutineStep;
  timeOfDay: TimeOfDay;
  createdAt: string;
}

export type NewSkincareProduct = Omit<SkincareProduct, "id" | "createdAt">;

export function isRoutineStep(value: unknown): value is RoutineStep {
  return (
    typeof value === "string" &&
    (ROUTINE_STEPS as readonly string[]).includes(value)
  );
}

export function isTimeOfDay(value: unknown): value is TimeOfDay {
  return (
    typeof value === "string" &&
    (TIMES_OF_DAY as readonly string[]).includes(value)
  );
}
