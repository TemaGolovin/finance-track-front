'use client';

import { BaseCard, Tabs } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { useCategoriesStat } from '../api/use-categories-stat';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/lib/shadcn/chart';
import { Label, Pie, PieChart } from 'recharts';
import { formatNumberWithRound } from '@/shared/lib';
import { useState } from 'react';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { DateRangeNavigator, DatesAndPeriod } from '@/feature/date-range-navigator';
import { getIsoDatesFromPeriod } from '../lib/get-iso-dates-from-period';

const randomHexColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const CategoriesStat = () => {
  const [operationType, setOperationType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');
  const [selectedDatesAndPeriod, setSelectedDatesAndPeriod] = useState<DatesAndPeriod>(() => ({
    period: 'week',
    dates: getIsoDatesFromPeriod('week'),
  }));

  const commonT = useTranslations('common');
  const mainPageT = useTranslations('main');

  const { data } = useCategoriesStat({
    operationType,
    startDate: selectedDatesAndPeriod?.dates?.startDate,
    endDate: selectedDatesAndPeriod?.dates?.endDate,
  });

  const chartConfig = data?.categories?.reduce((acc: ChartConfig, category) => {
    const newAcc = acc;
    return {
      ...newAcc,
      [category.id]: {
        id: category.id,
        label: category.name,
      },
    };
  }, {} as ChartConfig);

  return (
    <>
      <div className="my-2">
        <Tabs
          tabsInfo={[
            {
              id: 'EXPENSE',
              title: commonT('expenses'),
              icon: <BanknoteArrowDown />,
            },
            { id: 'INCOME', title: commonT('income'), icon: <BanknoteArrowUp /> },
          ]}
          selectedIdObserver={setOperationType}
        />
      </div>
      <div className="mb-2">
        <Tabs
          tabsInfo={[
            { id: 'day', title: commonT('day') },
            { id: 'week', title: commonT('week') },
            { id: 'month', title: commonT('month') },
            { id: 'year', title: commonT('year') },
            { id: 'custom', title: 'Период' },
          ]}
          size="sm"
          defaultValue="week"
          selectedIdObserver={(newPeriod) =>
            setSelectedDatesAndPeriod({
              period: newPeriod,
              dates: getIsoDatesFromPeriod(newPeriod),
            })
          }
        />
      </div>

      <BaseCard>
        <DateRangeNavigator
          selectedDatesAndPeriod={selectedDatesAndPeriod}
          setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
        />
        <div className="flex justify-center h-62.5">
          <ChartContainer config={chartConfig || {}} style={{ aspectRatio: 1, maxHeight: '250px' }}>
            {data?.categories && data.categories.length > 0 ? (
              <PieChart accessibilityLayer data={data?.categories}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  dataKey="proportion"
                  nameKey="name"
                  cornerRadius="20%"
                  data={data?.categories.map((category) => ({
                    ...category,
                    fill: randomHexColor(),
                  }))}
                  innerRadius={'80%'}
                  outerRadius={'100%'}
                  paddingAngle={1}
                  strokeWidth={2}
                >
                  <Label position={'center'} className="text-md font-bold text-lg">
                    {formatNumberWithRound(data?.totalSum || 0)}
                  </Label>
                </Pie>
              </PieChart>
            ) : (
              <div className="flex items-center justify-center h-full text-md text-center">
                {mainPageT('noDataForThisPeriod')}
              </div>
            )}
          </ChartContainer>
        </div>
      </BaseCard>
    </>
  );
};
