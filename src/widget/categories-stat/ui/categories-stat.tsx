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
import { Button, formatNumberWithRound } from '@/shared/lib';
import { useState } from 'react';
import { BanknoteArrowDown, BanknoteArrowUp, PlusIcon } from 'lucide-react';
import { DateRangeNavigator, DatesAndPeriod } from '@/feature/date-range-navigator';
import { getIsoDatesFromPeriod } from '../lib/get-iso-dates-from-period';
import { iconCategoryFromBackendMap } from '@/shared/lib';
import Link from 'next/link';
import { ROUTES } from '@/shared/model/routes';

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
    <div className="flex flex-col gap-2 mt-2 pb-4">
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

      <BaseCard>
        <DateRangeNavigator
          selectedDatesAndPeriod={selectedDatesAndPeriod}
          setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
        />
        <div className="flex justify-center h-62.5 relative">
          <ChartContainer config={chartConfig || {}} style={{ aspectRatio: 1, maxHeight: '250px' }}>
            {data?.categories && data.categories.length > 0 ? (
              <PieChart accessibilityLayer data={data?.categories}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  dataKey="sum"
                  nameKey="name"
                  cornerRadius="20%"
                  data={data?.categories.map((category) => ({
                    ...category,
                    fill: category.color,
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
          <Link href={ROUTES.OPERATION_CREATE}>
            <Button size={'icon'} className="absolute bottom-0 right-0" variant={'primary'}>
              <PlusIcon />
            </Button>
          </Link>
        </div>
      </BaseCard>
      {data?.categories && data.categories.length > 0 && (
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 text-sm">
          {data.categories.map((category) => (
            <div
              className="grid grid-cols-subgrid col-span-full items-center px-2 rounded-lg bg-foreground/5 border border-foreground/10 py-1"
              key={category.id}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  {iconCategoryFromBackendMap?.[category.icon]}
                </div>
                <div>{category.name}</div>
              </div>
              <div className="text-right">{formatNumberWithRound(category.proportion)} %</div>
              <div className="text-right">{formatNumberWithRound(category.sum)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
