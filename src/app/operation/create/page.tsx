'use client';

import { QuickDatePicker } from '@/feature/quick-date-picker';
import { CreateOperationReq, useOperationCreate } from '@/shared/api/queries/operations';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input, Tabs } from '@/shared/ui';
import { CategorySelector } from '@/widget/category-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

const createOperationSchema = (errors: {
  sum: {
    required: string;
    greaterThanZero: string;
  };
  categoryId: string;
}) =>
  z.object({
    sum: z
      .string()
      .min(1, { message: errors.sum.required })
      .refine(
        (value) => {
          if (Number(value.replace(',', '.')) > 0) {
            return true;
          }

          return false;
        },
        {
          message: errors.sum.greaterThanZero,
        },
      ),
    type: z.enum(['INCOME', 'EXPENSE']),
    categoryId: z.string().min(1, { message: errors.categoryId }),
    date: z.date(),
    comment: z.string().optional(),
  });

type OperationType = z.infer<ReturnType<typeof createOperationSchema>>;

const mapCrateOperationFormToApi = (
  createOperationFormState: OperationType,
): CreateOperationReq => {
  return {
    type: createOperationFormState.type,
    value: Number(createOperationFormState.sum.replace(',', '.')),
    operationDate: createOperationFormState.date.toISOString(),
    categoryId: createOperationFormState.categoryId,
    comment: createOperationFormState.comment,
  };
};

export default () => {
  const commonT = useTranslations('common');
  const errorsT = useTranslations('errors');
  const operationsT = useTranslations('operationsCreate');

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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
      type: 'EXPENSE',
    },
  });

  const categoryType = useWatch({ control, name: 'type' });

  const { mutateAsync: createOperation } = useOperationCreate();

  const onSubmit = async (data: OperationType) => {
    const dataForApi = mapCrateOperationFormToApi(data);
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
              selectedIdObserver={(newType) => {
                setValue('categoryId', '');
                onChange(newType);
              }}
            />
          )}
        />
      </div>
      <div className="mb-1">
        <Input
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
