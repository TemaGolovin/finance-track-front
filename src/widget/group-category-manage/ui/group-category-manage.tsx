'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import { useGroupCategories } from '@/shared/api/queries/groups';
import { Button, Skeleton } from '@/shared/ui';
import { OperationTypeFilter } from '@/feature/operation-filters';
import { GroupCategoryItem } from './group-category-item';
import { GroupCategoryFormDrawer } from './group-category-form-drawer';

interface GroupCategoryManageProps {
  groupId: string;
}

export const GroupCategoryManage: FC<GroupCategoryManageProps> = ({ groupId }) => {
  const t = useTranslations('group');
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE');

  const { data: categories, isLoading } = useGroupCategories({ groupId });

  const filtered = categories?.filter((c) => c.categoryType === type) ?? [];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col gap-2">
          {['sk-1', 'sk-2', 'sk-3'].map((key) => (
            <Skeleton key={key} className="h-10 w-full rounded-md" />
          ))}
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div className="text-sm text-muted-foreground text-center py-4">
          {t('groupCategoriesEmpty')}
        </div>
      );
    }

    return (
      <div>
        {filtered.map((category) => (
          <GroupCategoryItem key={category.id} groupId={groupId} category={category} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 py-2">
      <OperationTypeFilter operationType={type} setOperationType={setType} />
      <GroupCategoryFormDrawer
        groupId={groupId}
        trigger={
          <Button variant="primary" size="icon" className="fixed bottom-4 right-4 shadow-lg z-10">
            <Plus className="w-5 h-5" />
          </Button>
        }
      />
      <div className="pb-12">{renderContent()}</div>
    </div>
  );
};
