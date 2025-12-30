import {
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  format,
  lastDayOfMonth,
  lastDayOfYear,
  subDays,
  subMonths,
  subYears,
} from 'date-fns';
import { DatesAndPeriod } from './types';
import { useMemo } from 'react';
import { ru } from 'date-fns/locale';
import { useLocale } from 'next-intl';

interface UseDatesRangeProps {
  selectedDatesAndPeriod: DatesAndPeriod;
  setSelectedDatesAndPeriod: (datesAndPeriod: DatesAndPeriod) => void;
}

const getLabelFromPeriodName = (
  period: DatesAndPeriod['period'],
  dates: DatesAndPeriod['dates'],
  locale: string,
) => {
  const startDate = dates.startDate || '';
  const endDate = dates.endDate || '';
  const dateFormatOptions = { locale: locale === 'ru' ? ru : undefined };

  switch (period) {
    case 'day':
      return `${format(startDate, 'dd LLLL yyyy', dateFormatOptions)}`;
    case 'week':
      return `${format(startDate, 'dd MMM', dateFormatOptions)} - ${format(endDate, 'dd MMM', dateFormatOptions)}`;
    case 'month':
      return (
        `${format(startDate, 'LLLL yyyy', dateFormatOptions)}`.slice(0, 1).toUpperCase() +
        `${format(startDate, 'LLLL yyyy', dateFormatOptions)}`.slice(1)
      );
    case 'year':
      return `${format(startDate, 'yyyy')}`;
    case 'custom':
      return `${format(startDate, 'dd MMM yyyy', dateFormatOptions)} - ${format(endDate, 'dd MMM yyyy', dateFormatOptions)}`;
    default:
      return '';
  }
};

export const useDateRange = ({
  selectedDatesAndPeriod,
  setSelectedDatesAndPeriod,
}: UseDatesRangeProps) => {
  const locale = useLocale();

  const label = useMemo(() => {
    return getLabelFromPeriodName(
      selectedDatesAndPeriod.period,
      selectedDatesAndPeriod.dates,
      locale,
    );
  }, [selectedDatesAndPeriod, locale]);

  const startDate = selectedDatesAndPeriod?.dates?.startDate || '';
  const endDate = selectedDatesAndPeriod?.dates?.endDate || '';

  const handlePrevDatesRange = () => {
    if (
      selectedDatesAndPeriod.period === 'custom' ||
      selectedDatesAndPeriod.period === 'day' ||
      selectedDatesAndPeriod.period === 'week'
    ) {
      const difference = differenceInDays(startDate, endDate);

      const newStartDate = subDays(startDate, -difference + 1);
      const newEndDate = subDays(endDate, -difference + 1);

      setSelectedDatesAndPeriod({
        period: selectedDatesAndPeriod?.period,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });

      return;
    }
    if (selectedDatesAndPeriod.period === 'month') {
      const newStartDate = subMonths(startDate, 1);
      const newEndDate = lastDayOfMonth(newStartDate);

      setSelectedDatesAndPeriod({
        period: selectedDatesAndPeriod?.period,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });

      return;
    }

    if (selectedDatesAndPeriod.period === 'year') {
      const newStartDate = subYears(startDate, 1);
      const newEndDate = lastDayOfYear(newStartDate);

      setSelectedDatesAndPeriod({
        period: selectedDatesAndPeriod?.period,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });
    }
  };

  const handleNextDatesRange = () => {
    if (
      selectedDatesAndPeriod.period === 'custom' ||
      selectedDatesAndPeriod.period === 'day' ||
      selectedDatesAndPeriod.period === 'week'
    ) {
      const difference = differenceInDays(endDate, startDate);

      const newStartDate = addDays(startDate, difference + 1);
      const newEndDate = addDays(endDate, difference + 1);

      setSelectedDatesAndPeriod({
        ...selectedDatesAndPeriod,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });

      return;
    }
    if (selectedDatesAndPeriod.period === 'month') {
      const newStartDate = addMonths(startDate, 1);
      const newEndDate = lastDayOfMonth(newStartDate);

      setSelectedDatesAndPeriod({
        period: selectedDatesAndPeriod?.period,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });

      return;
    }

    if (selectedDatesAndPeriod.period === 'year') {
      const newStartDate = addYears(startDate, 1);
      const newEndDate = lastDayOfYear(newStartDate);

      setSelectedDatesAndPeriod({
        period: selectedDatesAndPeriod?.period,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      });
    }
  };

  return {
    handlePrevDatesRange,
    handleNextDatesRange,
    label,
  };
};
