'use client';

import { CategorySelector } from '@/feature/category-selector';
import { QuickDatePicker } from '@/feature/quick-date-picker';
import { useAboutMe } from '@/shared/api/queries/auth';
import {
  useOperationCreate,
  useOperationDetail,
  useOperationEdit,
} from '@/shared/api/queries/operations';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { createOperationSchema, OperationType } from '../model/schema';
import { mapCrateOperationFormToApi } from '../model/mapping';
import { useEffect, useMemo } from 'react';
import { OperationTypeFilter } from '@/feature/operation-filters/ui/operation-type-filter';

interface OperationFormProps {
  editedId?: string;
}

export const OperationForm: React.FC<OperationFormProps> = ({ editedId }) => {
  const commonT = useTranslations('common');
  const errorsT = useTranslations('errors');
  const operationsT = useTranslations('operation');

  const searchParams = useSearchParams();
  const currentParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<OperationType>({
    resolver: zodResolver(
      createOperationSchema({
        sum: {
          required: errorsT('requiredField'),
          greaterThanZero: errorsT('greaterThanZero'),
        },
        categoryId: errorsT('requiredForSelect'),
      }),
    ),
    defaultValues: {
      date: new Date(),
      type: (currentParams.get('type') as 'INCOME' | 'EXPENSE') || 'EXPENSE',
    },
  });

  const categoryType = useWatch({ control, name: 'type' });

  const { mutateAsync: createOperation } = useOperationCreate();
  const { mutateAsync: editOperation } = useOperationEdit();

  const { data: editedOperation, isLoading: isLoadingOperation } = useOperationDetail(
    editedId || '',
    {
      enabled: !!editedId,
    },
  );
  const { data: me, isLoading: isLoadingMe } = useAboutMe();

  useEffect(() => {
    if (!editedId || !editedOperation || !me?.data?.id) return;
    if (editedOperation.userId !== me.data.id) {
      router.replace(ROUTES.OPERATION_DETAIL.replace(':id', editedId));
    }
  }, [editedId, editedOperation, me?.data?.id, router]);

  useEffect(() => {
    if (editedOperation) {
      reset({
        date: new Date(editedOperation.operationDate),
        sum: editedOperation.value.toString(),
        categoryId: editedOperation.categoryId,
        comment: editedOperation.comment,
        type: editedOperation.type,
      });
    }
  }, [editedOperation, reset]);

  const isResolvingEditOwnership =
    Boolean(editedId) && (isLoadingOperation || isLoadingMe);
  const currentUserId = me?.data?.id;
  const isEditingForbidden =
    Boolean(editedId) &&
    editedOperation !== undefined &&
    currentUserId !== undefined &&
    editedOperation.userId !== currentUserId;

  if (isResolvingEditOwnership || isEditingForbidden) {
    return null;
  }

  const onSubmit = async (data: OperationType) => {
    const dataForApi = mapCrateOperationFormToApi(data);
    if (editedId) {
      await toast.promise(editOperation({ id: editedId, data: dataForApi }), {
        loading: operationsT('loading'),
        success: operationsT('success'),
        error: (data) => data?.message || operationsT('error'),
      });
      router.push(ROUTES.OPERATION_DETAIL.replace(':id', editedId));
      return;
    }

    await toast.promise(createOperation(dataForApi), {
      loading: operationsT('loading'),
      success: operationsT('success'),
      error: (data) => data?.message || operationsT('error'),
    });
    router.push(ROUTES.MAIN);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-3">
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange } }) => (
            <OperationTypeFilter operationType={categoryType} setOperationType={onChange} />
          )}
        />
      </div>
      <div className="mb-1">
        <Input
          autoFocus
          placeholder={`${commonT('amount')}*`}
          inputSize="lg"
          isInputModeDecimal
          error={errors?.sum?.message}
          {...register('sum')}
        />
      </div>
      <div className="mb-1">
        <Controller
          control={control}
          name="categoryId"
          render={({ field: { onChange, value: categoryId } }) => (
            <CategorySelector
              type={categoryType}
              setSelectedCategoryId={onChange}
              selectedCategoryId={categoryId}
              error={errors?.categoryId?.message}
            />
          )}
        />
      </div>
      <div className="bg-muted rounded-lg p-1 mb-3">
        <Controller
          control={control}
          name="date"
          render={({ field: { onChange, value: date } }) => (
            <QuickDatePicker onSelectDate={onChange} selectedDate={date} />
          )}
        />
      </div>

      <Input placeholder={commonT('comment')} inputSize="lg" {...register('comment')} />

      <div className="fixed bottom-4 left-4 right-4">
        <Button variant={'primary'} className="w-full" size={'lg'} type="submit">
          {commonT('save')}
        </Button>
      </div>
    </form>
  );
};
