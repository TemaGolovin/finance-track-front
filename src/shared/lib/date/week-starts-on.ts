export const DEFAULT_WEEK_STARTS_ON = 1 as const;

export type WeekStartsOn = 0 | 1;

export function isWeekStartsOn(value: number): value is WeekStartsOn {
  return value === 0 || value === 1;
}