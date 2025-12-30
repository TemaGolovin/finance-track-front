import { DatePickerDrawerSingle, ToggleGroup } from '@/shared/ui';
import { format, subDays } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

const today = new Date();

interface QuickDatePickerProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export const QuickDatePicker: React.FC<QuickDatePickerProps> = ({ onSelectDate, selectedDate }) => {
  const commonT = useTranslations('common');

  const selectedId = useMemo(() => {
    const selectedDateFormat = format(selectedDate, 'dd.MM.yyyy');
    const todayFormat = format(today, 'dd.MM.yyyy');
    const yesterdayFormat = format(subDays(today, 1), 'dd.MM.yyyy');

    if (!selectedDate || selectedDateFormat === todayFormat) {
      return 'today';
    }

    if (selectedDateFormat === yesterdayFormat) {
      return 'yesterday';
    }

    return 'select-date';
  }, [selectedDate]);

  return (
    <div className="flex gap-2 text-sm">
      <ToggleGroup<'today' | 'yesterday' | 'select-date'>
        items={[
          {
            id: 'today',
            ariaLabel: commonT('today'),
            content: (
              <div className="text-center">
                <div>{commonT('today')}</div>
                <div>{format(today, 'dd.MM')}</div>
              </div>
            ),
          },
          {
            id: 'yesterday',
            ariaLabel: commonT('yesterday'),
            content: (
              <div>
                <div>{commonT('yesterday')}</div>
                <div>{format(subDays(today, 1), 'dd.MM')}</div>
              </div>
            ),
          },
          {
            id: 'select-date',
            ariaLabel: commonT('select'),
            content: (
              <DatePickerDrawerSingle
                trigger={
                  <div>
                    <div>
                      {selectedId === 'select-date' ? commonT('selected') : commonT('select')}
                    </div>
                    <div>{selectedId === 'select-date' ? format(selectedDate, 'dd.MM') : ''}</div>
                  </div>
                }
                selectedDate={selectedDate}
                onSelectDate={onSelectDate}
              />
            ),
          },
        ]}
        selectedId={selectedId}
        onClick={(id) => {
          if (id === 'select-date') {
            return;
          }

          if (id === 'today') {
            onSelectDate(today);
            return;
          }

          onSelectDate(subDays(today, 1));
        }}
      />
    </div>
  );
};
