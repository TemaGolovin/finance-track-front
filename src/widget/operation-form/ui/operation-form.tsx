'use client';

import { CategorySelector } from '@/feature/category-selector';
import { QuickDatePicker } from '@/feature/quick-date-picker';
import {
  useOperationCreate,
  useOperationDetail,
  useOperationEdit,
} from '@/shared/api/queries/operations';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input, Tabs } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { createOperationSchema, OperationType } from '../model/schema';
import { mapCrateOperationFormToApi } from '../model/mapping';
import { useEffect, useMemo } from 'react';

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
    setValue,
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

  const { data: editedOperation } = useOperationDetail(editedId || '', {
    enabled: !!editedId,
  });

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
            <Tabs
              tabsInfo={[
                {
                  id: 'EXPENSE',
                  title: commonT('expenses'),
                  icon: <BanknoteArrowDown />,
                },
                { id: 'INCOME', title: commonT('income'), icon: <BanknoteArrowUp /> },
              ]}
              selectedId={categoryType}
              onSelect={(newType) => {
                setValue('categoryId', '');
                onChange(newType);
              }}
            />
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
