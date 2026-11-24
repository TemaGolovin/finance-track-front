import { useEffect, useMemo, useRef } from 'react';
import { getIsoDatesFromPeriod } from '@/shared/lib/date/get-iso-dates-from-period';
import { useWeekStartsOn } from '@/shared/lib/date/use-week-starts-on';
import { DatesAndPeriod } from './types';
import { useRouter, useSearchParams } from 'next/navigation';

export const useTransactionsFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const weekStartsOn = useWeekStartsOn();
  const weekStartsOnRef = useRef(weekStartsOn);

  const currentParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const periodOptions = useMemo(() => ({ weekStartsOn }), [weekStartsOn]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);
    let changed = false;

    if (!nextParams.get('type')) {
      nextParams.set('type', 'EXPENSE');
      changed = true;
    }

    if (!nextParams.get('period')) {
      nextParams.set('period', 'week');
      const weekDates = getIsoDatesFromPeriod('week', new Date(), periodOptions);
      nextParams.set('startDate', weekDates.startDate);
      nextParams.set('endDate', weekDates.endDate);
      changed = true;
    }

    if (changed) {
      router.push(`?${nextParams.toString()}`);
    }
  }, [router, searchParams, periodOptions]);

  useEffect(() => {
    if (weekStartsOnRef.current === weekStartsOn) {
      return;
    }
    weekStartsOnRef.current = weekStartsOn;

    const period = currentParams.get('period');
    if (period !== 'week') {
      return;
    }

    const dates = getIsoDatesFromPeriod('week', new Date(), periodOptions);
    const nextParams = new URLSearchParams(currentParams);
    nextParams.set('startDate', dates.startDate);
    nextParams.set('endDate', dates.endDate);
    router.replace(`?${nextParams.toString()}`);
  }, [weekStartsOn, currentParams, router, periodOptions]);

  const updateOperationType = (newOperationType: 'EXPENSE' | 'INCOME') => {
    currentParams.set('type', newOperationType);
    router.push(`?${currentParams.toString()}`);
  };

  const updateDatesAndPeriod = (newDatesAndPeriod: DatesAndPeriod) => {
    currentParams.set('period', newDatesAndPeriod.period);
    currentParams.set('startDate', newDatesAndPeriod.dates.startDate || '');
    currentParams.set('endDate', newDatesAndPeriod.dates.endDate || '');
    router.push(`?${currentParams.toString()}`);
  };

  const operationType = (currentParams.get('type') as 'EXPENSE' | 'INCOME') || 'EXPENSE';

  const periodParam =
    (currentParams.get('period') as 'day' | 'week' | 'month' | 'year' | 'custom') || 'week';
  const startDateParam =
    currentParams.get('startDate') ||
    getIsoDatesFromPeriod(periodParam, new Date(), periodOptions).startDate;
  const endDateParam =
    currentParams.get('endDate') ||
    getIsoDatesFromPeriod(periodParam, new Date(), periodOptions).endDate;

  return {
    operationType,
    setOperationType: updateOperationType,
    selectedDatesAndPeriod: {
      period: periodParam,
      dates: {
        startDate: startDateParam,
        endDate: endDateParam,
      },
    },
    setSelectedDatesAndPeriod: updateDatesAndPeriod,
    categoryId: currentParams.get('categoryId') || undefined,
    weekStartsOn,
  };
};