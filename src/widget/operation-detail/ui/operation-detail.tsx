'use client';

import { OperationDelete } from '@/feature/operation-delete';
import { useOperationDetail } from '@/shared/api/queries/operations';
import { iconCategoryFromBackendMap } from '@/shared/lib';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { format } from 'date-fns';
import { ArrowLeft, Pencil } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export const OperationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const commonT = useTranslations('common');
  const operationT = useTranslations('operation');

  const { data: operation } = useOperationDetail(id);

  return (
    <div className="flex flex-col gap-3">
      <div className="font-bold flex items-center gap-3 bg-secondary text-secondary-foreground/80 p-2 -mx-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-secondary-foreground"
          onClick={router.back}
        >
          <ArrowLeft />
        </Button>
        <div>{operationT('operationDetail')}</div>
      </div>
      <div className="bg-card rounded-md p-2">
        <div className="text-foreground/60 mb-1 text-sm">{commonT('category')}</div>
        <div className="flex items-center gap-2">
          {operation?.category?.icon && (
            <div
              className="rounded-full w-10 h-10 flex justify-center items-center"
              style={{ background: operation?.category?.color }}
            >
              {iconCategoryFromBackendMap[operation.category.icon]}
            </div>
          )}
          <div className="font-semibold text-foreground/80">{operation?.category.name}</div>
        </div>
      </div>
      <div className="bg-card rounded-md p-2">
        <div className="text-foreground/60 mb-1 text-sm">{commonT('sum')}</div>
        <div className="text-lg font-semibold text-foreground/80">{operation?.value}</div>
      </div>
      <div className="bg-card rounded-md p-2">
        <div className="text-foreground/60 mb-1 text-sm">{commonT('date')}</div>
        <div className="text-lg font-semibold text-foreground/80">
          {operation?.operationDate && format(operation?.operationDate, 'dd.MM.yyyy')}
        </div>
      </div>

      {operation?.comment && (
        <div className="bg-card rounded-md p-2">
          <div className="text-foreground/60 mb-1 text-sm">{commonT('comment')}</div>
          <div className="font-semibold text-foreground/80 text-sm">{operation?.comment}</div>
        </div>
      )}

      <div className="flex gap-3 mt-3">
        <Link href={ROUTES.OPERATION_EDIT.replace(':id', id)} className="flex-1">
          <Button variant={'outline'} size={'default'} className="w-full">
            <Pencil className="w-5" />
            {commonT('edit')}
          </Button>
        </Link>
        <OperationDelete id={id} />
      </div>
    </div>
  );
};
