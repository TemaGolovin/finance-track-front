import { Drawer, ToggleGroup } from '@/shared/ui';
import { format, subDays } from 'date-fns';
import { useTranslations } from 'next-intl';

const today = new Date();

interface QuickDatePickerProps {
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export const QuickDatePicker: React.FC<QuickDatePickerProps> = ({ onSelectDate, selectedDate }) => {
  const commonT = useTranslations('common');
  const mainT = useTranslations('main');

  return (
    <div className="flex gap-2 text-sm">
      <ToggleGroup
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
              <div>
                <Drawer title={mainT('selectDateTitle')} trigger={<div>{commonT('select')}</div>}>
                  asd
                </Drawer>
              </div>
            ),
          },
        ]}
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
