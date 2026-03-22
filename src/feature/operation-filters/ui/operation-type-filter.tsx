import { Tabs } from '@/shared/ui';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface OperationTypeFilterProps {
  operationType: 'EXPENSE' | 'INCOME';
  setOperationType: (operationType: 'EXPENSE' | 'INCOME') => void;
}

export const OperationTypeFilter: React.FC<OperationTypeFilterProps> = ({
  operationType,
  setOperationType,
}) => {
  const commonT = useTranslations('common');

  return (
    <Tabs
      tabsInfo={[
        {
          id: 'EXPENSE',
          title: commonT('expenses'),
          icon: <BanknoteArrowDown className="text-destructive/80" />,
        },
        {
          id: 'INCOME',
          title: commonT('income'),
          icon: <BanknoteArrowUp className="text-success/80" />,
        },
      ]}
      selectedId={operationType}
      onSelect={setOperationType}
    />
  );
};
