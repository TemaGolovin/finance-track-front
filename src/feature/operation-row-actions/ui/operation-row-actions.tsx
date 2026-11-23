'use client';

import { useAboutMe } from '@/shared/api/queries/auth';
import { Operation, useOperationDelete } from '@/shared/api/queries/operations';
import { formatNumberWithRound } from '@/shared/lib';
import { ROUTES } from '@/shared/model/routes';
import { LongPressAction, LongPressActions } from '@/shared/ui';
import { Pencil, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FC, ReactNode, useMemo } from 'react';
import { toast } from 'sonner';

interface OperationRowActionsProps {
  operation: Operation;
  className?: string;
  children: ReactNode;
}

export const OperationRowActions: FC<OperationRowActionsProps> = ({
  operation,
  className,
  children,
}) => {
  const commonT = useTranslations('common');
  const operationT = useTranslations('operation');
  const router = useRouter();
  const { data: me } = useAboutMe();
  const { mutateAsync: deleteOperation } = useOperationDelete();

  const canMutate = me?.data?.id !== undefined && operation.userId === me.data.id;

  const actions = useMemo<LongPressAction[]>(() => {
    if (!canMutate) return [];

    return [
      {
        id: 'edit',
        label: commonT('edit'),
        icon: <Pencil className="w-5 h-5" />,
        onSelect: () => {
          router.push(ROUTES.OPERATION_EDIT.replace(':id', operation.id));
        },
      },
      {
        id: 'delete',
        label: commonT('delete'),
        icon: <Trash className="w-5 h-5" />,
        destructive: true,
        confirm: {
          title: operationT('deletingOperation'),
          description: operationT('confirmDelete'),
          confirmLabel: commonT('delete'),
        },
        onSelect: () =>
          toast
            .promise(deleteOperation(operation.id), {
              loading: operationT('deleteOperationLoading'),
              success: operationT('deleteOperationSuccess'),
              error: (data) => data?.message || operationT('deleteOperationError'),
            })
            .unwrap(),
      },
    ];
  }, [canMutate, commonT, deleteOperation, operation.id, operationT, router]);

  return (
    <LongPressActions
      className={className}
      title={operation.category.name}
      description={formatNumberWithRound(operation.value)}
      actions={actions}
    >
      {children}
    </LongPressActions>
  );
};
