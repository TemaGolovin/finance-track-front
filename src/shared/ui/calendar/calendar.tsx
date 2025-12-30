import { Calendar as CalendarShadcn } from '@/shared/lib/shadcn/calendar';
import { ComponentProps } from 'react';

interface CalendarProps extends Omit<ComponentProps<typeof CalendarShadcn>, 'required' | 'mode'> {
  selectedDate: Date | undefined;
  setDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, setDate, ...props }) => {
  return (
    <CalendarShadcn
      mode={'single'}
      required
      selected={selectedDate}
      onSelect={setDate}
      className="rounded-lg border"
      {...props}
    />
  );
};
