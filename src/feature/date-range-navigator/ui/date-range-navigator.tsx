import { Button } from '@/shared/ui';
import { DatesAndPeriod } from '../model/types';
import { ChevronLeftIcon } from 'lucide-react';
import { useDateRange } from '../model/use-date-range';

interface DateRangeNavigatorProps {
  selectedDatesAndPeriod: DatesAndPeriod;
  setSelectedDatesAndPeriod: (value: DatesAndPeriod) => void;
}

export const DateRangeNavigator: React.FC<DateRangeNavigatorProps> = ({
  selectedDatesAndPeriod,
  setSelectedDatesAndPeriod,
}) => {
  const { handleNextDatesRange, handlePrevDatesRange, label } = useDateRange({
    selectedDatesAndPeriod,
    setSelectedDatesAndPeriod,
  });

  return (
    <div className="flex justify-between items-center mb-1">
      <Button size="icon-sm" onClick={handlePrevDatesRange}>
        <ChevronLeftIcon />
      </Button>
      <h2 className="font-bold  text-center">{label}</h2>
      <Button size="icon-sm" onClick={handleNextDatesRange}>
        <ChevronLeftIcon className="rotate-180" />
      </Button>
    </div>
  );
};
