import { Calendar as CalendarShadcn } from '@/shared/lib/shadcn/calendar';
import { ComponentProps } from 'react';

interface CalendarProps extends Omit<ComponentProps<typeof CalendarShadcn>, 'required' | 'mode'> {
  selectedDates: { from: Date | undefined; to: Date | undefined };
  onSelectDate: ({ from, to }: { from?: Date | undefined; to?: Date | undefined }) => void;
}

export const RangeCalendar: React.FC<CalendarProps> = ({
  selectedDates,
  onSelectDate,
  ...props
}) => {
  return (
    <CalendarShadcn
      mode={'range'}
      required
      selected={selectedDates}
      className="rounded-lg border"
      onSelect={onSelectDate}
      {...props}
    />
  );
};
