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
import { GroupSelector, useGroupSelector } from '@/feature/group-selector';
import { useGroupStat } from '@/shared/api/queries/groups';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { NormalizedStatCategory } from '../model/types';

const GROUP_CATEGORY_COLORS = [
  '#6366f1',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#84cc16',
];

export const CategoriesStat = () => {
  const commonT = useTranslations('common');
  const searchParams = useSearchParams();

  const urlParams = new URLSearchParams(searchParams);

  const { operationType, setOperationType, selectedDatesAndPeriod, setSelectedDatesAndPeriod } =
    useTransactionsFilters();

  const { selectedGroupId } = useGroupSelector();

  const { data: personalData } = useCategoriesStat({
    operationType,
    startDate: selectedDatesAndPeriod?.dates?.startDate,
    endDate: selectedDatesAndPeriod?.dates?.endDate,
    enabled: !selectedGroupId,
  });

  const { data: groupData } = useGroupStat({
    groupId: selectedGroupId ?? '',
    operationType,
    startDate: selectedDatesAndPeriod?.dates?.startDate,
    endDate: selectedDatesAndPeriod?.dates?.endDate,
    enabled: !!selectedGroupId,
  });

  const categories: NormalizedStatCategory[] = selectedGroupId
    ? (groupData?.byCategories ?? []).map((cat, index) => ({
        id: cat.id,
        name: cat.name,
        sum: cat.totalAmount,
        proportion: cat.proportion,
        color: GROUP_CATEGORY_COLORS[index % GROUP_CATEGORY_COLORS.length],
      }))
    : (personalData?.categories ?? []).map((cat) => ({
        id: cat.id,
        name: cat.name,
        sum: cat.sum,
        proportion: cat.proportion,
        color: cat.color,
        icon: cat.icon,
      }));

  const totalSum = selectedGroupId ? groupData?.totalSum : personalData?.totalSum;

  const chartConfig = categories.reduce((acc: ChartConfig, category) => {
    acc[category.id] = { label: category.name };
    return acc;
  }, {} as ChartConfig);

  return (
    <div className="flex flex-col gap-2 mt-2 pb-4">
      <GroupSelector />
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
          <ChartContainer config={chartConfig} style={{ aspectRatio: 1, maxHeight: '250px' }}>
            {categories.length > 0 ? (
              <PieChart
                accessibilityLayer
                data={categories.map((category) => ({
                  ...category,
                  sum: Number(category.sum),
                }))}
              >
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                  dataKey="sum"
                  nameKey="name"
                  cornerRadius="20%"
                  data={categories.map((category) => ({
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
                    {formatNumberWithRound(Number(totalSum || 0))}
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
      {categories.length > 0 && (
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 text-sm">
          {categories.map((category) => (
            <Link
              href={`${ROUTES.OPERATION}?${urlParams.toString()}&categoryId=${category.id}`}
              className="grid grid-cols-subgrid col-span-full items-center px-2 rounded-lg bg-foreground/5 border border-foreground/10 py-1"
              key={category.id}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon && iconCategoryFromBackendMap?.[category.icon]}
                </div>
                <div>{category.name}</div>
              </div>
              <div className="text-right">
                {formatNumberWithRound(Number(category.proportion))} %
              </div>
              <div className="text-right">{formatNumberWithRound(Number(category.sum))}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
