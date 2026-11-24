import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { DEFAULT_WEEK_STARTS_ON, type WeekStartsOn } from './week-starts-on.ts';

export type PeriodType = 'day' | 'week' | 'month' | 'year' | 'custom';

export type GetIsoDatesFromPeriodOptions = {
  weekStartsOn?: WeekStartsOn;
};

export const getIsoDatesFromPeriod = (
  period: PeriodType,
  dateFromCalcPeriod: Date = new Date(),
  options?: GetIsoDatesFromPeriodOptions,
): { startDate: string; endDate: string } => {
  const weekStartsOn = options?.weekStartsOn ?? DEFAULT_WEEK_STARTS_ON;
  const weekOptions = { weekStartsOn };

  return {
    day: {
      startDate: new Date(
        dateFromCalcPeriod.getFullYear(),
        dateFromCalcPeriod.getMonth(),
        dateFromCalcPeriod.getDate(),
        0,
        0,
      ).toISOString(),
      endDate: new Date(
        dateFromCalcPeriod.getFullYear(),
        dateFromCalcPeriod.getMonth(),
        dateFromCalcPeriod.getDate(),
        23,
        59,
      ).toISOString(),
    },
    week: {
      startDate: startOfWeek(dateFromCalcPeriod, weekOptions).toISOString(),
      endDate: endOfWeek(dateFromCalcPeriod, weekOptions).toISOString(),
    },
    month: {
      startDate: startOfMonth(dateFromCalcPeriod).toISOString(),
      endDate: endOfMonth(dateFromCalcPeriod).toISOString(),
    },
    year: {
      startDate: startOfYear(dateFromCalcPeriod).toISOString(),
      endDate: endOfYear(dateFromCalcPeriod).toISOString(),
    },
    custom: {
      startDate: new Date(
        dateFromCalcPeriod.getFullYear(),
        dateFromCalcPeriod.getMonth(),
        dateFromCalcPeriod.getDate(),
        0,
        0,
      ).toISOString(),
      endDate: new Date(
        dateFromCalcPeriod.getFullYear(),
        dateFromCalcPeriod.getMonth(),
        dateFromCalcPeriod.getDate(),
        23,
        59,
      ).toISOString(),
    },
  }[period];
};