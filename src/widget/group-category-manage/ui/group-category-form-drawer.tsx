'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { useGroupCategoryCreate, useGroupCategoryUpdate } from '@/shared/api/queries/groups';
import { GroupCategory } from '@/shared/api/queries/groups/types';
import { Button, Drawer, Input } from '@/shared/ui';
import { OperationTypeFilter } from '@/feature/operation-filters';

interface FormValues {
  name: string;
  categoryType: 'EXPENSE' | 'INCOME';
}

interface GroupCategoryFormProps {
  groupId: string;
  editedCategory?: GroupCategory;
  onClose: () => void;
}

const GroupCategoryForm: FC<GroupCategoryFormProps> = ({ groupId, editedCategory, onClose }) => {
  const t = useTranslations('group');
  const errorsT = useTranslations('errors');
  const commonT = useTranslations('common');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: editedCategory?.name ?? '',
      categoryType: editedCategory?.categoryType ?? 'EXPENSE',
    },
  });

  const { mutateAsync: createCategory, isPending: isCreating } = useGroupCategoryCreate();
  const { mutateAsync: updateCategory, isPending: isUpdating } = useGroupCategoryUpdate();

  const isPending = isCreating || isUpdating;

  const onSubmit = async (data: FormValues) => {
    if (editedCategory) {
      await toast.promise(updateCategory({ groupId, categoryId: editedCategory.id, data }), {
        loading: t('groupCategoryUpdateLoading'),
        success: t('groupCategoryUpdateSuccess'),
        error: (err) => err?.message || t('groupCategoryUpdateError'),
      });
    } else {
      await toast.promise(createCategory({ groupId, data }), {
        loading: t('groupCategoryCreateLoading'),
        success: t('groupCategoryCreateSuccess'),
        error: (err) => err?.message || t('groupCategoryCreateError'),
      });
    }
    onClose();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="categoryType"
        render={({ field: { onChange, value } }) => (
          <OperationTypeFilter operationType={value} setOperationType={onChange} />
        )}
      />
      <Input
        label={t('groupCategoryName')}
        {...register('name', { required: true })}
        error={errors.name ? errorsT('requiredField') : undefined}
      />
      <Button type="submit" variant="primary" disabled={isPending} className="w-full">
        {commonT('save')}
      </Button>
    </form>
  );
};

interface GroupCategoryFormDrawerProps {
  groupId: string;
  editedCategory?: GroupCategory;
  trigger: React.ReactNode;
}

export const GroupCategoryFormDrawer: FC<GroupCategoryFormDrawerProps> = ({
  groupId,
  editedCategory,
  trigger,
}) => {
  const t = useTranslations('group');

  const title = editedCategory ? t('groupCategoryEditTitle') : t('groupCategoryCreateTitle');

  return (
    <Drawer
      trigger={trigger}
      title={title}
      renderContent={(onClose) => (
        <GroupCategoryForm groupId={groupId} editedCategory={editedCategory} onClose={onClose} />
      )}
    />
  );
};
