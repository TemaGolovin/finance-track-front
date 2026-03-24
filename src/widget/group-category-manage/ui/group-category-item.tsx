'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useGroupCategoryDelete } from '@/shared/api/queries/groups';
import { GroupCategory } from '@/shared/api/queries/groups/types';
import { Button, Drawer } from '@/shared/ui';
import { GroupCategoryFormDrawer } from './group-category-form-drawer';

interface GroupCategoryItemProps {
  groupId: string;
  category: GroupCategory;
}

export const GroupCategoryItem: FC<GroupCategoryItemProps> = ({ groupId, category }) => {
  const t = useTranslations('group');

  const { mutate: deleteCategory, isPending } = useGroupCategoryDelete();

  const handleDelete = (onClose: () => void) => {
    toast.promise(
      new Promise<void>((resolve, reject) => {
        deleteCategory(
          { groupId, categoryId: category.id },
          { onSuccess: () => resolve(), onError: (err) => reject(err) },
        );
      }),
      {
        loading: t('groupCategoryDeleteLoading'),
        success: t('groupCategoryDeleteSuccess'),
        error: (err) => err?.message || t('groupCategoryDeleteError'),
      },
    );
    onClose();
  };

  return (
    <div className="flex items-center justify-between gap-2 py-2 border-b border-muted last:border-0">
      <div className="flex items-center gap-2 text-sm">
        {category.categoryType === 'EXPENSE' ? (
          <BanknoteArrowDown className="w-4 h-4 text-destructive/80 shrink-0" />
        ) : (
          <BanknoteArrowUp className="w-4 h-4 text-success/80 shrink-0" />
        )}
        <span>{category.name}</span>
      </div>
      <div className="flex items-center gap-1">
        <GroupCategoryFormDrawer
          groupId={groupId}
          editedCategory={category}
          trigger={
            <Button variant="ghost" size="icon-lg">
              <Pencil className="w-4 h-4" />
            </Button>
          }
        />
        <Drawer
          trigger={
            <Button
              variant="ghost"
              size="icon-lg"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          }
          title={t('groupCategoryDeleteTitle')}
          description={t('groupCategoryDeleteDescription', { name: category.name })}
          renderContent={(onClose) => (
            <Button
              variant="destructive"
              className="w-full"
              disabled={isPending}
              onClick={() => handleDelete(onClose)}
            >
              {t('groupCategoryDeleteAction')}
            </Button>
          )}
        />
      </div>
    </div>
  );
};
