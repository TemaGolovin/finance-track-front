'use client';

import { BaseCard } from '@/shared/ui';
import { useCategoriesStat } from '../api/use-categories-stat';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/lib/shadcn/chart';
import { Label, Pie, PieChart } from 'recharts';
import { Button, formatNumberWithRound } from '@/shared/lib';
import { ArrowLeftRightIcon, PlusIcon } from 'lucide-react';
import { DateRangeNavigator } from '@/feature/date-range-navigator';
import { iconCategoryFromBackendMap } from '@/shared/lib';
import Link from 'next/link';
import { ROUTES } from '@/shared/model/routes';
import {
  OperationTypeFilter,
  PeriodFilter,
  useTransactionsFilters,
} from '@/feature/operation-filters';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export const CategoriesStat = () => {
  const commonT = useTranslations('common');
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams);

  const { operationType, setOperationType, selectedDatesAndPeriod, setSelectedDatesAndPeriod } =
    useTransactionsFilters();

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
      <OperationTypeFilter operationType={operationType} setOperationType={setOperationType} />
      <PeriodFilter
        selectedDatesAndPeriod={selectedDatesAndPeriod}
        setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
      />

      <BaseCard>
        <DateRangeNavigator
          selectedDatesAndPeriod={selectedDatesAndPeriod}
          setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
        />
        <div className="flex justify-center h-62.5 relative">
          <ChartContainer config={chartConfig || {}} style={{ aspectRatio: 1, maxHeight: '250px' }}>
            {data?.categories && data.categories.length > 0 ? (
              <PieChart
                accessibilityLayer
                data={data?.categories.map((category) => ({
                  ...category,
                  sum: Number(category.sum),
                }))}
              >
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  dataKey="sum"
                  nameKey="name"
                  cornerRadius="20%"
                  data={data?.categories.map((category) => ({
                    ...category,
                    sum: Number(category.sum),
                    fill: category.color,
                  }))}
                  innerRadius={'80%'}
                  outerRadius={'100%'}
                  paddingAngle={1}
                  strokeWidth={2}
                >
                  <Label position={'center'} className="text-md font-bold text-lg">
                    {formatNumberWithRound(Number(data?.totalSum || 0) || 0)}
                  </Label>
                </Pie>
              </PieChart>
            ) : (
              <div className="flex items-center justify-center h-full text-md text-center">
                {commonT('noDataForThisPeriod')}
              </div>
            )}
          </ChartContainer>
          <Link href={`${ROUTES.OPERATION}?${urlParams.toString()}`}>
            <Button size={'icon'} className="absolute bottom-11 right-0" variant={'outline'}>
              <ArrowLeftRightIcon />
            </Button>
          </Link>
          <Link href={`${ROUTES.OPERATION_CREATE}?type=${operationType}`}>
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
              <div className="text-right">
                {formatNumberWithRound(Number(category.proportion))} %
              </div>
              <div className="text-right">{formatNumberWithRound(Number(category.sum))}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
