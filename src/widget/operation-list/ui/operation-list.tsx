'use client';
import { OperationSimpleCard } from '@/entity/operation';
import { DateRangeNavigator } from '@/feature/date-range-navigator';
import {
  OperationTypeFilter,
  PeriodFilter,
  useTransactionsFilters,
} from '@/feature/operation-filters';
import { useOperations } from '@/shared/api/queries/operations';
import { Button, formatNumberWithRound } from '@/shared/lib';
import { ROUTES } from '@/shared/model/routes';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const OperationList = () => {
  const commonT = useTranslations('common');

  const { operationType, setOperationType, selectedDatesAndPeriod, setSelectedDatesAndPeriod } =
    useTransactionsFilters();

  const { data: operationsByDateWithTotalSum } = useOperations({
    startDate: selectedDatesAndPeriod?.dates?.startDate,
    endDate: selectedDatesAndPeriod?.dates?.endDate,
    operationType,
  });

  const operationsByDate = operationsByDateWithTotalSum?.operationsByDate;

  const totalSum = operationsByDateWithTotalSum?.totalSum;

  return (
    <div className="flex flex-col gap-2 mt-2 pb-4">
      <OperationTypeFilter operationType={operationType} setOperationType={setOperationType} />
      <PeriodFilter
        selectedDatesAndPeriod={selectedDatesAndPeriod}
        setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
      />
      <DateRangeNavigator
        selectedDatesAndPeriod={selectedDatesAndPeriod}
        setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
      />
      {totalSum && (
        <div>
          <span className="text-foreground/60">{commonT('amount')}</span>:{' '}
          <span className="font-bold">{formatNumberWithRound(Number(totalSum))}</span>
        </div>
      )}
      {operationsByDate?.map(({ operations, date }) => (
        <div key={date}>
          <div className="text-sm font-bold text-foreground/80">{date}</div>
          {operations.map((operation) => (
            <OperationSimpleCard key={operation.id} operation={operation} />
          ))}
        </div>
      ))}

      {operationsByDate?.length === 0 && (
        <div className="text-xs flex justify-center h-10 items-center">
          {commonT('noDataForThisPeriod')}
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <Link href={`${ROUTES.OPERATION_CREATE}?type=${operationType}`}>
          <Button size={'icon'} variant={'primary'}>
            <PlusIcon />
          </Button>
        </Link>
      </div>
    </div>
  );
};
