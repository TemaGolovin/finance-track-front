'use client';

import { useGroupCategoryDelete } from '@/shared/api/queries/groups';
import { GroupCategory } from '@/shared/api/queries/groups/types';
import { Button, Drawer, LongPressAction, LongPressActions } from '@/shared/ui';
import { Pencil, Trash2 } from 'lucide-react';
import { BanknoteArrowDown, BanknoteArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FC, useMemo } from 'react';
import { toast } from 'sonner';
import { GroupCategoryForm, GroupCategoryFormDrawer } from './group-category-form-drawer';

interface GroupCategoryItemProps {
  groupId: string;
  category: GroupCategory;
}

export const GroupCategoryItem: FC<GroupCategoryItemProps> = ({ groupId, category }) => {
  const t = useTranslations('group');
  const commonT = useTranslations('common');

  const {
    mutate: deleteCategory,
    mutateAsync: deleteCategoryAsync,
    isPending,
  } = useGroupCategoryDelete();

  const linkedMembersCount = category.linkedMembersCount ?? 0;
  const canDelete = linkedMembersCount === 0;
  const deleteBlockedHint = t('groupCategoryDeleteBlocked', {
    count: linkedMembersCount,
  });

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

  const actions = useMemo<LongPressAction[]>(() => {
    const items: LongPressAction[] = [
      {
        id: 'edit',
        label: commonT('edit'),
        icon: <Pencil className="w-5 h-5" />,
        sheet: {
          title: t('groupCategoryEditTitle'),
          render: (onClose) => (
            <GroupCategoryForm groupId={groupId} editedCategory={category} onClose={onClose} />
          ),
        },
      },
    ];

    if (canDelete) {
      items.push({
        id: 'delete',
        label: t('groupCategoryDeleteAction'),
        icon: <Trash2 className="w-5 h-5" />,
        destructive: true,
        confirm: {
          title: t('groupCategoryDeleteTitle'),
          description: t('groupCategoryDeleteDescription', { name: category.name }),
          confirmLabel: t('groupCategoryDeleteAction'),
        },
        onSelect: () =>
          toast
            .promise(deleteCategoryAsync({ groupId, categoryId: category.id }), {
              loading: t('groupCategoryDeleteLoading'),
              success: t('groupCategoryDeleteSuccess'),
              error: (err) => err?.message || t('groupCategoryDeleteError'),
            })
            .unwrap(),
      });
    }

    return items;
  }, [canDelete, category, commonT, deleteCategoryAsync, groupId, t]);

  return (
    <LongPressActions
      title={category.name}
      actions={actions}
      className="flex items-center justify-between gap-2 py-2 border-b border-muted last:border-0"
    >
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
        {canDelete ? (
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
        ) : (
          <Button
            variant="ghost"
            size="icon-lg"
            className="text-destructive/40"
            disabled
            title={deleteBlockedHint}
            aria-label={deleteBlockedHint}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </LongPressActions>
  );
};
