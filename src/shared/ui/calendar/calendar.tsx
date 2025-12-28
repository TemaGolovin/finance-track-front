import { Calendar as CalendarShadcn } from '@/shared/lib/shadcn/calendar';

interface CalendarProps {
  selectedDate: Date | undefined;
  setDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ selectedDate, setDate }) => {
  return (
    <CalendarShadcn
      mode="single"
      required
      selected={selectedDate}
      onSelect={setDate}
      className="rounded-lg border"
    />
  );
};
