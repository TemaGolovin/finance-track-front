import { useTranslations } from 'next-intl';
import { Drawer } from '../drawer/drawer';
import { Calendar } from '../calendar/calendar';

interface CalendarProps {
  trigger: React.ReactNode;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export const DatePickerDrawerSingle: React.FC<CalendarProps> = ({
  trigger,
  selectedDate,
  onSelectDate,
}) => {
  const commonT = useTranslations('common');

  return (
    <Drawer
      title={commonT('selectDate')}
      trigger={trigger}
      renderContent={(onClose) => (
        <div className="min-h-107">
          <Calendar
            selectedDate={selectedDate}
            setDate={(newDate) => {
              onSelectDate(newDate);
              onClose();
            }}
          />
        </div>
      )}
    />
  );
};
