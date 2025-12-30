import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

export const getIsoDatesFromPeriod = (
  period: 'day' | 'week' | 'month' | 'year' | 'custom',
  dateFromCalcPeriod: Date = new Date(),
): { startDate: string; endDate: string } => {
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
      startDate: startOfWeek(dateFromCalcPeriod).toISOString(),
      endDate: endOfWeek(dateFromCalcPeriod).toISOString(),
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
