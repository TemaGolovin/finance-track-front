import { useEffect, useMemo } from 'react';
import { getIsoDatesFromPeriod } from '../lib/get-iso-dates-from-period';
import { DatesAndPeriod } from './types';
import { useRouter, useSearchParams } from 'next/navigation';

export const useTransactionsFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  useEffect(() => {
    const typeParams = currentParams.get('type') as 'EXPENSE' | 'INCOME';
    if (!typeParams) {
      currentParams.set('type', 'EXPENSE');
    }

    const periodParams = currentParams.get('period') as
      | 'day'
      | 'week'
      | 'month'
      | 'year'
      | 'custom';
    if (!periodParams) {
      currentParams.set('period', 'week');
      currentParams.set('startDate', getIsoDatesFromPeriod('week').startDate || '');
      currentParams.set('endDate', getIsoDatesFromPeriod('week').endDate || '');
    }

    router.push(`?${currentParams.toString()}`);
  }, [router, currentParams]);

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
    currentParams.get('startDate') || getIsoDatesFromPeriod(periodParam).startDate;
  const endDateParam = currentParams.get('endDate') || getIsoDatesFromPeriod(periodParam).endDate;

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
  };
};
