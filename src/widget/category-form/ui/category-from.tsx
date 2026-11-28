'use client';
import { CategoryDelete } from '@/feature/category-delete';
import { OperationTypeFilter } from '@/feature/operation-filters';
import {
  useCategoryCreate,
  useCategoryDetail,
  useCategoryEdit,
} from '@/shared/api/queries/categories';
import { useGroups } from '@/shared/api/queries/groups';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { ROUTES } from '@/shared/model/routes';
import { Button, ColorSelector, Hint, Input } from '@/shared/ui';
import { IconSelector } from '@/shared/ui/icon-selector/icon-selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { mapCategoryFormToDto } from '../model/mapCategoryFormToDto';
import { CategoryFormType, CreateSchemaForCategoryForm } from '../model/schema';
import { CategoryResult } from './category-result';

const DEFAULT_CATEGORY_WARNING_CLASS = 'border-warning/50 bg-warning/10';

interface CategoryFormProps {
  editedId?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({ editedId }) => {
  const errorT = useTranslations('errors');
  const categoryT = useTranslations('category');
  const commonT = useTranslations('common');

  const router = useRouter();

  const { data: editedCategory } = useCategoryDetail(editedId || '');

  const categoryFormMethods = useForm<CategoryFormType>({
    defaultValues: editedId
      ? {
          color: editedCategory?.color,
          icon: editedCategory?.icon,
          name: editedCategory?.name,
          type: editedCategory?.categoryType || 'EXPENSE',
        }
      : {
          type: 'EXPENSE',
        },
    resolver: zodResolver(
      CreateSchemaForCategoryForm({
        name: errorT('requiredField'),
        color: errorT('requiredForSelect'),
        icon: errorT('requiredForSelect'),
      }),
    ),
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = categoryFormMethods;

  const { data: groups } = useGroups();

  const isDefaultCategory = !!editedCategory?.defaultKey;
  const isTypeChanged = isDefaultCategory && watch('type') !== editedCategory?.categoryType;
  const showGroupMappingHint = !editedId && !!groups?.length;

  const { mutateAsync: createCategory } = useCategoryCreate();
  const { mutateAsync: editCategory } = useCategoryEdit();

  const onSubmit = async (data: CategoryFormType) => {
    if (editedId) {
      await toast.promise(editCategory({ id: editedId, data: mapCategoryFormToDto(data) }), {
        loading: categoryT('loading'),
        success: categoryT('success'),
        error: (data) => data?.message || categoryT('error'),
      });
      router.push(ROUTES.CATEGORY);
      return;
    }
    await toast.promise(createCategory(mapCategoryFormToDto(data)), {
      loading: categoryT('loading'),
      success: categoryT('success'),
      error: (data) => data?.message || categoryT('error'),
    });

    router.push(ROUTES.CATEGORY);
  };

  useEffect(() => {
    if (!editedCategory && editedId) {
      return;
    }
    reset({
      color: editedCategory?.color,
      icon: editedCategory?.icon,
      name: editedCategory?.name,
      type: editedCategory?.categoryType || 'EXPENSE',
    });
  }, [editedCategory, reset, editedId]);

  return (
    <FormProvider {...categoryFormMethods}>
      <form className="pt-3 pb-20 flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <OperationTypeFilter operationType={value} setOperationType={onChange} />
          )}
        />

        <div>
          <Input
            label={categoryT('categoryName')}
            {...register('name')}
            error={errors?.name?.message}
          />
        </div>

        {showGroupMappingHint && <Hint>{categoryT('groupMappingHint')}</Hint>}
        {isDefaultCategory && (
          <Hint className={DEFAULT_CATEGORY_WARNING_CLASS}>
            {categoryT(
              isTypeChanged ? 'defaultCategoryTypeChangeWarning' : 'defaultCategoryEditWarning',
            )}
          </Hint>
        )}

        <div>
          <div className="text-sm">{categoryT('selectIconAndColor')}</div>
          <div
            className={cn('flex gap-2', {
              'bg-destructive/15 border-destructive/50 border border-solid rounded-lg':
                !!errors?.color?.message || !!errors?.icon?.message,
            })}
          >
            <Controller
              control={control}
              name={'color'}
              render={({ field: { onChange, value } }) => (
                <ColorSelector selectedColor={value} setSelectedColor={onChange} />
              )}
            />

            <Controller
              control={control}
              name={'icon'}
              render={({ field: { onChange, value } }) => (
                <IconSelector selectedIcon={value} setSelectedIcon={onChange} />
              )}
            />
          </div>
          <div className="text-destructive text-xs h-3">
            {errors?.color?.message || errors?.icon?.message}
          </div>
        </div>
        <CategoryResult />

        <div className="fixed inset-x-2 bottom-[calc(5rem+env(safe-area-inset-bottom))] flex gap-2">
          {editedId && (
            <CategoryDelete
              categoryId={editedId}
              isDefault={isDefaultCategory}
              hasOperations={editedCategory?.hasOperations}
              hasGroupMapping={editedCategory?.hasGroupMapping}
              triggerBtnClasses="flex-1"
            />
          )}
          <Button className={editedId ? 'flex-[1.4]' : 'w-full'} variant={'primary'} type="submit">
            {commonT('save')}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
