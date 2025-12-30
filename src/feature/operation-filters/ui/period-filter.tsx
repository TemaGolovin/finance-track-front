import { DatePickerDrawerRange, Tabs } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { DatesAndPeriod } from '../model/types';
import { getIsoDatesFromPeriod } from '../lib/get-iso-dates-from-period';

interface PeriodFilterProps {
  selectedDatesAndPeriod: DatesAndPeriod;
  setSelectedDatesAndPeriod: (datesAndPeriod: DatesAndPeriod) => void;
}

export const PeriodFilter: React.FC<PeriodFilterProps> = ({
  selectedDatesAndPeriod,
  setSelectedDatesAndPeriod,
}) => {
  const commonT = useTranslations('common');

  return (
    <Tabs
      tabsInfo={[
        { id: 'day', title: commonT('day') },
        { id: 'week', title: commonT('week') },
        { id: 'month', title: commonT('month') },
        { id: 'year', title: commonT('year') },
        {
          id: 'custom',
          title: (
            <DatePickerDrawerRange
              onSelectDate={(dates) =>
                setSelectedDatesAndPeriod({
                  period: 'custom',
                  dates: {
                    startDate: dates.from?.toISOString() || undefined,
                    endDate: dates.to?.toISOString() || undefined,
                  },
                })
              }
              selectedDate={{
                from: new Date(selectedDatesAndPeriod.dates?.startDate || ''),
                to: new Date(selectedDatesAndPeriod.dates?.endDate || ''),
              }}
              trigger={<div className="w-full h-full">{commonT('select')}</div>}
            />
          ),
        },
      ]}
      size="sm"
      selectedId={selectedDatesAndPeriod.period}
      onSelect={(newPeriod) => {
        if (newPeriod === 'custom') return;
        setSelectedDatesAndPeriod({
          period: newPeriod,
          dates: getIsoDatesFromPeriod(newPeriod),
        });
      }}
    />
  );
};
