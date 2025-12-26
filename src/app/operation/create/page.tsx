'use client';

import { QuickDatePicker } from '@/feature/quick-date-picker';
import { Input, Tabs } from '@/shared/ui';
import { CategorySelector } from '@/widget/category-selector';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default () => {
  const [categoryId, setCategoryId] = useState<string>();
  const [categoryType, setCategoryType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

  const commonT = useTranslations('common');

  return (
    <div className="p-4">
      <div className="mb-3">
        <Tabs
          tabsInfo={[
            {
              id: 'EXPENSE',
              title: commonT('expenses'),
              icon: <BanknoteArrowDown />,
            },
            { id: 'INCOME', title: commonT('income'), icon: <BanknoteArrowUp /> },
          ]}
          selectedIdObserver={setCategoryType}
        />
      </div>
      <Input placeholder="Сумма*" inputSize="lg" isInputModeDecimal />
      <div className="mb-3">
        <CategorySelector
          type={categoryType}
          setSelectedCategoryId={setCategoryId}
          selectedCategoryId={categoryId}
        />
      </div>
      <div className="bg-muted rounded-lg p-1">
        <QuickDatePicker onSelectDate={() => {}} selectedDate={new Date()} />
      </div>
    </div>
  );
};
