'use client';
import { OperationSimpleCard } from '@/entity/operation';
import { DateRangeNavigator } from '@/feature/date-range-navigator';
import { GroupSelector, useGroupSelector } from '@/feature/group-selector';
import {
  OperationTypeFilter,
  PeriodFilter,
  useTransactionsFilters,
} from '@/feature/operation-filters';
import { useGroupOperations, useGroups } from '@/shared/api/queries/groups';
import { useOperations } from '@/shared/api/queries/operations';
import { formatNumberWithRound } from '@/shared/lib';
import { ROUTES } from '@/shared/model/routes';
import { FixedPlusLinkButton, Skeleton } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const OperationList = () => {
  const commonT = useTranslations('common');

  const {
    operationType,
    setOperationType,
    selectedDatesAndPeriod,
    setSelectedDatesAndPeriod,
    categoryId,
  } = useTransactionsFilters();

  const { selectedGroupId } = useGroupSelector();
  const { data: groups } = useGroups();

  const { data: personalOperationsByDateWithTotalSum, isLoading: isLoadingPersonal } =
    useOperations({
      startDate: selectedDatesAndPeriod?.dates?.startDate,
      endDate: selectedDatesAndPeriod?.dates?.endDate,
      operationType,
      categoryId,
      enabled: !selectedGroupId,
    });

  const { data: groupOperationsByDateWithTotalSum, isLoading: isLoadingGroup } = useGroupOperations(
    {
      groupId: selectedGroupId ?? '',
      operationType,
      startDate: selectedDatesAndPeriod?.dates?.startDate,
      endDate: selectedDatesAndPeriod?.dates?.endDate,
      categoryId,
      enabled: !!selectedGroupId,
    },
  );

  const operationsByDateWithTotalSum = selectedGroupId
    ? groupOperationsByDateWithTotalSum
    : personalOperationsByDateWithTotalSum;

  const isLoadingOperations = selectedGroupId ? isLoadingGroup : isLoadingPersonal;

  const operationsByDate = operationsByDateWithTotalSum?.operationsByDate;
  const totalSum = operationsByDateWithTotalSum?.totalSum;

  const getUserName = (userId: string) => {
    if (!selectedGroupId) return undefined;

    const group = groups?.find((g) => g.id === selectedGroupId);
    if (!group) return undefined;

    const user = group.users?.find((u) => u.user.id === userId);
    return user?.user.name;
  };

  return (
    <div className="flex flex-col gap-2 mt-2 pb-4">
      <GroupSelector />
      <OperationTypeFilter operationType={operationType} setOperationType={setOperationType} />
      <PeriodFilter
        selectedDatesAndPeriod={selectedDatesAndPeriod}
        setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
      />
      <DateRangeNavigator
        selectedDatesAndPeriod={selectedDatesAndPeriod}
        setSelectedDatesAndPeriod={setSelectedDatesAndPeriod}
      />
      {!isLoadingOperations && totalSum ? (
        <div>
          <span className="text-foreground/60">{commonT('amount')}:</span>{' '}
          <span className="font-bold">{formatNumberWithRound(Number(totalSum))}</span>
        </div>
      ) : null}
      {isLoadingOperations
        ? ['sk-1', 'sk-2', 'sk-3', 'sk-4'].map((key) => (
            <Skeleton key={key} className="h-14 w-full rounded-md" />
          ))
        : null}
      {!isLoadingOperations
        ? operationsByDate?.map(({ operations, date }) => (
            <div key={date}>
              <div className="text-sm font-bold text-foreground/80">{date}</div>
              {operations.map((operation) => (
                <Link
                  key={operation.id}
                  href={ROUTES.OPERATION_DETAIL.replace(':id', operation.id)}
                >
                  <div className="mb-1">
                    <OperationSimpleCard
                      operation={operation}
                      showUser={!!selectedGroupId}
                      userName={selectedGroupId ? getUserName(operation.userId) : undefined}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ))
        : null}

      {!isLoadingOperations && operationsByDate?.length === 0 ? (
        <div className="text-xs flex justify-center h-10 items-center">
          {commonT('noDataForThisPeriod')}
        </div>
      ) : null}

      <FixedPlusLinkButton link={`${ROUTES.OPERATION_CREATE}?type=${operationType}`} />
    </div>
  );
};
