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
  setSelectedDatesAndPeriod: React.Dispatch<React.SetStateAction<DatesAndPeriod>>;
}

const getLabelFromPeriodName = (
  period: DatesAndPeriod['period'],
  dates: DatesAndPeriod['dates'],
  locale: string,
) => {
  switch (period) {
    case 'day':
      return `${format(dates.startDate, 'dd LLLL yyyy', { locale: locale === 'ru' ? ru : undefined })}`;
    case 'week':
      return `${format(dates.startDate, 'dd.MM.yyyy')} - ${format(dates.endDate, 'dd.MM.yyyy')}`;
    case 'month':
      return (
        `${format(dates.startDate, 'LLLL yyyy', { locale: locale === 'ru' ? ru : undefined })}`
          .slice(0, 1)
          .toUpperCase() +
        `${format(dates.startDate, 'LLLL yyyy', { locale: locale === 'ru' ? ru : undefined })}`.slice(
          1,
        )
      );
    case 'year':
      return `${format(dates.startDate, 'yyyy')}`;
    case 'custom':
      return `${format(dates.startDate, 'dd.MM.yyyy')} - ${format(dates.endDate, 'dd.MM.yyyy')}`;
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

  const handlePrevDatesRange = () => {
    if (
      selectedDatesAndPeriod.period === 'custom' ||
      selectedDatesAndPeriod.period === 'day' ||
      selectedDatesAndPeriod.period === 'week'
    ) {
      const difference = differenceInDays(
        selectedDatesAndPeriod?.dates?.startDate,
        selectedDatesAndPeriod?.dates?.endDate,
      );

      const newStartDate = subDays(selectedDatesAndPeriod?.dates?.startDate, -difference + 1);
      const newEndDate = subDays(selectedDatesAndPeriod?.dates?.endDate, -difference + 1);

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
      const newStartDate = subMonths(selectedDatesAndPeriod?.dates?.startDate, 1);
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
      const newStartDate = subYears(selectedDatesAndPeriod?.dates?.startDate, 1);
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
      const difference = differenceInDays(
        selectedDatesAndPeriod?.dates?.endDate,
        selectedDatesAndPeriod?.dates?.startDate,
      );

      const newStartDate = addDays(selectedDatesAndPeriod?.dates?.startDate, difference + 1);
      const newEndDate = addDays(selectedDatesAndPeriod?.dates?.endDate, difference + 1);

      setSelectedDatesAndPeriod((prev) => ({
        ...prev,
        dates: {
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        },
      }));

      return;
    }
    if (selectedDatesAndPeriod.period === 'month') {
      const newStartDate = addMonths(selectedDatesAndPeriod?.dates?.startDate, 1);
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
      const newStartDate = addYears(selectedDatesAndPeriod?.dates?.startDate, 1);
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
