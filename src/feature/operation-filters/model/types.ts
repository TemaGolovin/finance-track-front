export interface DatesAndPeriod {
  period: 'day' | 'week' | 'month' | 'year' | 'custom';
  dates: { startDate?: string; endDate?: string };
}
