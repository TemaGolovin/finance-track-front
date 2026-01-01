'use client';
import { useTranslations } from 'next-intl';
import { Drawer } from '../drawer/drawer';
import { RangeCalendar } from '../calendar/range-calendar';
import { Button } from '../button/button';
import { useState } from 'react';

interface CalendarProps {
  trigger: React.ReactNode;
  selectedDate: { from: Date | undefined; to: Date | undefined };
  onSelectDate: (date: { from?: Date | undefined; to?: Date | undefined }) => void;
}

export const DatePickerDrawerRange: React.FC<CalendarProps> = ({
  trigger,
  selectedDate,
  onSelectDate,
}) => {
  const [selectedDatesInner, setSelectedDatesInner] = useState<{
    from?: Date | undefined;
    to?: Date | undefined;
  }>(selectedDate);

  const commonT = useTranslations('common');

  return (
    <Drawer
      title={commonT('selectDate')}
      trigger={trigger}
      renderContent={(onClose) => (
        <div>
          <div className="min-h-107">
            <RangeCalendar
              selectedDates={{ from: selectedDatesInner?.from, to: selectedDatesInner?.to }}
              onSelectDate={setSelectedDatesInner}
            />
          </div>
          <Button
            className="mt-4 w-full"
            variant={'primary'}
            onClick={() => {
              onSelectDate(selectedDatesInner);
              onClose();
            }}
          >
            {commonT('select')}
          </Button>
        </div>
      )}
    />
  );
};
