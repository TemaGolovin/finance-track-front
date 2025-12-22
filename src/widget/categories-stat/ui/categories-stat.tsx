'use client';

import { BaseCard } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useCategoriesStat } from '../api/use-categories-stat';

export const CategoriesStat = () => {
  const t = useTranslations('main');

  const { data } = useCategoriesStat();

  return (
    <div>
      <BaseCard title={t('expensesByCategory')}>
        {data?.categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <span>{category.sum}</span>
          </div>
        ))}
        {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <PieChart accessibilityLayer data={chartData}>
          <Pie dataKey="percent" nameKey="type" data={chartData} innerRadius={45} strokeWidth={5} />
        </PieChart>
      </ChartContainer> */}
      </BaseCard>
    </div>
  );
};
